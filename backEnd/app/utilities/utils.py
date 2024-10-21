import base64
import random
from datetime import datetime, timedelta
import time

import requests
from fastapi import HTTPException, Request
from jinja2 import Environment, FileSystemLoader
from pydantic import EmailStr
from sqlalchemy.orm import Session
from sqlalchemy import exc

from app.core.config import settings
from .logger import log
from ..communications.email_client import send_email_internal
from ..models.payments import Transaction, UnsuccessfulTransactions
from ..schemas.payments import UnsuccessfulTransactions as Ts
from app.schemas.security import SecurityCode
from ..models import security


def get_timestamp():
    time = datetime.now().strftime("%Y%m%d%H%M%S")
    return time


def generate_password():
    shortcode = settings.shortcode
    passkey = settings.passkey
    timestamp = get_timestamp()

    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    return encoded_string


def get_mpesa_token() -> str:
    consumer_key = settings.consumer_key  # Your Consumer Key
    consumer_secret = settings.consumer_secret  # Your Consumer Secret
    token_url = settings.token_url

    # Combine the consumer key and secret and encode them
    credentials = f"{consumer_key}:{consumer_secret}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    # Set up the headers with Basic Auth
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/json"
    }

    # Make the request
    try:
        response = requests.get(token_url, headers=headers)
        if response.status_code == 200:
            log.info(f'Access Token Granted: {response.json()}')
            token_data = response.json()
            access_token = token_data.get("access_token")
            return access_token
        else:
            log.error(f"An Error Occurred: {response.json()}")
            error_details = response.json()
            error_message = error_details.get("error_description", "Failed to retrieve access token")
            raise HTTPException(status_code=response.status_code, detail=error_message)

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")


def process_callback_data(callback_data: dict, db: Session):
    try:
        result_code = callback_data['Body']['stkCallback']['ResultCode']

        if result_code == 0:
            amount = None
            receipt_number = None
            transaction_date = None
            phone_number = None
            stk_callback = callback_data['Body']['stkCallback']
            metadata = stk_callback['CallbackMetadata']['Item']

            for item in metadata:
                if item['Name'] == 'Amount':
                    amount = item['Value']
                elif item['Name'] == 'MpesaReceiptNumber':
                    receipt_number = item['Value']
                elif item['Name'] == 'TransactionDate':
                    transaction_date = datetime.strptime(str(item['Value']), "%Y%m%d%H%M%S")
                elif item['Name'] == 'PhoneNumber':
                    phone_number = item['Value']
            # Store the data in the database
            transaction = Transaction(
                mpesa_receipt_number=receipt_number,
                amount=amount,
                transaction_date=transaction_date,
                phone_number=phone_number,
                merchant_request_id=stk_callback['MerchantRequestID'],
                checkout_request_id=stk_callback['CheckoutRequestID']
            )

            db.add(transaction)
            db.commit()
            db.refresh(transaction)
            return transaction

        else:
            data = callback_data['Body']['stkCallback']
            process_data = Ts(**data)
            db_obj = UnsuccessfulTransactions(
                MerchantRequestID=process_data.MerchantRequestID,
                CheckoutRequestID=process_data.CheckoutRequestID,
                ResultCode=process_data.ResultCode,
                ResultDesc=process_data.ResultDesc
            )
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)
            return db_obj

    except Exception as e:
        db.rollback()
        log.info(e)


def security_code(db: Session):
    # should generate and save the code in db
    """
    :param request:
    :param db:
    :return:
    """
    code = random.randrange(100000, 1000000)
    db_obj = security.SecurityCodes(code=code,
                                    expires=datetime.utcnow() + timedelta(seconds=3600)
                                    )
    # Add the ORM model instance to the session
    try:
        db.add(db_obj)

        # Commit the transaction to save the data
        db.commit()

        # Refresh to get any additional info from the database (e.g., auto-generated id)
        db.refresh(db_obj)
        return db_obj.code
    except exc.IntegrityError as e:
        log.error("duplicate Data: {e}")
        db.rollback()
        return db_obj.code


def send_password_reset_mail(email: EmailStr, username, reset_link, db):
    try:
        # Load the Jinja2 template
        env = Environment(loader=FileSystemLoader(settings.template_path))
        template = env.get_template('password_reset_email.html')
        # Render the template
        link = f'{reset_link}?code={security_code(db)}'
        log.info(link)
        html_content = template.render(username=username, reset_link=link)
        send_email_internal(email, 'Password Reset', html_content, html=True)
        log.info(f'Email Sent Successfully to {email}')
    except Exception as e:
        log.error(e)
        raise HTTPException(status_code=500, detail=str(e))
