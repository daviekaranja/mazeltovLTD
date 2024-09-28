import base64
from datetime import datetime, timedelta
import requests
from requests.auth import HTTPBasicAuth
from fastapi import HTTPException
from app.core.config import settings
from .logger import log


def get_timestamp():
    time = datetime.now().strftime("%Y%m%d%H%M%S")
    return time


def generate_password():
    shortcode = '174379'
    passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    timestamp = get_timestamp()

    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    return encoded_string


def get_mpesa_token() -> str:
    consumer_key = 'vdLEQNBfvk4xl6mKHqAwZalR737rzXujGL2ExNPYfBAJ9AQt'  # Your Consumer Key
    consumer_secret = 'cDZMgxrLkHG6VCX4miqbD6WtGIV72A3d8a3MD5JNPaKXjlTPWY3xg5ApPR07SsEN'  # Your Consumer Secret
    token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

    # Combine the consumer key and secret and encode them
    credentials = f"{consumer_key}:{consumer_secret}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    # Set up the headers with Basic Auth
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/json"
    }

    # Make the request
    try:
        response = requests.get(token_url, headers=headers)
        if response.status_code == 200:
            log.info(f'Access Token Granted: {response.json()}')
            token_data = response.json()
            access_token = token_data.get("access_token")
            return access_token
        else:
            log.error(f"An Error Occurred: {response.json()}")
            error_details = response.json()
            error_message = error_details.get("error_description", "Failed to retrieve access token")
            raise HTTPException(status_code=response.status_code, detail=error_message)

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")
