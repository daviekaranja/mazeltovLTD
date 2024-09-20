from fastapi import APIRouter

router = APIRouter()


@router.post('/send-email')
def send_email():
    pass


@router.post('/send-sms')
def send_sms():
    pass
