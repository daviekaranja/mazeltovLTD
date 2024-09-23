from fastapi import APIRouter, HTTPException, Request
import requests
from app.core.config import settings
from app.utilities.utils import get_timestamp, get_mpesa_token, generate_password
from app.schemas.payments import PayBillPush, TillPush
from app.utilities.logger import log

router = APIRouter()


@router.post("/paybill-push", status_code=200)
def stk_push(params: PayBillPush, request: Request):
    api_url = settings.api_url
    headers = {
        "Authorization": f"Bearer {get_mpesa_token()}",
        "Content-Type": "application/json"
    }
    callback_url = request.url_for("mpesa_callback")

    payload = {
        "BusinessShortCode": settings.mpesa_shortcode,
        "Password": generate_password(),  # Generated password for authentication
        "Timestamp": get_timestamp(),
        "TransactionType": 'CustomerPayBillOnline',  # Based on Paybill or Till
        "Amount": params.amount,
        "PartyA": int(params.stkNumber),
        "PartyB": settings.mpesa_shortcode,  # Same BusinessShortCode for PartyB
        "PhoneNumber": int(params.stkNumber),
        "CallBackURL": str(callback_url),
        "AccountReference": params.rechargeNumber,
        "TransactionDesc": "Airtime"
    }

    # Send the STK Push request
    response = requests.post(api_url, json=payload, headers=headers)
    if response.status_code != 200:
        error_details = response.json()
        log.info(error_details)
        error_message = error_details.get("errorMessage", "Unknown error occurred")
        raise HTTPException(status_code=response.status_code, detail=error_message)

    return {"message": "STK Push initiated", "response": response.json()}


@router.post("/till-push", status_code=200)
def stk_push(params: TillPush, request: Request):
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {
        "Authorization": f"Bearer {get_mpesa_token()}",
        "Content-Type": "application/json"
    }
    callback_url = request.url_for("mpesa_callback")

    payload = {
        "BusinessShortCode": settings.mpesa_shortcode,  #update to a till
        "Password": generate_password(),  # Generated password for authentication
        "Timestamp": get_timestamp(),
        "TransactionType": 'CustomerPayBillOnline',  # Till
        "Amount": params.amount,
        "PartyA": int(params.stkNumber),
        "PartyB": settings.mpesa_shortcode,  # Same BusinessShortCode for PartyB
        "PhoneNumber": int(params.stkNumber),
        "CallBackURL": str(callback_url),
        "AccountReference": "Deals",
        "TransactionDesc": "Data Deals"
    }

    # Send the STK Push request
    response = requests.post(api_url, json=payload, headers=headers)

    if response.status_code != 200:
        error_details = response.json()
        error_message = error_details.get("errorMessage", "Unknown error occurred")
        raise HTTPException(status_code=response.status_code, detail=error_message)

    return {"message": "STK Push initiated", "response": response.json()}


@router.post("/mpesa-callback", name="mpesa_callback")
def mpesa_callback(data: dict):
    log.info(f'Received: {data}')
    # Process the callback data here
    return {"message": "Callback received successfully"}
