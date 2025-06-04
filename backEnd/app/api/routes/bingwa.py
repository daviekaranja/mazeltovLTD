from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session

from app.api.dependancies import get_db
from app.schemas.bingwa import BingwaCreate, BingwaUpdate, OfferCategory
from app.crud.bingwa_crud import bingwa
from app.utilities.logger import logger

router = APIRouter()

@router.get("/get-all", status_code=200)
def get_all_bingwa(db: Session = Depends(get_db)):
    """
    Endpoint to get all Bingwa data.
    """
    try:
        # Simulating a database call or external API call
        offers = bingwa.get_multi(db)
        return offers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.post("/create", status_code=201)
def create_bingwa_offer(
    bingwa_create: BingwaCreate, db: Session = Depends(get_db)
):
    """
    Endpoint to create a new Bingwa offer.
    """
    try:
        offer = bingwa.create(db, obj_in=bingwa_create)
        logger.debug(f"Created new Bingwa offer with ID: {offer.id}")
        return offer
    except Exception as e:
        logger.error(f"Error creating Bingwa offer: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")




@router.put("/update/{offer_id}", status_code=200)
def update_bingwa_offer(
    offer_id: int, bingwa_update: BingwaUpdate, db: Session = Depends(get_db)
):
    """
    Endpoint to update an existing Bingwa offer.
    """
    try:
        bingwa_offer = bingwa.get(db, id=offer_id)
        logger.debug(f"Updating Bingwa offer with ID: {offer_id}")
        if not bingwa_offer:
            logger.error(f"Offer with ID {offer_id} not found")
            raise HTTPException(status_code=404, detail="Offer not found")

        updated_offer = bingwa.update(db, db_obj=bingwa_offer, obj_in=bingwa_update)
        logger.debug(f"Updated Bingwa offer with ID: {updated_offer.id}")
        return updated_offer
    except Exception as e:
        logger.error(f"Error updating Bingwa offer: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/offers-by-category/{category}", status_code=200)
def get_offers_by_category(
    category: OfferCategory, db: Session = Depends(get_db)
):
    """
    Endpoint to get offers by category.
    """
    try:
        offers = bingwa.get_offers_by_category(db, category=category)
        if not offers:
            raise HTTPException(status_code=404, detail="No offers found in this category")
        return offers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.delete("/delete/{offer_id}", status_code=204)
def delete_bingwa_offer(
    offer_id: int, db: Session = Depends(get_db)
):
    """
    Endpoint to delete a Bingwa offer.
    """
    try:
        bingwa_offer = bingwa.get(db, id=offer_id)
        if not bingwa_offer:
            raise HTTPException(status_code=404, detail="Offer not found")

        bingwa.remove(db, id=offer_id)
        return {"detail": "Offer deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/sales-summary", status_code=200)
def get_sales_summary(db: Session = Depends(get_db)):
    """
    Endpoint to get sales summary.
    """
    try:
        summary = bingwa.get_sales_summary(db)
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/top-selling-offers", status_code=200)
def get_top_selling_offers(db: Session = Depends(get_db)):
    """
    Endpoint to get top selling offers.
    """
    try:
        top_offers = bingwa.get_top_selling_offers(db)
        return top_offers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/daily-sales-summary", status_code=200)
def get_daily_sales_summary(db: Session = Depends(get_db)):
    """
    Endpoint to get daily sales summary.
    """
    try:
        daily_summary = bingwa.get_daily_sales_summary(db)
        return daily_summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")