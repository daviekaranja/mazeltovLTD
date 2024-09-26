from fastapi import APIRouter
from .routes import products, users, login, integrations, utils

api_router = APIRouter()

api_router.include_router(login.router, prefix='/auth', tags=['Authentication'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
api_router.include_router(products.router, prefix='/products', tags=['Products'])
api_router.include_router(integrations.router, prefix='/payments/c2b', tags=['Payments'])
api_router.include_router(utils.router, prefix='/utils', tags=['Utilities'])

