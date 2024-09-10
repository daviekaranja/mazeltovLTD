import requests
from fastapi import  HTTPException, APIRouter, Request

from app.core.config import settings
from app.utilities.utils import get_timestamp, get_mpesa_token, generate_password

router = APIRouter()
import logging

logger = logging.getLogger('__name__')


@router.post("/stk-push")
def stk_push(phone_number: str, amount: int, request: Request):
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    headers = {
        "Authorization": f"Bearer {get_mpesa_token()}",
        "Content-Type": "application/json"
    }
    callback_url = request.url_for("mpesa_callback")

    payload =  {
    "BusinessShortCode": 174379,
    "Password": generate_password(),
    "Timestamp": get_timestamp(),
    "TransactionType": "CustomerPayBillOnline",
    "Amount": amount,
    "PartyA": int(phone_number),
    "PartyB": 174379,
    "PhoneNumber": int(phone_number),
    "CallBackURL": str(callback_url),
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X"
  }

    response = requests.post(api_url, json=payload, headers=headers)

    # Check if the response status code indicates an error
    if response.status_code != 200:
        logger.info(response.json())
        # Extract error details from the response body
        error_details = response.json()
        error_message = error_details.get("errorMessage", "Unknown error occurred")
        raise HTTPException(status_code=response.status_code, detail=error_message)

    return {"message": "STK Push initiated", "response": response.json()}


@router.post("/mpesa-callback", name="mpesa_callback")
def mpesa_callback(data: dict):
    # Log or store the callback data for further processing
    logger.info("Mpesa callback data:", data)

    # You can add your business logic here to update user balances, etc.

    return {"message": "Callback received successfully"}
