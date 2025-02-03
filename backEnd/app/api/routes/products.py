from typing import List

from pydantic import EmailStr
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.encoders import jsonable_encoder
from app.api import dependancies
from app.crud import crudProducts, crudUsers
from app.models.products import ProductImage
from app.models.users import User
from app.schemas.product import ProductCreate, ProductUpdate, ProductInDb

router = APIRouter()


@router.get('/get-products', status_code=200, response_model=List[ProductInDb])
def get_products_multi(db: Session = Depends(dependancies.get_db),
                       ):
    """
           Retrieve a product by its ID.
           - **db**: Database session dependency.

           :returns:
           - products
           - 404 HTTPException if the product is not found.
           """
    products = crudProducts.product.get_multi(db)
    if products is None:
        raise HTTPException(status_code=404, detail="products not found")
    return products


@router.get('/get-product/{product_id}', status_code=200)
def get_product_by_id(product_id: int, db: Session = Depends(dependancies.get_db),
                      user: User = Depends(dependancies.get_current_user)):
    """
       Retrieve a product by its ID.

       - **product_id**: ID of the product to retrieve.
       - **db**: Database session dependency.
       - **user**: Current authenticated user dependency.

       Returns:
       - The product details if found and authorized.
       - 404 HTTPException if the product is not found.
       - 403 HTTPException if the user is not authorized to view the product.
       """
    product = crudProducts.product.get(db, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    if crudUsers.user.is_superuser(user):
        return product

    if product.owner_id != user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this product"
                            )
    return product


@router.get('/get-user-products', status_code=200, response_model=List[ProductInDb])
def get_products_by_user(db: Session = Depends(dependancies.get_db),
                         current_user: User = Depends(dependancies.get_current_user)):
    """
           Retrieve a products by a user.

           - **db**: Database session dependency.
           - **user**: Current authenticated user dependency.

           :returns:
           - The products details if found and authorized.
           - 404 HTTPException if the product is not found.
           - 403 HTTPException if the user is not authorized to update the product.
           """
    user = crudUsers.user.get(db, id=current_user.id)
    if user is None:
        raise HTTPException(status_code=404, detail='Not Found')
    else:
        return user.products


@router.post('/create_product', status_code=201, response_model=ProductInDb)
def create_product(user: User = Depends(dependancies.get_current_user),
                   db: Session = Depends(dependancies.get_db), *,
                   product: ProductCreate):
    """
           Creates the product

           - **db**: Database session dependency.
           - **user**: Current authenticated user dependency.

           Creates:
           - The product details if found and authorized.
           - 401 HTTPException if the user is not authorized.
           """
    # product.owner_id = user.id
    product_data = jsonable_encoder(product)
    product_data['owner_id'] = user.id
    new_product = crudProducts.product.create(db=db, obj_in=product_data)
    return new_product


@router.put('/update_product/{product_id}', response_model=ProductInDb)
def update_product(db: Session = Depends(dependancies.get_db), *, product_id: int, obj_in: ProductUpdate,
                   user: User = Depends(dependancies.get_current_user)):
    """
       Retrieve a product by its ID.

       - **product_id**: ID of the product to retrieve.
       - **db**: Database session dependency.
       - **user**: Current authenticated user dependency.

       Updates:
       - The product details if found and authorized.
       - 404 HTTPException if the product is not found.
       - 403 HTTPException if the user is not authorized to update the product.
       """
    db_obj = crudProducts.product.get(db, id=product_id)
    if db_obj is None:
        raise HTTPException(status_code=404, detail='Product Not found')

    if crudUsers.user.is_superuser(user) or db_obj.owner_id == user.id:
        try:
            obj_data = jsonable_encoder(obj_in)
            obj_data['owner_id'] = user.id
            product = crudProducts.product.update(db, db_obj=db_obj, obj_in=obj_data)
            return product
        except Exception as e:
            raise e
    else:
        raise HTTPException(status_code=403, detail="You do not have permission to update this product")


@router.post("/products/upload-images/{product_id}")
async def upload_images(product_id: int, files: List[UploadFile] = File(...),
                        db: Session = Depends(dependancies.get_db)):
    max_images = 6
    max_image_size_mb = 1
    prod = crudProducts.product.get(db, id=product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")

    if len(files) > max_images:
        raise HTTPException(status_code=400, detail="You can only upload a maximum of 6 images")

    for file in files:
        contents = await file.read()
        if len(contents) > max_image_size_mb * 1048576:
            raise HTTPException(status_code=400, detail="Each image must be smaller than 1MB.")
        image = ProductImage(product_id=product_id, image_data=contents)
        db.add(image)

    db.commit()
    return {"message": "Images uploaded successfully"}


@router.delete('/remove-product/{product_id}', status_code=204)
def remove_product(*, product_id, db: Session = Depends(dependancies.get_db),
                   user: User = Depends(dependancies.get_current_user)):
    """
           Retrieve a product by its ID.

           - **product_id**: ID of the product to retrieve.
           - **db**: Database session dependency.
           - **user**: Current authenticated user dependency.

           Removes:
           - The product details if found and authorized.
           - 404 HTTPException if the product is not found.
           - 403 HTTPException if the user is not authorized to remove the product.
           """
    db_obj = crudProducts.product.get(db, id=product_id)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="Product Not Found")

    if crudUsers.user.is_superuser(user) or db_obj.owner_id == user.id:
        del_product = crudProducts.product.remove(db, id=db_obj.id)
        return del_product
    else:
        raise HTTPException(status_code=403, detail="You do not have permission to remove this product")
