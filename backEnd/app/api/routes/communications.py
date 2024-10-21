import os.path

from fastapi import APIRouter, Query, HTTPException, Request
from app.communications.email_client import send_email_internal
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from app.core.config import settings

router = APIRouter()


@router.post("/send-email")
async def send_email(recipient: str = Query(...), subject: str = Query(...), body: str = Query(...)):
    try:
        send_email_internal(recipient, subject, body)
        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post('/send-sms')
def send_sms():
    pass

templates = Jinja2Templates(directory=settings.template_path)


# An example endpoint for rendering a test email (for demonstration)
@router.get("/email-with-template", response_class=HTMLResponse)
async def test_email(request: Request):
    # Just a test render with dummy data
    return templates.TemplateResponse("password_reset_email.html", {
        "request": request,
        "username": "Grace",
        "reset_link": "https://yourdomain.com/reset-password/token"
    })
