from pydantic import BaseModel, FieldValidationInfo, field_validator, ValidationError, Field
from typing import Optional


class PayBillPush(BaseModel):
    stkNumber: str = Field(..., max_length=12)
    amount: int = Field(..., gt=0)
    rechargeNumber: str = Field(...)


class PushParam(BaseModel):
    stkNumber: int
    amount: int
    rechargeNumber: int


class STKPushResponse(BaseModel):
    MerchantRequestID: str
    CheckoutRequestID: str
    ResponseCode: str
    ResponseDescription: str
    CustomerMessage: str


class PushParams(BaseModel):
    stkNumber: str  # Should be a string to handle leading zeros
    amount: int
    rechargeNumber: str  # Should be a string to handle leading zeros

    # Validate stkNumber to be in the format 2547... or 2541... and exactly 12 characters long
    @field_validator('stkNumber')
    def validate_stk_number(cls, value: str, info: FieldValidationInfo):
        if len(value) != 12:
            raise ValueError('stkNumber must be exactly 12 digits long')
        if not (value.startswith('2547') or value.startswith('2541')):
            raise ValueError('stkNumber must start with 2547 or 2541')
        if not value.isdigit():
            raise ValueError('stkNumber must contain only digits')
        return value

    # Validate amount to be between 5 and 500
    @field_validator('amount')
    def validate_amount(cls, value: int, info: FieldValidationInfo):
        if not (5 <= value <= 500):
            raise ValueError('amount must be between 5 and 500')
        return value

    # Validate rechargeNumber to be in the format 07... or 01... and exactly 10 characters long
    @field_validator('rechargeNumber')
    def validate_recharge_number(cls, value: str, info: FieldValidationInfo):
        if len(value) != 10:
            raise ValueError('rechargeNumber must be exactly 10 digits long')
        if not (value.startswith('07') or value.startswith('01')):
            raise ValueError('rechargeNumber must start with 07 or 01')
        if not value.isdigit():
            raise ValueError('rechargeNumber must contain only digits')
        return value

# # Example Usage:
# try:
#     params = PushParams(stkNumber="254712345678", amount=100, rechargeNumber="0712345678")
#     print(params)
# except ValidationError as e:
#     print(e)
