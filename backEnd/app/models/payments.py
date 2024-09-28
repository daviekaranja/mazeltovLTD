from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base_class import Base
from sqlalchemy.sql import func


class Transaction(Base):
    id = Column(Integer, primary_key=True, index=True)
    mpesa_receipt_number = Column(String, unique=True, index=True)
    phone_number = Column(String, index=True)
    amount = Column(Integer)
    merchant_request_id = Column(String)
    checkout_request_id = Column(String)
    transaction_date = Column(DateTime)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)


class UnsuccessfulTransactions(Base):
    id = Column(Integer, primary_key=True, index=True)
    MerchantRequestID = Column(String, nullable=False)
    CheckoutRequestID = Column(String, nullable=False)
    ResultCode = Column(String, nullable=False)
    ResultDesc = Column(String, nullable=False)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)

