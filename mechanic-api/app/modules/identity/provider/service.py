from __future__ import annotations

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import ProviderAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.schemas import ProviderProfileUpdateRequest
from app.modules.identity.tenant.models import Tenant


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class ProviderProfileService(BaseService):
    def __init__(
        self,
        repository: ProviderProfileRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(
            db=repository.db,
            context=context or _system_context(),
        )
        self.repository = repository

    def list(
        self,
        *,
        provider_type: str | None = None,
        accepts_emergency_requests: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[ProviderProfile], int]:
        return self.repository.list(
            provider_type=provider_type,
            accepts_emergency_requests=accepts_emergency_requests,
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, provider_profile_id: str) -> ProviderProfile:
        return self._get_or_fail(provider_profile_id)

    def create_for_tenant(self, tenant: Tenant) -> ProviderProfile:
        provider_profile = self._create_for_tenant_uncommitted(tenant)

        self.audit.created(
            provider_profile,
            ProviderAuditEvent.PROVIDER_PROFILE_CREATED,
            resource_type="provider_profile",
            tenant_id=str(tenant.id),
        )

        self.db.commit()
        self.db.refresh(provider_profile)

        return provider_profile

    def ensure_for_tenant(self, tenant: Tenant) -> ProviderProfile:
        existing = self.repository.get_by_tenant_id(str(tenant.id))

        if existing is not None:
            return existing

        return self.create_for_tenant(tenant)

    def get_by_tenant_or_fail(self, tenant_id: str) -> ProviderProfile:
        provider_profile = self.repository.get_by_tenant_id(tenant_id)

        if provider_profile is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        return provider_profile

    def get_current_or_fail(self) -> ProviderProfile:
        if self.context.tenant_id is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        return self.get_by_tenant_or_fail(self.context.tenant_id)

    def update(
        self,
        provider_profile_id: str,
        payload: ProviderProfileUpdateRequest,
    ) -> ProviderProfile:
        provider_profile = self._get_or_fail(provider_profile_id)
        return self._update_profile(provider_profile, payload)

    def update_by_tenant_id(
        self,
        tenant_id: str,
        payload: ProviderProfileUpdateRequest,
    ) -> ProviderProfile:
        provider_profile = self.get_by_tenant_or_fail(tenant_id)
        return self._update_profile(provider_profile, payload, tenant_id=tenant_id)

    def update_current(
        self,
        payload: ProviderProfileUpdateRequest,
    ) -> ProviderProfile:
        provider_profile = self.get_current_or_fail()
        return self._update_profile(
            provider_profile,
            payload,
            tenant_id=self.context.tenant_id,
        )

    def _update_profile(
        self,
        provider_profile: ProviderProfile,
        payload: ProviderProfileUpdateRequest,
        *,
        tenant_id: str | None = None,
    ) -> ProviderProfile:
        changed_fields: list[str] = []

        if payload.accepts_emergency_requests is not None:
            provider_profile.accepts_emergency_requests = payload.accepts_emergency_requests
            changed_fields.append("accepts_emergency_requests")

        self.db.flush()

        self.audit.updated(
            provider_profile,
            ProviderAuditEvent.PROVIDER_PROFILE_UPDATED,
            resource_type="provider_profile",
            tenant_id=tenant_id or str(provider_profile.tenant_id),
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(provider_profile)

        return provider_profile

    def _create_for_tenant_uncommitted(self, tenant: Tenant) -> ProviderProfile:
        existing = self.repository.get_by_tenant_id(str(tenant.id))

        if existing is not None:
            raise ConflictException("El perfil de proveedor ya existe para este tenant.")

        provider_profile = ProviderProfile(
            tenant_id=tenant.id,
            provider_type=tenant.tenant_kind,
            accepts_emergency_requests=True,
            average_rating=0,
            total_reviews=0,
            response_score=0,
        )

        return self.repository.add(provider_profile)

    def _get_or_fail(self, provider_profile_id: str) -> ProviderProfile:
        provider_profile = self.repository.get_by_id(provider_profile_id)

        if provider_profile is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        return provider_profile
