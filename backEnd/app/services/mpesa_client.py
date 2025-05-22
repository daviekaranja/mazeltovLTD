import base64
import httpx
from datetime import datetime
from fastapi import HTTPException
from loguru import logger

from app.core.config import settings


class MpesaClient:
    def __init__(
        self,
        mpesa_base_url: str,
        consumer_key: str,
        consumer_secret: str,
        shortcode: str,
        passkey: str,
        timeout: int = 20
    ):
        # clean up URL and capture your C2B/STK shortcode
        self.base_url = mpesa_base_url.rstrip('/')
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self.shortcode = shortcode
        self.timeout = timeout
        self.passkey = passkey

    async def fetch_token(self) -> str:
        logger.info("Fetching M-Pesa access token")
        creds = f"{self.consumer_key}:{self.consumer_secret}"
        auth = base64.b64encode(creds.encode()).decode()
        url = f"{self.base_url}/oauth/v1/generate"
        params = {"grant_type": "client_credentials"}

        data = await self._request(
            method="GET",
            url=url,
            headers={"Authorization": f"Basic {auth}"},
            params=params
        )
        return data["access_token"]

    async def register_urls(
        self,
        confirmation_url: str,
        validation_url: str,
        access_token: str,
        v: str = "v2"
    ) -> dict:
        logger.info(f"Registering C2B URLs for shortcode {self.shortcode}")
        payload = {
            "ShortCode": self.shortcode,
            "ResponseType": "Completed",
            "ConfirmationURL": confirmation_url,
            "ValidationURL":   validation_url,
        }
        url = f"{self.base_url}/mpesa/c2b/{v}/registerurl"
        return await self._request(
            method="POST",
            url=url,
            headers=self._bearer_headers(access_token),
            json=payload
        )

    async def stk_push(self, access_token: str, payload: dict) -> dict:
        logger.info("Initiating STK Push")
        url = f"{self.base_url}/mpesa/stkpush/v1/processrequest"
        return await self._request(
            method="POST",
            url=url,
            headers=self._bearer_headers(access_token),
            json=payload
        )

    def generate_password(self, timestamp: str = None) -> tuple[str, str]:
        """
        Returns (password, timestamp), where:
        - timestamp: in 'YYYYMMDDHHMMSS'
        - password: Base64( shortcode + passkey + timestamp )
        """
        if not timestamp:
            timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        raw = f"{self.shortcode}{self.passkey}{timestamp}"
        password = base64.b64encode(raw.encode()).decode()
        return password, timestamp

    # ——— Internal Helpers ——— #

    def _bearer_headers(self, token: str) -> dict:
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type":  "application/json"
        }

    async def _request(
        self,
        method: str,
        url: str,
        headers: dict = None,
        json: dict   = None,
        params: dict = None
    ) -> dict:
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                resp = await client.request(method, url, headers=headers, json=json, params=params)

            if resp.status_code == 200:
                return resp.json()

            logger.error(f"{method} {url} failed [{resp.status_code}] {resp.text}")
            raise HTTPException(status_code=resp.status_code, detail=resp.text)

        except httpx.ConnectTimeout:
            logger.error(f"{method} {url} timed out")
            raise HTTPException(status_code=504, detail="M-Pesa API timed out.")
        except httpx.RequestError as e:
            logger.error(f"{method} {url} request error: {e}")
            raise HTTPException(status_code=503, detail=f"M-Pesa request error: {e}")


client = MpesaClient(
    mpesa_base_url=settings.mpesa_base_url,
    consumer_key=settings.BINGWA_MPESA_CONSUMER_KEY,
    consumer_secret=settings.BINGWA_MPESA_CONSUMER_SECRET,
    shortcode=settings.BINGWA_MPESA_SHORTCODE,
    passkey=settings.BINGWA_MPESA_PASSKEY,
)

