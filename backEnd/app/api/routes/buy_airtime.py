import requests
from fastapi import FastAPI, HTTPException, APIRouter, Request
from dotenv import load_dotenv
import os

from requests.auth import HTTPBasicAuth

from app.core.config import settings
from app.utilities.utils import get_timestamp, generate_password

router = APIRouter()
import logging

logger = logging.getLogger('__name__')


# Endpoint to get Mpesa access token
@router.get('/get-mpesa-token')
def get_mpesa_token():
    # Consumer Key and Consumer Secret from Safaricom Daraja Portal
    consumer_key = settings.consumer_key
    consumer_secret = settings.consumer_key

    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    # HTTP Basic Authentication using consumer key and secret
    response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))

    if response.status_code == 200:
        # Return the JSON response which contains the access_token
        print(f'Acces Token Received: {response.json()}')
        return response.json()
    else:
        # Handle error case
        raise Exception("Failed to retrieve access token")


@router.post("/stk-push")
def stk_push(phone_number: str, amount: int, request: Request, token: str):
    if token is None:
        raise HTTPException(status_code=404, detail='Token Not Found')
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    callback_url = request.url_for("mpesa_callback")
    # print(callback_url)

    payload =  {
    "BusinessShortCode": 174379,
    "Password": settings.mpesa_password,
    "Timestamp": get_timestamp(),
    "TransactionType": "CustomerPayBillOnline",
    "Amount": amount,
    "PartyA": int(phone_number),
    "PartyB": 174379,
    "PhoneNumber": 254728404490,
    "CallBackURL": str(callback_url),
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X"
  }

    response = requests.post(api_url, json=payload, headers=headers)
    logger.info(response)

    if response.status_code == 200:
        return {"message": "STK Push initiated", "response": response.json()}
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to initiate STK Push")


@router.post("/mpesa-callback", name="mpesa_callback")
def mpesa_callback(data: dict):
    # Log or store the callback data for further processing
    logger.info("Mpesa callback data:", data)

    # You can add your business logic here to update user balances, etc.

    return {"message": "Callback received successfully"}
