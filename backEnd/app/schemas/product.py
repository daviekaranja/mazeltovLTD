from pydantic import BaseModel, Field
from typing import Optional


class ProductBase(BaseModel):
    name: str = Field(..., max_length=100)
    category: Optional[str] = Field(None, max_length=50)
    price: float = Field(..., gt=0)
    phone_number: str = Field(..., max_length=100)
    owner_id: Optional[int] = Field(..., gt=0)
    image_url: Optional[str] = Field(None, max_length=200)
    description: Optional[str] = Field(None, max_length=500)


class ProductCreate(ProductBase):
    pass  # Inherits all fields from ProductBase


class ProductUpdate(ProductBase):
    name: Optional[str] = Field(None, max_length=100)
    price: Optional[float] = Field(None, gt=0)


class ProductInDb(BaseModel):
    id: int
    name: str
    price: float
    phone_number: str
    category: str
    description: str
    image_url: str


class Product(ProductBase):
    id: int
