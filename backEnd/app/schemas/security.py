from typing import Union, Optional

from pydantic import BaseModel
import datetime


class SecurityCode(BaseModel):
    code: int
    expires: datetime.datetime
