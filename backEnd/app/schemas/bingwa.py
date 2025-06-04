from enum import Enum
from typing import Optional

from sqlmodel import SQLModel


class OfferCategory(str, Enum):
    data = "data"
    sms = "sms"
    minutes = "minutes"
    minutes_plus_data = "minutesPlusData"

class BingwaCreate(SQLModel):
    price: int
    validity: str
    label: str
    category : str

class BingwaUpdate(BingwaCreate):
    price : Optional[int] = None
    validity: Optional[str] = None
    label: Optional[str] = None
    category: Optional[OfferCategory] = None

