from datetime import datetime
from typing import Union
import pytz
from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, EmailStr


class Settings(BaseSettings):
    domain: str = "localhost"
    project_name: str = 'mazeltovBackend'
    sqlalchemy_url: str
    admin_email: str
    admin_name: str
    admin_password: str
    frontend_origin: str
    algorithm: str

    class Config:
        env_file = ".env"  # Optional: For local development only


# Initialize Settings without _env_file for containerization
settings = Settings()
