from fastapi import APIRouter
from .routes import products, users, login, buy_services, logs

api_router = APIRouter()

api_router.include_router(login.router, prefix='/auth', tags=['Authentication'])
api_router.include_router(buy_services.router, prefix='/airtime', tags=['Airtime'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
api_router.include_router(products.router, prefix='/products', tags=['Products'])
api_router.include_router(logs.router, prefix='/logs', tags=['Logs'])

