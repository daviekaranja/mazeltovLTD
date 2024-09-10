import requests
from fastapi import FastAPI, HTTPException, APIRouter, Request
from dotenv import load_dotenv
import os
from app.utilities.utils import get_timestamp, generate_password, access_token

router = APIRouter()
import logging

logger = logging.getLogger('__name__')


# Endpoint to get Mpesa access token

@router.post("/stk-push")
def stk_push(phone_number: str, amount: int, request: Request):
    if access_token is None:
        raise HTTPException(status_code=404, detail='Token Not Found')
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    callback_url = request.url_for("mpesa_callback")
    # print(callback_url)

    payload = {
        "BusinessShortCode": '4509908',
        "Password": generate_password(),
        "Timestamp": get_timestamp(),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": '4509908',
        "PhoneNumber": phone_number,
        "CallBackURL": callback_url,
        "AccountReference": "Test123",
        "TransactionDesc": "Payment for XYZ"
    }

    response = requests.post(api_url, json=payload, headers=headers)

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
