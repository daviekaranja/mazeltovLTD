from pydantic import BaseModel, Field
from typing import Optional


class ProductBase(BaseModel):
    name: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: float = Field(..., gt=0)
    category: Optional[str] = Field(None, max_length=50)
    image_url: Optional[str] = Field(None, max_length=200)


class ProductCreate(ProductBase):
    pass  # Inherits all fields from ProductBase


class ProductUpdate(ProductBase):
    name: Optional[str] = Field(None, max_length=100)
    price: Optional[float] = Field(None, gt=0)


class Product(ProductBase):
    id: int
