import httpx
from fastapi import APIRouter, HTTPException, Request, Header

from app.core.config import settings
from app.utilities.logger import log

router = APIRouter()
from urllib.parse import parse_qs, urlencode

@router.post('/bingwa-proxy', status_code=200)
async def bingwa_api_proxy(request: Request, x_api_key: str = Header(None)):
    if x_api_key is None:
        raise HTTPException(status_code=403, detail="Invalid API Key")

    # Read and decode request body
    raw_body = await request.body()
    raw_body_str = raw_body.decode()

    # Parse form data
    parsed_data = parse_qs(raw_body_str)
    parsed_data_dict = {key: value[0] for key, value in parsed_data.items()}

    # Prepare data for Bingwa API
    payload = urlencode(parsed_data_dict)
    log.info(f"Payload to Bingwa API: {parsed_data_dict}")

    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-API-KEY": x_api_key,
    }

    timeout = httpx.Timeout(30.0)  # Set timeout
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(settings.bingwa_url, headers=headers, data=payload)
            response_data = response.json()
        except httpx.HTTPStatusError as e:
            log.error(f"HTTP error: {e}")
            raise HTTPException(status_code=response.status_code, detail="Bingwa API error")
        except httpx.RequestError as e:
            log.error(f"Request error: {e}")
            raise HTTPException(status_code=500, detail="Failed to connect to Bingwa API")
        except ValueError:
            log.error("Invalid JSON response from Bingwa API")
            raise HTTPException(status_code=500, detail="Invalid response from Bingwa API")

    # Check if response contains expected keys
    res_code = response_data.get("code")
    message = response_data.get("message", "Unknown response")

    if res_code == "706":
        log.info("Request successful, sending STK Push")
        return {"status": "success",'code': res_code,  "message": message}
    else:
        log.error(f"Request failed: {response_data}")
        return {"status": "failed", "code": res_code, "message": message}
