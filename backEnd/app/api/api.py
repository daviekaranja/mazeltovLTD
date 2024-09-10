from fastapi import APIRouter
from .routes import products, users, login, buy_airtime

api_router = APIRouter()

api_router.include_router(login.router, prefix='/auth', tags=['Authentication'])
api_router.include_router(buy_airtime.router, prefix='/airtime', tags=['Airtime'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
api_router.include_router(products.router, prefix='/products', tags=['Products'])

