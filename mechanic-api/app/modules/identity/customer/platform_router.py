from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.mappers import customer_detail_public
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.customer.schemas import (
    CustomerListData,
    CustomerResponse,
    CustomersResponse,
    CustomerStatusChangeRequest,
)
from app.modules.identity.customer.service import CustomerService
from app.modules.identity.user.schemas import UserUpdateRequest

router = APIRouter(prefix="/platform/clients", tags=["Platform Clients"])


def _customer_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> CustomerService:
    return CustomerService(
        repository=CustomerRepository(db),
        context=context,
    )


@router.get("", response_model=CustomersResponse)
def list_clients(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: CustomerService = Depends(_customer_service),
    pagination: PaginationParams = Depends(),
    email: str | None = Query(default=None),
    status: str | None = Query(default=None),
) -> dict:
    items, total = service.list(
        email=email,
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = CustomerListData(
        items=[customer_detail_public(customer, user) for customer, user in items],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Clientes obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{client_id}", response_model=CustomerResponse)
def get_client(
    client_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: CustomerService = Depends(_customer_service),
) -> dict:
    customer, user = service.get_detail_or_fail(client_id)

    return success_response(
        message="Cliente obtenido correctamente.",
        data=customer_detail_public(customer, user).model_dump(mode="json"),
    )


@router.put("/{client_id}", response_model=CustomerResponse)
def update_client(
    client_id: str,
    payload: UserUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: CustomerService = Depends(_customer_service),
) -> dict:
    customer, user = service.update(client_id, payload)

    return success_response(
        message="Cliente actualizado correctamente.",
        data=customer_detail_public(customer, user).model_dump(mode="json"),
    )


@router.patch("/{client_id}/status", response_model=CustomerResponse)
def change_client_status(
    client_id: str,
    payload: CustomerStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: CustomerService = Depends(_customer_service),
) -> dict:
    customer, user = service.change_status(client_id, payload)

    return success_response(
        message="Estado de cliente actualizado correctamente.",
        data=customer_detail_public(customer, user).model_dump(mode="json"),
    )


@router.delete("/{client_id}", response_model=CustomerResponse)
def delete_client(
    client_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: CustomerService = Depends(_customer_service),
) -> dict:
    customer, user = service.soft_delete(client_id)

    return success_response(
        message="Cliente eliminado correctamente.",
        data=customer_detail_public(customer, user).model_dump(mode="json"),
    )


@router.patch("/{client_id}/restore", response_model=CustomerResponse)
def restore_client(
    client_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: CustomerService = Depends(_customer_service),
) -> dict:
    customer, user = service.restore(client_id)

    return success_response(
        message="Cliente restaurado correctamente.",
        data=customer_detail_public(customer, user).model_dump(mode="json"),
    )
