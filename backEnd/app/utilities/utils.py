import base64
from datetime import datetime
from ..core.config import settings


def get_timestamp():
    time = datetime.now().strftime("%Y%m%d%H%M%S")
    print(f"TimeStamp: {time}")
    return time


def generate_password():
    shortcode = settings.mpesa_shortcode
    passkey = settings.mpesa_passkey
    timestamp = get_timestamp()

    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    return encoded_string


import requests
from requests.auth import HTTPBasicAuth
import os
from dotenv import load_dotenv

load_dotenv()


def get_mpesa_token():
    # Consumer Key and Consumer Secret from Safaricom Daraja Portal
    consumer_key = os.getenv("MPESA_CONSUMER_KEY")
    consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")

    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    # HTTP Basic Authentication using consumer key and secret
    response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))

    if response.status_code == 200:
        # Return the JSON response which contains the access_token
        print(f'Acces Token Received: {response.json()}')
        return response.json()
    else:
        # Handle error case
        raise Exception("Failed to retrieve access token")


# Usage
access_token = get_mpesa_token()["access_token"]
