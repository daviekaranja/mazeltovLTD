from fastapi import APIRouter
from .routes import products, users, login, buy_airtime, utils,communications, proxies, bingwa, payments

api_router = APIRouter()

api_router.include_router(login.router, prefix='/auth', tags=['Authentication'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
# api_router.include_router(products.router, prefix='/products', tags=['Products'])
# api_router.include_router(bingwa.router, prefix='/bingwa', tags=['Bingwa Offers'])
# api_router.include_router(buy_airtime.router, prefix='/payments/c2b', tags=['Payments'])
api_router.include_router(proxies.router, prefix='/proxy', tags=['Proxies'])
api_router.include_router(utils.router, prefix='/utils', tags=['Utilities'])
api_router.include_router(communications.router, prefix='/communications', tags=['Communication'])
api_router.include_router(payments.router, prefix='/payments', tags=['Payments'])