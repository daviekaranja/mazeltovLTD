from sqlmodel import Session

from .base import CRUDBase
from app.schemas.bingwa import OfferCategory
from app.models.models import BingwaOffer
from app.schemas.bingwa import BingwaCreate, BingwaUpdate


class BingwaCRUD(CRUDBase[BingwaOffer, BingwaCreate, BingwaUpdate]):
    """
    CRUD operations for Bingwa model.
    Inherits from CRUDBase to provide basic CRUD functionality.
    """
    def get_offers_by_category(self, db: Session, category: str):
        """
        Retrieve offers by category.
        :param db: Database session
        :param category: Category of the offers to retrieve
        :return: List of BingwaOffer objects in the specified category
        """
        return db.query(self.model).filter(self.model.category == category).all()


bingwa = BingwaCRUD(BingwaOffer)  # Create an instance of the CRUD class for BingwaOffer