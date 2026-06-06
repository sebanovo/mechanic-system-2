from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import NotFoundException
from app.common.uuid import to_uuid
from app.core.audit.constants import TenantAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.membership.repository import TenantMembershipRepository
from app.modules.identity.membership.schemas import TenantMembershipStatusChangeRequest
from app.modules.identity.user.models import User


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class TenantMembershipService(BaseService):
    def __init__(
        self,
        repository: TenantMembershipRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(
            db=repository.db,
            context=context or _system_context(),
        )
        self.repository = repository

    def list_by_tenant(
        self,
        tenant_id: str,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[TenantMembership], int]:
        return self.repository.list_by_tenant(
            tenant_id,
            status=status,
            limit=limit,
            offset=offset,
        )

    def list_current_tenant(
        self,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[TenantMembership], int]:
        if self.context.tenant_id is None:
            raise NotFoundException("Tenant no encontrado.")

        return self.repository.list_by_tenant(
            self.context.tenant_id,
            status=status,
            limit=limit,
            offset=offset,
        )

    def list_current_tenant_with_users(
        self,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TenantMembership, User]], int]:
        if self.context.tenant_id is None:
            raise NotFoundException("Tenant no encontrado.")

        return self.repository.list_by_tenant_with_users(
            self.context.tenant_id,
            status=status,
            limit=limit,
            offset=offset,
        )

    def change_status(
        self,
        tenant_id: str,
        membership_id: str,
        payload: TenantMembershipStatusChangeRequest,
    ) -> TenantMembership:
        membership = self._get_owned_or_fail(tenant_id, membership_id)
        previous_status = membership.status

        membership.status = payload.status
        self.db.flush()

        self.audit.updated(
            membership,
            TenantAuditEvent.TENANT_MEMBERSHIP_STATUS_CHANGED,
            resource_type="tenant_membership",
            tenant_id=tenant_id,
            event_data={
                "previous_status": previous_status,
                "status": payload.status,
            },
        )

        self.db.commit()
        self.db.refresh(membership)

        return membership

    def change_current_tenant_status(
        self,
        membership_id: str,
        payload: TenantMembershipStatusChangeRequest,
    ) -> TenantMembership:
        if self.context.tenant_id is None:
            raise NotFoundException("Tenant no encontrado.")

        return self.change_status(self.context.tenant_id, membership_id, payload)

    def soft_delete(
        self,
        tenant_id: str,
        membership_id: str,
    ) -> TenantMembership:
        membership = self._get_owned_or_fail(tenant_id, membership_id)

        membership.deleted_at = datetime.now(timezone.utc)
        membership.status = "INACTIVE"

        self.db.flush()

        self.audit.deleted(
            membership,
            TenantAuditEvent.TENANT_MEMBERSHIP_DELETED,
            resource_type="tenant_membership",
            tenant_id=tenant_id,
        )

        self.db.commit()
        self.db.refresh(membership)

        return membership

    def soft_delete_current_tenant(
        self,
        membership_id: str,
    ) -> TenantMembership:
        if self.context.tenant_id is None:
            raise NotFoundException("Tenant no encontrado.")

        return self.soft_delete(self.context.tenant_id, membership_id)

    def _get_owned_or_fail(
        self,
        tenant_id: str,
        membership_id: str,
    ) -> TenantMembership:
        membership = self.repository.get_by_id(membership_id)

        if membership is None:
            raise NotFoundException("Membresía no encontrada.")

        if str(membership.tenant_id) != tenant_id:
            raise NotFoundException("Membresía no encontrada.")

        if membership.deleted_at is not None:
            raise NotFoundException("Membresía no encontrada.")

        return membership

    def list_by_tenant_with_users(
        self,
        tenant_id: str,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TenantMembership, User]], int]:
        return self.repository.list_by_tenant_with_users(
            tenant_id,
            status=status,
            limit=limit,
            offset=offset,
        )