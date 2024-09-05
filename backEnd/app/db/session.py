from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from ..core.config import settings
from .base_class import Base
from ..models import users, products


def create_data_folder(data_dir):
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)


folder = create_data_folder('data')

# SQLite database URL
SQLALCHEMY_DATABASE_URL = settings.sqlalchemy_url

# Create the SQLite database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)
