from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.api import dependancies
from app.crud import crudProducts
from app.schemas.product import ProductCreate, ProductUpdate

router = APIRouter()


@router.get('/get-products', status_code=200)
def get_products_multi(db: Session = Depends(dependancies.get_db)):
    products = crudProducts.product.get_multi(db)
    return products


@router.get('/get-product/{product_id}', status_code=200)
def get_product_by_id(product_id: int, db: Session = Depends(dependancies.get_db)):
    product = crudProducts.product.get(db, product_id)
    return product


@router.post('/create_product', status_code=201)
def create_product(db: Session = Depends(dependancies.get_db), *, product: ProductCreate):
    new_product = crudProducts.product.create(db=db, obj_in=product)
    return new_product


@router.put('/update_product/{product_id}')
def update_product(db: Session = Depends(dependancies.get_db),*, product_id: int, obj_in: ProductUpdate):
    db_obj = crudProducts.product.get(db, id=product_id)
    product = crudProducts.product.update(db, db_obj=db_obj, obj_in=obj_in)
    return product


@router.delete('/remove-product/{product_id}', status_code=204)
def remove_product(*, product_id, db: Session = Depends(dependancies.get_db)):
    db_obj = crudProducts.product.remove(db, id=product_id)
