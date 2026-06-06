from __future__ import annotations

from app.modules.identity.customer.models import Customer
from app.modules.identity.customer.schemas import CustomerDetailPublic, CustomerPublic
from app.modules.identity.user.mappers import user_public
from app.modules.identity.user.models import User


def customer_public(customer: Customer) -> CustomerPublic:
    return CustomerPublic(
        id=str(customer.id),
        user_id=str(customer.user_id),
        customer_code=customer.customer_code,
        status=customer.status,  # type: ignore[arg-type]
        created_at=customer.created_at,
        updated_at=customer.updated_at,
        deleted_at=customer.deleted_at,
    )


def customer_detail_public(customer: Customer, user: User) -> CustomerDetailPublic:
    return CustomerDetailPublic(
        customer=customer_public(customer),
        user=user_public(user),
    )