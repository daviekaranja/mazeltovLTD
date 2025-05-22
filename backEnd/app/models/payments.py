from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base_class import Base
from sqlalchemy.sql import func

class MpesaTransaction(Base):
    __tablename__ = "mpesa_transactions"
    id = Column(Integer, primary_key=True, index=True)
    merchant_request_id = Column(String, nullable=False, index=True)
    checkout_request_id = Column(String, nullable=False, index=True)
    status = Column(String, nullable=False, index=True)  # e.g., "success", "failed", "pending"
    mpesa_receipt_number = Column(String, unique=True, index=True, nullable=True)
    phone_number         = Column(String, index=True, nullable=True)
    amount               = Column(Integer, nullable=True)
    transaction_date     = Column(DateTime, nullable=True)
    result_code = Column(Integer, nullable=False, index=True)
    result_desc = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False, index=True)