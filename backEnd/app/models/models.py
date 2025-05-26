# from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, DateTime, ForeignKey, LargeBinary, Boolean
# from sqlalchemy.orm import relationship
# from ..db.base_class import Base
# from sqlalchemy.sql import func
# from sqlmodel import SQLModel, Field
# from typing import Optional
# from enum import Enum
#
#
#
#
#
# class MpesaTransaction(Base):
#     id = Column(Integer, primary_key=True, index=True)
#     merchant_request_id = Column(String, nullable=False, index=True)
#     checkout_request_id = Column(String, nullable=False, index=True)
#     status = Column(String, nullable=False, index=True)  # e.g., "success", "failed", "pending"
#     mpesa_receipt_number = Column(String, unique=True, index=True, nullable=True)
#     receiving_number = Column(String, index=True, nullable=True)
#     paying_number = Column(String, index=True, nullable=True)
#     amount = Column(Integer, nullable=False)
#     transaction_date = Column(DateTime, nullable=False)
#     result_code = Column(Integer, nullable=False, index=True)
#     result_desc = Column(String, nullable=False)
#     created_at = Column(DateTime, server_default=func.now(), nullable=False, index=True)
#     updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False, index=True)
#
#
# class SecurityCodes(Base):
#     id = Column(Integer, primary_key=True, index=True)
#     code = Column(Integer, nullable=False, unique=True)
#     expires = Column(DateTime, nullable=False)
#     createdAt = Column(DateTime, server_default=func.now(), nullable=False)
#
#
#
# class User(Base):
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(50), nullable=False)
#     email = Column(String(100), unique=True, nullable=False)
#     hashed_password = Column(String(300), nullable=False)
#     is_active = Column(Boolean, default=True)
#     super_user = Column(Boolean, default=False)
#     createdAt = Column(DateTime, server_default=func.now(), nullable=False)
#
#
#
#
# class OfferCategory(str, Enum):
#     data = "data"
#     sms = "sms"
#     minutes = "minutes"
#     minutes_plus_data = "minutesPlusData"
#
#
# class Offer(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     label: str
#     price: int
#     product_id: str = Field(index=True, unique=True)
#     category: OfferCategory


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
