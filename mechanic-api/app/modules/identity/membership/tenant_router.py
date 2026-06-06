from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.membership.mappers import tenant_membership_detail_public, tenant_membership_public
from app.modules.identity.membership.repository import TenantMembershipRepository
from app.modules.identity.membership.schemas import (
    TenantMembershipListData,
    TenantMembershipResponse,
    TenantMembershipsResponse,
    TenantMembershipStatusChangeRequest,
)
from app.modules.identity.membership.service import TenantMembershipService

router = APIRouter(prefix="/tenants/current/members", tags=["Tenant Members"])


def _membership_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TenantMembershipService:
    return TenantMembershipService(
        repository=TenantMembershipRepository(db),
        context=context,
    )


@router.get("", response_model=TenantMembershipsResponse)
def list_current_tenant_members(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: TenantMembershipService = Depends(_membership_service),
    pagination: PaginationParams = Depends(),
    status: str | None = Query(default=None),
) -> dict:
    memberships, total = service.list_current_tenant_with_users(
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = TenantMembershipListData(
        items=[tenant_membership_detail_public(membership, user) for membership, user in memberships],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Membresías obtenidas correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.patch("/{membership_id}/status", response_model=TenantMembershipResponse)
def change_current_tenant_member_status(
    membership_id: str,
    payload: TenantMembershipStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    service: TenantMembershipService = Depends(_membership_service),
) -> dict:
    membership = service.change_current_tenant_status(membership_id, payload)

    return success_response(
        message="Estado de membresía actualizado correctamente.",
        data=tenant_membership_public(membership).model_dump(mode="json"),
    )


@router.delete("/{membership_id}", response_model=TenantMembershipResponse)
def remove_current_tenant_member(
    membership_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    service: TenantMembershipService = Depends(_membership_service),
) -> dict:
    membership = service.soft_delete_current_tenant(membership_id)

    return success_response(
        message="Membresía eliminada correctamente.",
        data=tenant_membership_public(membership).model_dump(mode="json"),
    )
