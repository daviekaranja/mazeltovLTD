from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.base_class import Base


class SecurityCodes(Base):
    id = Column(Integer, primary_key=True, index=True)
    code = Column(Integer, nullable=False, unique=True)
    expires = Column(DateTime, nullable=False)
    createdAt = Column(DateTime, server_default=func.now(), nullable=False)
