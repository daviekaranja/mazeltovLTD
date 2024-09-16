import base64
from datetime import datetime
import requests
from requests.auth import HTTPBasicAuth
from fastapi import HTTPException
from app.core.config import settings


def get_timestamp():
    time = datetime.now().strftime("%Y%m%d%H%M%S")
    return time


def generate_password():
    shortcode = settings.mpesa_shortcode
    passkey = settings.mpesa_passkey
    timestamp = get_timestamp()

    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    return encoded_string


def get_mpesa_token() -> str:
    # Consumer Key and Consumer Secret from Safaricom Daraja Portal
    consumer_key = settings.consumer_key
    consumer_secret = settings.secret_key

    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    try:
        response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))

        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data.get("access_token")
            if access_token:
                return access_token
            else:
                raise HTTPException(status_code=500, detail="Access token not found in response")
        else:
            error_details = response.json()
            error_message = error_details.get("error_description", "Failed to retrieve access token")
            raise HTTPException(status_code=response.status_code, detail=error_message)

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")
