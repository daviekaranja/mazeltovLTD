from fastapi import APIRouter
from .routes import products, users, login

api_router = APIRouter()

api_router.include_router(login.router, prefix='/auth', tags=['Authentication'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
api_router.include_router(products.router, prefix='/products', tags=['Products'])

