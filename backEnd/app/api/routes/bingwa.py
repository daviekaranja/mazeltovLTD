from typing import List

from fastapi import APIRouter, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.schemas.bingwaoffers import BingwaUpdate, BingwaCreate, BingwaInDb
from app.crud.crudBingwaOffers import bingwa
from app.api import dependancies

router = APIRouter()

@router.get('/get-bingwa-offers', status_code=200, response_model=List[BingwaInDb])
def get_bingwa_offers(db: Session = Depends(dependancies.get_db)):
    offers = bingwa.get_multi(db)
    if offers is None:
        raise HTTPException(status_code=404, detail="No offers found")
    return offers


@router.get('/get-bingwa-offer-by-id/{offer_id}', status_code=200, response_model=BingwaInDb)
def get_offer_by_id(offer_id: int, db: Session = Depends(dependancies.get_db)):
    offer = bingwa.get(db, id=offer_id)
    if offer is None:
        raise HTTPException(status_code=404, detail="Not found")
    return offer

@router.post('/create-bingwa-offer', status_code=201, response_model=BingwaInDb)
def create_bingwa_offer(params: BingwaCreate, db: Session = Depends(dependancies.get_db)):
    offer = bingwa.create(db=db, obj_in=params)
    if offer is not None:
        return offer
    else:
        raise HTTPException(status_code=500, detail="An Error occurred")

@router.put('/update-bingwa-offer/{offer_id}', status_code=200, response_model=BingwaInDb)
def update_bingwa_offer(obj_in: BingwaUpdate, offer_id: int, db: Session = Depends(dependancies.get_db)):
    db_obj = bingwa.get(db, id=offer_id)
    if db_obj is None:
        raise HTTPException(status_code=404, detail='not found')
    try:
        obj_data = jsonable_encoder(obj_in)
        updated_offer = bingwa.update(db, db_obj=db_obj, obj_in=obj_data)
        return updated_offer
    except Exception as error:
        raise error

@router.delete('/delete-bingwa-offer/{id}', status_code=204)
def delete_bingwa_offer(id: int, db: Session = Depends(dependancies.get_db)):
    offer = bingwa.get(id=id, db=db)
    if offer is None:
        raise HTTPException(status_code=404, detail='not found')
    bingwa.remove(db, id=id)
    return {"detail": "Offer deleted"}