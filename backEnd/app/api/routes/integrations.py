from fastapi import APIRouter, HTTPException, Request
import requests
from app.core.config import settings
from app.utilities.utils import get_timestamp, get_mpesa_token, generate_password
from app.schemas.payments import PayBillPush, PushParams, STKPushResponse
from app.utilities.logger import log
from app.utilities.utils import get_mpesa_token
from fastapi.encoders import jsonable_encoder

from requests.exceptions import RequestException, HTTPError
from pydantic import ValidationError
import json
from json import JSONDecodeError

router = APIRouter()


@router.get('/stk-push', status_code=200)
def send_stk_push(amount: int, stkNumber: str, rechargeNumber: str, request: Request):
    try:
        params = PushParams(stkNumber=stkNumber, amount=100, rechargeNumber=rechargeNumber)
    except ValidationError as e:
        log.error(f'Validation Error: {e}')
        raise HTTPException(status_code=400, detail=f'Validation Error: {e}')

    # Headers for the API request
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {get_mpesa_token()}'  # Pass the token dynamically
    }

    callback_url = request.url_for('c2b-callback')
    log.info(callback_url)
    transaction_type = 'CustomerBuyGoodsOnline'
    # Payload for the API request
    payload = {
        "BusinessShortCode": settings.shortcode,
        "Password": generate_password(),
        "Timestamp": get_timestamp(),
        "TransactionType": transaction_type,
        "Amount": amount,
        "PartyA": params.stkNumber,  # same as phone number
        "PartyB": settings.shortcode,
        "PhoneNumber": params.stkNumber,  # phone number to send stk
        "CallBackURL": str(callback_url),
        "AccountReference": rechargeNumber,
        "TransactionDesc": "Payment of X"
    }

    api_url = settings.api_url
    # Make the POST request
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for 4xx/5xx errors

        try:
            return response.json()
        except JSONDecodeError as e:
            log.error(f"Failed to parse JSON response: {e}")
            raise HTTPException(status_code=502, detail="Invalid JSON response")
    except HTTPError as e:
        log.error(f"HTTP error occurred: {e}")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    except RequestException as e:
        log.error(f"HTTP request error: {e}")
        raise HTTPException(status_code=500, detail="Failed to connect to M-Pesa API")


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
    log.info(headers)
    if response.status_code != 200:
        log.error(response.json())
        error_message = response.json().get("errorMessage", "Unknown error occurred")
        raise HTTPException(status_code=500, detail=error_message)

    return response.json()


@router.post("/c2b-callback", name="c2b-callback", status_code=200)
async def mpesa_callback(request: Request):
    log.info(f"Received callback with headers: {request.headers}")

    try:
        data = await request.json()  # Await JSON data
        log.info(f"Callback data: {data}")
        print(data)  # Debugging print

        # Return a success response so Safaricom knows it's processed
        return {"message": "Callback received successfully"}

    except Exception as e:
        log.error(f"Error parsing callback data: {e}")
        raise HTTPException(status_code=400, detail="Invalid callback data format")
