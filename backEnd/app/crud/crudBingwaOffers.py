from app.models.products import BingwaOffers
from app.schemas.bingwaoffers import BingwaCreate, BingwaUpdate
from .base import CRUDBase

class CrudBingwa(CRUDBase[BingwaOffers, BingwaCreate, BingwaUpdate]):
    pass


bingwa = CrudBingwa(BingwaOffers)