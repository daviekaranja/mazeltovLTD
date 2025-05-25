from os import access

from fastapi import HTTPException, Request, APIRouter

from app.core.config import settings
from app.services.mpesa_client import client
from app.schemas.payments import AirtimeTopUpRequest
from app.utilities.utils import log

router = APIRouter()

@router.get("/access-token", status_code=200)
async def get_mpesa_access_token():
    """
    Retrieve an access token for M-Pesa API.

    Args:
        request (Request): The FastAPI request object.

    Returns:
        dict: A dictionary containing the access token and its expiry time.
    """
    try:
        # Simulate fetching an access token
        access_token = await client.fetch_token()

        return {
            "access_token": access_token
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stk-push", status_code=200)
async def initiate_stk_push(payload: AirtimeTopUpRequest):
    """
    Initiate a STK push to a mobile number.

    Args:
        request (Request): The FastAPI request object.

    Returns:
        dict: A dictionary containing the response from the STK push.
    """
    password, timestamp = client.generate_password()
    callback = settings.BINGWA_MPESA_CALLBACK

    access_token = await client.fetch_token()
    shortcode = settings.BINGWA_MPESA_SHORTCODE

    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": payload.amount,
        "PartyA": payload.paying_number,
        "PartyB": shortcode,
        "PhoneNumber": payload.paying_number,
        "CallBackURL": callback,
        "AccountReference": payload.receiving_number,
        "TransactionDesc": "Bingwa Airtime Top Up",
    }

    try:
        # Simulate initiating a STK push
        response = await client.stk_push(access_token, payload)
        response_code = int(response.get("ResponseCode", -1))
        response_desc = response.get("ResponseDescription", "")

        if response_code != 0:
            # STK Push failed on Safaricom’s side
            raise HTTPException(
                status_code=400,
                detail=f"STK Push failed: {response_desc}"
            )

        # Success path—grab the CheckoutRequestID to track the transaction
        checkout_id = response["CheckoutRequestID"]
        return {"status_code": "0000", "message": response_desc}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post('/callback', status_code=200, name="stk-push-callback")
async def stk_push_callback(request: Request):
    """
    Handle the callback from the STK push.

    Args:
        request (Request): The FastAPI request object.

    Returns:
        dict: A dictionary containing the response from the callback.
    """
    try:
        # Simulate handling the callback
        data = await request.json()
        log.info(f"Callback data: {data}")
        return {
            "status": "success",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# {
#     "Body": {
#         "stkCallback": {
#             "MerchantRequestID": "034b-48fe-bf98-b827a82be17a2914148",
#             "CheckoutRequestID": "ws_CO_22052025153352242728404490",
#             "ResultCode": 0,
#             "ResultDesc": "The service request is processed successfully.",
#             "CallbackMetadata": {
#                 "Item": [
#                     {
#                         "Name": "Amount",
#                         "Value": 1.0
#                     },
#                     {
#                         "Name": "MpesaReceiptNumber",
#                         "Value": "TEM2R3VN0S"
#                     },
#                     {
#                         "Name": "TransactionDate",
#                         "Value": 20250522153407
#                     },
#                     {
#                         "Name": "PhoneNumber",
#                         "Value": 254728404490
#                     }
#                 ]
#             }
#         }
#     }
# }