from pydantic import BaseModel, Field
from typing import Optional


class PayBillPush(BaseModel):
    stkNumber: str = Field(..., max_length=12)
    amount: int = Field(..., gt=0)
    rechargeNumber: str = Field(...)


class TillPush(BaseModel):
    stkNumber: str = Field(..., max_length=12)
    amount: int = Field(..., max_length=10)
