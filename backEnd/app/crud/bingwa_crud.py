from typing import List, Dict

from sqlalchemy import Date
from sqlalchemy.orm import Session
from sqlalchemy.sql import cast
from sqlmodel import func

from app.crud.base import CRUDBase
from app.models.models import MpesaTransaction, BingwaOffer
from app.schemas.bingwa import BingwaCreate, BingwaUpdate


class BingwaCRUD(CRUDBase[BingwaOffer, BingwaCreate, BingwaUpdate]):
    """
    CRUD operations for Bingwa model.
    Inherits from CRUDBase to provide basic CRUD functionality.
    """

    def get_offers_by_category(self, db: Session, category: str) -> List[BingwaOffer]:
        return db.query(self.model).filter(self.model.category == category).all()

    def get_sales_summary(self, db: Session) -> Dict[str, int]:
        count, total_amount = db.query(
            func.count(MpesaTransaction.id),
            func.sum(MpesaTransaction.amount)
        ).filter(MpesaTransaction.status == "success").one()

        return {
            "total_sales": count,
            "total_amount": total_amount or 0
        }

    def get_top_selling_offers(self, db: Session) -> List[tuple]:
        return db.query(
            BingwaOffer.label,
            func.count(MpesaTransaction.id)
        ).join(
            MpesaTransaction, BingwaOffer.id == MpesaTransaction.offer_id
        ).filter(
            MpesaTransaction.status == "success"
        ).group_by(
            BingwaOffer.label
        ).order_by(
            func.count(MpesaTransaction.id).desc()
        ).limit(5).all()

    def get_daily_sales_summary(self, db: Session) -> List[dict]:
        rows = db.query(
            cast(MpesaTransaction.transaction_date, Date).label("date"),
            func.count(MpesaTransaction.id).label("transactions"),
            func.sum(MpesaTransaction.amount).label("total")
        ).filter(
            MpesaTransaction.status == "success"
        ).group_by(
            cast(MpesaTransaction.transaction_date, Date)
        ).order_by(
            cast(MpesaTransaction.transaction_date, Date).desc()
        ).all()

        return [
            {
                "date": row.date.isoformat(),
                "transactions": row.transactions,
                "total_amount": row.total or 0
            }
            for row in rows
        ]
bingwa = BingwaCRUD(BingwaOffer)  # Create an instance of the CRUD class for BingwaOffer