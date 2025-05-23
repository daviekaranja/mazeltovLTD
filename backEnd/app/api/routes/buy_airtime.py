# from json import JSONDecodeError
#
# import requests
# from fastapi import APIRouter, HTTPException, Request, Depends
# from fastapi.encoders import jsonable_encoder
# from requests.exceptions import RequestException, HTTPError
# from sqlalchemy.orm import Session
# from app.services.mpesa_client import client
#
# from app.api.dependancies import get_db
# from app.core.config import settings
# from app.schemas.payments import STKPushResponse
# from app.utilities.logger import log
# from app.utilities.utils import get_mpesa_token_v2, process_callback_data
# from app.utilities.utils import get_timestamp, generate_password
#
# router = APIRouter()
#
# @router.post('/buy-airtime-stk-push', status_code=200, response_model=STKPushResponse,
#              description='paybill payment for buying airtime')
# def send_stk_push( request: Request):
#     # Headers for the API request
#     headers = {
#         'Content-Type': 'application/json',
#         # 'Authorization': f'Bearer {get_mpesa_token_v2()}'  # Pass the token dynamically
#     }
#
#     log.debug(f'headers: {headers}')
#
#     callback_url = request.url_for('c2b-callback')
#     transaction_type = 'CustomerPayBillOnline'
#
#     payload =   {
#     "BusinessShortCode": 174379,
#     "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwMjAzMTU0OTM5",
#     "Timestamp": "20250203154939",
#     "TransactionType": "CustomerPayBillOnline",
#     "Amount": 1,
#     "PartyA": 254728404490,
#     "PartyB": 174379,
#     "PhoneNumber": 254728404490,
#     "CallBackURL": "https://mydomain.com/path",
#     "AccountReference": "CompanyXLTD",
#     "TransactionDesc": "Payment of X"
#   }
#
#     # Make the POST request
#     try:
#         response = requests.post(settings.api_url, headers=headers, json=payload)
#         response.raise_for_status()  # Raise an exception for 4xx/5xx errors
#
#         try:
#             log.info(response.json())
#             return response.json()
#         except JSONDecodeError as e:
#             log.error(f"Failed to parse JSON response: {e}")
#             raise HTTPException(status_code=502, detail="Invalid JSON response")
#     except HTTPError as e:
#         log.error(f"HTTP error occurred: {e}")
#         raise HTTPException(status_code=response.status_code, detail=response.text)
#     except RequestException as e:
#         log.error(f"HTTP request error: {e}")
#         raise HTTPException(status_code=500, detail="Failed to connect to M-Pesa API")
#
# @router.get('/get-mpesa-token', status_code=200)
# def get_mpesa_token(consumer_key: str, consumer_secret: str):
#     token = get_mpesa_token_v2(consumer_key, consumer_secret)
#     if token is not None:
#         return {
#             'status': 'success',
#             'message': 'Token generated successfully',
#             'access_token': token
#         }
#     else:
#         raise HTTPException(status_code=500, detail='failed to generate token')
#
#
# @router.get("/stk-push-query/{checkout_request_id}", status_code=200)
# async def stk_push_query(checkout_request_id: str):
#     headers = {
#         "Authorization": f"Bearer {get_mpesa_token_v2()}",  # Updated to use get_mpesa_token_v2
#         "Content-Type": "application/json"
#     }
#
#     # Prepare payload
#     payload = {
#         "BusinessShortCode": settings.shortcode,
#         "Password": generate_password(),
#         "Timestamp": get_timestamp(),
#         "CheckoutRequestID": checkout_request_id
#     }
#
#     # Send query request to Safaricom API
#     query_url = "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
#     response = requests.post(query_url, json=payload, headers=headers)
#     log.info(headers)
#     if response.status_code != 200:
#         log.error(response.json())
#         error_message = response.json().get("errorMessage", "Unknown error occurred")
#         raise HTTPException(status_code=500, detail=error_message)
#
#     return response.json()
#
#
# @router.post("/c2b-callback", name="c2b-callback", status_code=200)
# async def mpesa_callback(request: Request, db: Session = Depends(get_db)):
#     try:
#         # Attempt to parse JSON data
#         data = await request.json()
#         if not data:
#             raise ValueError("No data received in callback")
#
#         # Ensure the expected fields are present
#         if "Body" not in data or "stkCallback" not in data["Body"]:
#             raise KeyError("Malformed callback data: Missing 'Body' or 'stkCallback'")
#
#         # Extract necessary information from the callback
#         result_code = data["Body"]["stkCallback"].get("ResultCode")
#         if result_code is None:
#             raise KeyError("ResultCode not found in callback data")
#
#         log.info(f"Mpesa Callback received with ResultCode: {result_code}: {data['Body']['stkCallback']}")
#
#         # Process the callback data
#         process_data = process_callback_data(data, db)
#         return jsonable_encoder(process_data)
#
#     except ValueError as ve:
#         log.error(f"ValueError: {ve}")
#         raise HTTPException(status_code=400, detail=str(ve))
#
#     except KeyError as ke:
#         log.error(f"KeyError: {ke} - Callback data might be malformed")
#         raise HTTPException(status_code=422, detail=f"Malformed data: {str(ke)}")
#
#     except Exception as e:
#         log.exception(f"Unexpected error occurred while handling the Mpesa callback: {str(e)}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")
#
