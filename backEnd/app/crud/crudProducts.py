from .base import CRUDBase
from ..models.products import Product
from ..schemas.product import ProductCreate, ProductUpdate


class CrudProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    pass


product = CrudProduct(Product)
