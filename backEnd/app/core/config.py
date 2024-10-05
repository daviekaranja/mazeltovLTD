import secrets
from datetime import datetime
from typing import Union
import pytz
from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, EmailStr, ConfigDict


class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env")  # Correct placement

    sqlalchemy_url: str
    admin_email: str
    admin_name: str
    admin_password: str
    frontend_origin: str
    algorithm: str
    api_string: str = '/api/v1'
    ACCESS_TOKEN_EXPIRE_SECONDS: int = 3600
    secret: str = 'secrets.token_urlsafe()'

    # Mpesa Integration
    shortcode: str
    passkey: str
    consumer_key: str
    consumer_secret: str
    api_url: str
    token_url: str
    till_no: int

    static_files: str
    def get_local_time_with_timezone(self):
        # Define the timezone for Africa/Nairobi
        nairobi_tz = pytz.timezone('Africa/Nairobi')

        # Get the current time in UTC and localize it to Africa/Nairobi timezone
        utc_now = datetime.utcnow()
        local_time = pytz.utc.localize(utc_now).astimezone(nairobi_tz)

        return local_time

    # class Config:
    #     env_file = ".env"  # Optional: For local development only


# Initialize Settings without _env_file for containerization
settings = Settings()
