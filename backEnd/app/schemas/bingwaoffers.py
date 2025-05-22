from pydantic import BaseModel, Field
from typing import Optional


class BingwaBase(BaseModel):
    title: str = Field(..., max_length=100)
    category: Optional[str] = Field(None, max_length=50)
    price: float = Field(..., gt=0)


class BingwaCreate(BingwaBase):
    expiry: str #Hours, Days, Monthly
    pass  # Inherits all fields from ProductBase


class BingwaUpdate(BingwaBase):
    title: Optional[str] = Field(None, max_length=100)
    price: Optional[float] = Field(None, gt=0)


class BingwaInDb(BaseModel):
    id: int
    title: str
    price: float
    category: str
    expiry: str



# class Product(ProductBase):
#     id: int
