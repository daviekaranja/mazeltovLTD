from datetime import datetime, timedelta
from typing import Any, Union

from fastapi import HTTPException
from jose import JWTError, jwt
from passlib.context import CryptContext
from starlette import status
from ..crud import crudUsers

from .. import schemas
from ..core.config import settings
from ..schemas.token import Token

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

algorithm = settings.algorithm


def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    validation = Token(**to_encode)
    data = validation.model_dump()
    encoded_jwt = jwt.encode(data, settings.secret, algorithm=algorithm)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        result = pwd_context.verify(plain_password, hashed_password)
        return result
    except Exception as e:
        return False


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
