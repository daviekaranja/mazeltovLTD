from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.api import dependancies
from app.crud import crudUsers
from app.schemas.user import UserResponse, UserUpdate, UserCreate
from typing import List
from  fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.get('/get-users', status_code=200, response_model=List[UserResponse])
def get_users_multi(db: Session = Depends(dependancies.get_db)):
    users = crudUsers.user.get_multi(db)
    return users


@router.get('/get-user/{user_id}', status_code=200, response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(dependancies.get_db)):
    user_by_id = crudUsers.user.get(db, id=user_id)
    return user_by_id


@router.post('/create-user', status_code=201, response_model=UserResponse)
def create_user(db: Session = Depends(dependancies.get_db) ,*, obj_in: UserCreate):
    new_user = crudUsers.user.create_user(db, obj_in=obj_in)
    return jsonable_encoder(new_user)


@router.put('/update-user/{user_id}', status_code=201, response_model=UserResponse)
def update_user(db: Session = Depends(dependancies.get_db),*, obj_in: UserUpdate, user_id: int):
    db_obj = crudUsers.user.get(db, id=user_id)
    updated_user = crudUsers.user.update(db, db_obj=db_obj, obj_in=obj_in)
    return updated_user


@router.delete('/remove_user/{user_id}', status_code=204)
def remove_user(db: Session = Depends(dependancies.get_db),*, user_id: int):
    remove = crudUsers.user.remove(db, id=user_id)
    return remove
