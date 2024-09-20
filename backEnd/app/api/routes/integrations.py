from fastapi import APIRouter

router = APIRouter()


@router.post('/paybill', status_code=200)
def playbill_integrations():
    pass


@router.post('/till', status_code=200)
def till_integrations():
    pass
