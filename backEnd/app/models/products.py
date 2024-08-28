from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, DateTime
from ..db.base import Base
from sqlalchemy.sql import func


class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)
    category = Column(String(50), nullable=True)
    image_url = Column(String(200), nullable=True)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)
