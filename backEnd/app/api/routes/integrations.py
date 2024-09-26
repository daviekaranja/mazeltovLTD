from fastapi import APIRouter, HTTPException, Request
import requests
from app.core.config import settings
from app.utilities.utils import get_timestamp, get_mpesa_token, generate_password
from app.schemas.payments import PayBillPush, TillPush, STKPushResponse
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
        "BusinessShortCode": settings.shortcode,
        "Password": generate_password(),  # Generated password for authentication
        "Timestamp": get_timestamp(),
        "TransactionType": 'CustomerPayBillOnline',  # Based on Paybill or Till
        "Amount": params.amount,
        "PartyA": int(params.stkNumber),
        "PartyB": settings.shortcode,  # Same BusinessShortCode for PartyB
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


@router.post("/stk-push", status_code=200, response_model=STKPushResponse)
def stk_push(params: TillPush, request: Request):
    api_url = settings.api_url
    headers = {
        "Authorization": f"Bearer {get_mpesa_token()}",
        "Content-Type": "application/json"
    }
    callback_url = request.url_for('c2b-callback'),

    payload = {
        "BusinessShortCode": settings.shortcode,  #update to a till
        "Password": generate_password(),  # Generated password for authentication
        "Timestamp": get_timestamp(),
        "TransactionType": 'CustomerPayBillOnline',  # Till
        "Amount": params.amount,
        "PartyA": int(params.stkNumber),
        "PartyB": settings.shortcode,  # Same BusinessShortCode for PartyB
        "PhoneNumber": int(params.stkNumber),
        "CallBackURL": str(callback_url),
        "AccountReference": params.rechargeNumber,
        "TransactionDesc": "Data Deals"
    }

    # Send the STK Push request
    response = requests.post(api_url, json=payload, headers=headers)
    log.info(response.json())

    if response.status_code != 200:

        error_details = response.json()
        error_message = error_details.get("errorMessage", "Unknown error occurred")
        raise HTTPException(status_code=response.status_code, detail=error_message)

    return response


@router.get("/stk-push-query/{checkout_request_id}", status_code=200)
async def stk_push_query(checkout_request_id: str):

    headers = {
        "Authorization": f"Bearer {get_mpesa_token()}",
        "Content-Type": "application/json"
    }

    # Prepare payload
    payload = {
        "BusinessShortCode": settings.shortcode,
        "Password": generate_password(),
        "Timestamp": get_timestamp(),
        "CheckoutRequestID": checkout_request_id
    }

    # Send query request to Safaricom API
    query_url = "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
    response = requests.post(query_url, json=payload, headers=headers)
    if response:
        log.info(response)

    return response.json()


@router.post("/c2b-callback", name="c2b-callback")
def mpesa_callback(data: dict):
    log.info(data)
    # Process the callback data here
    return {"message": data}
