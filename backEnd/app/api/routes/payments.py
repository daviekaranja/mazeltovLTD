from datetime import datetime

from fastapi import HTTPException, Request, APIRouter, Depends

from app.core.config import settings
from app.models.models import MpesaTransaction
from app.schemas.payments import AirtimeTopUpRequest
from app.services.mpesa_client import client
from app.utilities.utils import log
from app.crud.mpesa_transaction import transaction
from app.schemas.transaction import MpesaTransactionCreate, MpesaTransactionResponse
from app.api.dependancies import get_db
from sqlalchemy.orm import Session
router = APIRouter()


@router.post("/stk-push", status_code=200)
async def initiate_stk_push(payload: AirtimeTopUpRequest, db: Session = Depends(get_db)):
    """
    Initiate a STK push to a mobile number.

    Returns:
        dict: A dictionary containing the response from the STK push.
        :param db:
        :param payload:
    """
    password, timestamp = client.generate_password()
    # callback = settings.BINGWA_MPESA_CALLBACK
    callback = "https://9bcf-129-222-147-3.ngrok-free.app/api/v1/payments/callback"
    access_token = await client.fetch_token()
    shortcode = settings.BINGWA_MPESA_SHORTCODE

    stk_push_payload = {
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
        response = await client.stk_push(access_token, stk_push_payload)
        response_code = int(response.get("ResponseCode", -1))
        response_desc = response.get("ResponseDescription", "")


        if response_code != 0:
            # STK Push failed on Safaricom’s side
            raise HTTPException(
                status_code=400,
                detail=f"STK Push failed: {response_desc}"
            )
        db_data = MpesaTransactionCreate(
            merchant_request_id=response["MerchantRequestID"],
            checkout_request_id=response["CheckoutRequestID"],
            status="Pending",
            mpesa_receipt_number=None,
            offer_id=payload.offer_id,
            receiving_number=payload.receiving_number,
            paying_number=payload.paying_number,
            amount=payload.amount,
            transaction_date=datetime.now(),
            result_code=response_code,
            result_desc=response_desc
        )

        # Save the transaction to the database
        db_obj = transaction.create_transaction(db, obj_in=db_data)

        return {"status_code": "0000", "message": response_desc}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


from app.schemas.transaction import MpesaTransactionBase  # assuming this is your Pydantic schema
from datetime import datetime


@router.post('/callback', status_code=200, name="stk-push-callback")
async def stk_push_callback(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()
        callback = data["Body"]["stkCallback"]
        merchant_request_id = callback["MerchantRequestID"]
        result_code = callback.get("ResultCode")
        result_desc = callback.get("ResultDesc")

        mpesa_receipt = None

        if result_code == 0 and "CallbackMetadata" in callback:
            for item in callback["CallbackMetadata"]["Item"]:
                if item["Name"] == "MpesaReceiptNumber":
                    mpesa_receipt = item["Value"]

        # 1. Fetch original transaction from DB
        trans = transaction.get_by_merchant_request_id(db, merchant_request_id)
        if not trans:
            raise HTTPException(status_code=404, detail="Transaction not found")

        # 2. Build the full payload for validation
        full_data = {
            "merchant_request_id": trans.merchant_request_id,
            "checkout_request_id": trans.checkout_request_id,
            "status": "Success" if result_code == 0 else "Failed",
            "mpesa_receipt_number": mpesa_receipt,
            "receiving_number": trans.receiving_number,
            "paying_number": trans.paying_number,
            "amount": trans.amount,
            "transaction_date": trans.transaction_date,
            "result_code": result_code,
            "result_desc": result_desc,
            "updated_at": datetime.now()
        }

        # 3. Validate using Pydantic
        validated_data = MpesaTransactionBase(**full_data)

        new_trans = transaction.update(db, db_obj=trans, obj_in=validated_data)

        log.info(f"Transaction Status: {validated_data.result_desc}")

        return {"status": "success", "status_code": "0000", "data": new_trans}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
