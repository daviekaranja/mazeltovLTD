from typing import Union, Optional

from pydantic import BaseModel
import datetime


class Token(BaseModel):
    sub: Union[str]
    exp: datetime.datetime
    scopes: Optional[dict] = None


class TokenPayLoad(BaseModel):
    exp: datetime.datetime
    sub: Union[str, int]
