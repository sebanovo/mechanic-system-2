from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel

from app.common.contracts import ApiResponse
from app.common.pagination import PaginationMeta
from app.modules.identity.user.schemas import UserPublic

CustomerStatus = Literal["ACTIVE", "INACTIVE", "BLOCKED"]


class CustomerPublic(BaseModel):
    id: str
    user_id: str
    customer_code: str
    status: CustomerStatus
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class CustomerDetailPublic(BaseModel):
    customer: CustomerPublic
    user: UserPublic


class CustomerStatusChangeRequest(BaseModel):
    status: CustomerStatus


class CustomerListData(BaseModel):
    items: list[CustomerDetailPublic]
    pagination: PaginationMeta


class CustomerResponse(ApiResponse[CustomerDetailPublic]):
    pass


class CustomersResponse(ApiResponse[CustomerListData]):
    pass
