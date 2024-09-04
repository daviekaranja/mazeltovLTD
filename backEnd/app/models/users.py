from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.base import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(300), nullable=False)
    is_active = Column(Boolean, default=True)
    super_user = Column(Boolean, default=False)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)

    products = relationship('Product', backref='user', lazy='dynamic')
