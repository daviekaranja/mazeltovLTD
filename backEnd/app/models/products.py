from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base_class import Base
from sqlalchemy.sql import func


class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    phone_number = Column(String(200), nullable=False)
    image_url = Column(String(200), nullable=False)
    owner_id = Column(ForeignKey('user.id'), nullable=False)
    description = Column(String(500), nullable=False)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)


