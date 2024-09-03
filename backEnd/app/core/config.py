import secrets
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
    api_string: str = '/api/v1'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1200
    secret: str = 'secrets.token_urlsafe()'
    ALGORITHM: str

    def get_local_time_with_timezone(self):
        # Define the timezone for Africa/Nairobi
        nairobi_tz = pytz.timezone('Africa/Nairobi')

        # Get the current time in UTC and localize it to Africa/Nairobi timezone
        utc_now = datetime.utcnow()
        local_time = pytz.utc.localize(utc_now).astimezone(nairobi_tz)

        return local_time

    class Config:
        env_file = ".env"  # Optional: For local development only


# Initialize Settings without _env_file for containerization
settings = Settings()
