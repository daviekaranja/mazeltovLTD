from typing import List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from app.api.dependancies import get_db
from app.models.models import MpesaTransaction
from app.crud.mpesa_transaction import transaction
from app.schemas.transaction import MpesaTransactionResponse, TransactionStatus

router = APIRouter()

@router.get("/mpesa/transactions", status_code=200, response_model=List[MpesaTransactionResponse])
def get_mpesa_transactions(
    db: Session = Depends(get_db)
):
    """
    Get all M-Pesa transactions.
    """
    try:
        transactions = transaction.get_multi(db)
        return transactions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/mpesa/transactions/{transaction_id}", status_code=200, response_model=MpesaTransactionResponse)
def get_mpesa_transaction(
    merchant_request_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a specific M-Pesa transaction by ID.
    """
    try:
        trans = transaction.get_by_merchant_request_id(db, merchant_request_id)
        if not trans:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return trans
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/get_by_checkout_request_id/{checkout_request_id}', status_code=200, response_model=MpesaTransactionResponse)
def get_mpesa_transaction_by_checkout_request_id(
    checkout_request_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a specific M-Pesa transaction by checkout request ID.
    """
    trans = transaction.get_by_checkout_request_id(db, checkout_request_id)
    if not trans:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return trans

@router.get('/get-transaction-by-status', status_code=200, response_model=List[MpesaTransactionResponse])
def get_by_status(status: TransactionStatus, db: Session = Depends(get_db)):
    """
    Get M-Pesa transactions by status.
    """
    txn = transaction.get_by_status(db, status)
    if not txn:
        raise HTTPException(status_code=404, detail="No transactions found with the given status")
    return txn


