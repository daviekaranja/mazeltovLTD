from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import dependancies as deps
from app.core.security import create_access_token
from app.crud import crudUsers
from app.models.users import User
from app.schemas.user import UserResponse
from app.schemas.token import TokenResponse

router = APIRouter()


@router.post("/access-token", status_code=200, response_model=TokenResponse)
def login(
        response: Response,
        db: Session = Depends(deps.get_db),
        form_data: OAuth2PasswordRequestForm = Depends()
):
    # Authenticate the user
    user = crudUsers.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if user is None:
        raise HTTPException(status_code=401, detail="wrong email or password")

    # Create a new access token
    access_token = create_access_token(user.id)
    # Clear any existing cookies
    response.delete_cookie(key='token')

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=3600
    )



@router.get('/get-current-user', status_code=200, response_model=UserResponse)
def get_current_user(current_user: User = Depends(deps.get_current_user)):
    return current_user
