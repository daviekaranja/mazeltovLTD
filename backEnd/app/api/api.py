from fastapi import APIRouter
from .routes import  users, login,  communications,  payments,mpesa_transactions

api_router = APIRouter()

api_router.include_router(login.router, prefix='/auth', tags=['Authentication'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
api_router.include_router(communications.router, prefix='/communications', tags=['Communication'])
api_router.include_router(payments.router, prefix='/payments', tags=['Payments'])
api_router.include_router(mpesa_transactions.router, prefix='/transactions', tags=['M-Pesa Transactions'])