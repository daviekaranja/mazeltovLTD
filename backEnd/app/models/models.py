from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, DateTime, ForeignKey, LargeBinary, Boolean
from sqlalchemy.orm import relationship
from ..db.base_class import Base
from sqlalchemy.sql import func




class MpesaTransaction(Base):
    id = Column(Integer, primary_key=True, index=True)
    merchant_request_id = Column(String, nullable=False, index=True)
    checkout_request_id = Column(String, nullable=False, index=True)
    status = Column(String, nullable=False, index=True)  # e.g., "success", "failed", "pending"
    mpesa_receipt_number = Column(String, unique=True, index=True, nullable=True)
    receiving_number = Column(String, index=True, nullable=True)
    paying_number = Column(String, index=True, nullable=True)
    amount = Column(Integer, nullable=False)
    transaction_date = Column(DateTime, nullable=False)
    result_code = Column(Integer, nullable=False, index=True)
    result_desc = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False, index=True)


class SecurityCodes(Base):
    id = Column(Integer, primary_key=True, index=True)
    code = Column(Integer, nullable=False, unique=True)
    expires = Column(DateTime, nullable=False)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)



class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(300), nullable=False)
    is_active = Column(Boolean, default=True)
    super_user = Column(Boolean, default=False)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)
