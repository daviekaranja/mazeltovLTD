from typing import Type

from fastapi import HTTPException
from pydantic import EmailStr
from sqlalchemy import exc
from sqlalchemy.orm import Session

from .base import CRUDBase
from ..core.security import verify_password, get_password_hash
from ..models.users import User
from ..schemas.user import UserCreate, UserUpdate, UserResponse


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def create_user(self, db: Session, obj_in: UserCreate) -> User:
        obj_in.password = get_password_hash(obj_in.password) ; user_data = obj_in.model_dump()
        user_data['hashed_password'] = get_password_hash(obj_in.password)
        del user_data['password']
        db_obj = self.model(**user_data)
        try:
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)
        except exc.IntegrityError as error:
            print(f'An error occurred{error}')
            db.rollback()
            raise HTTPException(status_code=500, detail='an error occured')

    # def create_superuser(self, db, obj_in: CreateSuperUser):
    #     obj_in.hashed_password = get_password_hash(obj_in.hashed_password)
    #     superuser_data = obj_in.model_dump()
    #     db_obj = self.model(**superuser_data)
    #     return self.create(db, obj_in=db_obj)

    def get_by_email(self, db: Session, email: EmailStr):
        try:
            user_by_email = db.query(self.model).filter(self.model.email == email).one()
        except exc.NoResultFound as error:
            raise HTTPException(status_code=404, detail="user not found")
        return user_by_email

    def authenticate(self, db: Session, email: EmailStr, password) -> Type[User]:
        user = self.get_by_email(db, email)
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, obj: User):
        if not obj.is_active:
            raise HTTPException(status_code=403, detail="User Not Active")
        return obj

    def is_superuser(self, obj: User):
        if not obj.is_superuser:
            raise HTTPException(status_code=403, detail="Not enough privileges")
        return obj

    def activate_user(self, user_obj: User, db: Session):
        if not user_obj.is_active:
            user_obj.is_active = True
        try:
            db.add(user_obj)
            db.commit()
            db.refresh(user_obj)
            return user_obj
        except exc.IntegrityError as error:
            db.rollback()
            raise HTTPException(status_code=409, detail="Duplicate Data")


user = CRUDUser(User)
