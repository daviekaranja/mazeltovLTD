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
    shortcode = settings.shortcode
    passkey = settings.passkey
    timestamp = get_timestamp()

    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    return encoded_string


_cached_token = None
_token_expiry = None


def get_mpesa_token() -> str:
    global _cached_token, _token_expiry

    if _cached_token and _token_expiry > datetime.utcnow():
        log.info(f"Using Cached Token: {_cached_token}")
        return _cached_token

    # Generate a new token if cached token is missing or expired
    consumer_key = settings.consumer_key
    consumer_secret = settings.customer_secret
    api_url = settings.oauth_url

    try:
        response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        log.info(f"Token Response: {response.status_code} - {response.text}")
        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data.get("access_token")
            expires_in = token_data.get("expires_in", 3600)  # Default expiry 1 hour if not provided
            _cached_token = access_token
            _token_expiry = datetime.utcnow() + timedelta(seconds=expires_in - 60)  # Cache token, expire 1 min early
            return access_token
        else:
            error_details = response.json()
            error_message = error_details.get("error_description", "Failed to retrieve access token")
            raise HTTPException(status_code=response.status_code, detail=error_message)

    except requests.RequestException as e:
        log.error(f"Token Request Failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")
