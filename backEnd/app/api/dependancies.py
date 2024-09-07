import datetime
from typing import Generator, Optional

from fastapi import Depends, HTTPException, Request, Cookie
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import EmailStr
from sqlalchemy.orm import Session
from starlette import status

from ..core.config import settings

from ..db.session import SessionLocal
from ..schemas.token import TokenPayLoad
from ..crud import crudUsers
from ..models.users import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/access-token")


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(db: Session = Depends(get_db),token: str = Depends(oauth2_scheme)):
    token_data = validate_access_token(token)
    user = crudUsers.user.get(db, id=int(token_data.sub))
    if user is None:
        raise HTTPException(status_code=401, detail='Not Authenticated')
    if not user.is_active:
        raise HTTPException(status_code=403, detail='Inactive User')
    return user


def validate_access_token(token: str) -> TokenPayLoad:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret, algorithms=[settings.ALGORITHM])
        token_data = TokenPayLoad(**payload)
        if token_data.sub is None:
            raise credentials_exception
        now = settings.get_local_time_with_timezone()
        if now > token_data.exp:
            raise credentials_exception
    except JWTError as error:
        raise credentials_exception
    return token_data
