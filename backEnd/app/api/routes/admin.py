from json import JSONDecodeError

import requests
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.encoders import jsonable_encoder
from requests.exceptions import RequestException, HTTPError
from sqlalchemy.orm import Session
from app.api.dependancies import get_db
from app.utilities.seed_offers import seed_offers
from app.utilities.logger import log


router = APIRouter()

@router.post("/seed-offers", status_code=201)
def seeding_offers(db: Session = Depends(get_db)):
    """
    Endpoint to seed offers into the database.
    """
    try:
        results = seed_offers(db)
        return {"message": "Offers seeded successfully"}
    except (RequestException, HTTPError, JSONDecodeError) as e:
        log.error(f"Error seeding offers: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        log.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")