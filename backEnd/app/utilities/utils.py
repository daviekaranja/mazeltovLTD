import base64
import random
from datetime import datetime, timedelta
import time

import requests
from fastapi import HTTPException, Request, UploadFile
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
from requests.auth import HTTPBasicAuth


def get_timestamp():
    return datetime.now().strftime("%Y%m%d%H%M%S")


def generate_password():
    shortcode = settings.paybill
    passkey = settings.passkey
    timestamp = get_timestamp()

    data_to_encode = str(shortcode) + passkey + str(timestamp)
    encoded_string = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    return encoded_string


def get_mpesa_token_v2(consumer_key: str, consumer_secret: str):
    url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    response = requests.get(url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    log.info(response.text)
    if response.status_code == 200:
        log.info(f"Access Token Granted: {response.json()}")
        token = response.json()['access_token']
        return token

    else:
        log.error(f"Failed to get token: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to get token")


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


def upload_image_to_imgur(image_file: UploadFile) -> str:
    headers = {'Authorization': f'Client-ID {settings.imgur_client_id}'}
    files = {'image': (image_file.filename, image_file.file, image_file.content_type)}

    response = requests.post("https://api.imgur.com/3/upload", headers=headers, files=files)

    if response.status_code == 200:
        return response.json()['data']['link']  # Get the Imgur link
    else:
        print("Error:", response.json())
        raise HTTPException(status_code=500, detail="Failed to upload image to Imgur")


# import requests
# ​
# response = requests.request("GET", 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', headers = { 'Authorization': 'Basic d1d6R01XcUdiRThTalRqdFRKeEF0RThXaXUwcVlDbWxqQWxzdUpsRWRtcXY3Q1h3OlNxMHJMMkpXYXN4R1hqbG84MVRHdURMNFU3VzdRZTlLQzVOdkxpU1lSVFVXVEduckpvSkRvN0czek94WWVxYTY=' })
# print(response.text.encode('utf8'))