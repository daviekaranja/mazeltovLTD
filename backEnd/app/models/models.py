from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from app.schemas.bingwa import OfferCategory


class MpesaTransaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    merchant_request_id: str = Field(index=True)
    checkout_request_id: str = Field(index=True)
    status: str = Field(index=True)  # e.g., "success", "failed", "pending"
    mpesa_receipt_number: Optional[str] = Field(default=None, index=True, unique=True)
    receiving_number: Optional[str] = Field(default=None, index=True)
    paying_number: Optional[str] = Field(default=None, index=True)
    offer_id: int = Field(default=None, nullable=False, foreign_key="bingwaoffer.id")
    amount: int
    transaction_date: datetime
    result_code: int = Field(index=True)
    result_desc: str
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
    updated_at: datetime = Field(default_factory=datetime.utcnow, index=True)


class SecurityCode(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    code: int = Field(unique=True)
    expires: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=50)
    email: str = Field(unique=True, max_length=100)
    hashed_password: str = Field(max_length=300)
    is_active: bool = Field(default=True)
    super_user: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class BingwaOffer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    label: str
    price: int
    validity: str
    category: OfferCategory
