import re
from pydantic import BaseModel, Field, field_validator


class STKPushResponse(BaseModel):
    MerchantRequestID: str
    CheckoutRequestID: str
    ResponseCode: str
    ResponseDescription: str
    CustomerMessage: str



class TransactionResponse(BaseModel):
    amount: int
    phone_number: int
    mpesa_receipt_number: str
    createdAt: str




class AirtimeTopUpRequest(BaseModel):
    paying_number: str
    receiving_number: str
    offer_id: int = Field(..., gt=0, description="Offer ID must be a positive integer")
    amount: int = Field(..., gt=0, description="Must be a positive integer")

    @field_validator("paying_number", "receiving_number", mode="before")
    @classmethod
    def _validate_and_format_msisdn(cls, v: str) -> str:
        """
        - Must be a 10-digit string starting with 07 or 01.
        - Strips the leading zero and prepends '254'.
        """
        if not isinstance(v, str):
            raise TypeError("MSISDN must be a string")
        if not re.fullmatch(r"0(?:7|1)\d{8}", v):
            raise ValueError("must start with '07' or '01' and be 10 digits")
        return "254" + v[1:]
