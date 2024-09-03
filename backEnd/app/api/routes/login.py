from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import dependancies as deps
from app.core.security import create_access_token
from app.crud import crudUsers
from app.models.users import User
from app.schemas.user import UserResponse

router = APIRouter()


@router.post("/access-token", status_code=200)
def login(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = crudUsers.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if user is None:
        raise HTTPException(status_code=401, detail="wrong email or password")

    access_token = {
        "access_token": create_access_token(user.id),
        "token_type": "bearer",
    }
    return access_token


@router.get("/test-token", status_code=200, response_model=None)
def token_test(token: str, db: Session = Depends(deps.get_db)):
    user = deps.validate_access_token(token)
    return user


@router.get("/get-current-user", status_code=200, response_model=UserResponse)
def current_user(user: User = Depends(deps.get_current_user)):
    return user
