import requests
from fastapi import HTTPException
from requests.auth import HTTPBasicAuth

from app.utilities.logger import log
from app.core.config import settings


def get_mpesa_token_v2(consumer_key: str, consumer_secret: str):
    url = f'{settings.mpesa_base_url}/oauth/v1/generate?grant_type=client_credentials'
    response = requests.get(url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    log.info(response.text)
    if response.status_code == 200:
        log.info(f"Access Token Granted: {response.json()}")
        token = response.json()['access_token']
        return token

    else:
        log.error(f"Failed to get token: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to get token")
