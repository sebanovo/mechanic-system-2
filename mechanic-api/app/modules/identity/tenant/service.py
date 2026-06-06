from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import select

from app.common.exceptions import (
    ConflictException,
    ForbiddenException,
    NotFoundException,
)
from app.core.audit.constants import TenantAuditEvent
from app.common.validators import normalize_slug
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.tenant.models import Tenant, TenantProfile, TenantSettings
from app.modules.identity.tenant.onboarding import TenantOnboardingService
from app.modules.identity.tenant.repository import TenantRepository
from app.modules.identity.tenant.schemas import (
    TenantCreateRequest,
    TenantNetworkCreateRequest,
    TenantProfileUpsertRequest,
    TenantSettingsUpsertRequest,
    TenantStatusChangeRequest,
    TenantUpdateRequest,
)
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


class TenantService(BaseService):
    def __init__(
        self,
        repository: TenantRepository,
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
        slug: str | None = None,
        status: str | None = None,
        tenant_kind: str | None = None,
        created_from: datetime | None = None,
        created_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Tenant], int]:
        return self.repository.list(
            slug=slug,
            status=status,
            tenant_kind=tenant_kind,
            created_from=created_from,
            created_to=created_to,
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, tenant_id: str) -> Tenant:
        return self._get_or_fail(tenant_id)

    def get_detail(
        self,
        tenant_id: str,
    ) -> tuple[Tenant, TenantProfile | None, TenantSettings | None]:
        tenant = self._get_or_fail(tenant_id)

        return (
            tenant,
            self.repository.get_profile(str(tenant.id)),
            self.repository.get_settings(str(tenant.id)),
        )

    def list_current_user_tenants(self) -> list[Tenant]:
        if self.context.user_id is None:
            raise ForbiddenException("No hay un usuario autenticado.")

        memberships = list(
            self.db.scalars(
                select(TenantMembership).where(
                    TenantMembership.user_id == self.context.user_id,
                    TenantMembership.status == "ACTIVE",
                    TenantMembership.deleted_at.is_(None),
                )
            )
        )

        tenants: list[Tenant] = []

        for membership in memberships:
            tenant = self.repository.get_by_id(membership.tenant_id)

            if tenant is not None and tenant.status == "ACTIVE" and tenant.deleted_at is None:
                tenants.append(tenant)

        return tenants

    def get_current_or_fail(self) -> Tenant:
        if self.context.tenant_id is None:
            raise ForbiddenException("No hay un tenant activo seleccionado.")

        tenant = self._get_or_fail(self.context.tenant_id)

        if tenant.deleted_at is not None:
            raise NotFoundException("Tenant no encontrado.")

        if tenant.status != "ACTIVE":
            raise ForbiddenException("El tenant no está activo.")

        return tenant

    def get_current_detail(
        self,
    ) -> tuple[Tenant, TenantProfile | None, TenantSettings | None]:
        tenant = self.get_current_or_fail()

        return (
            tenant,
            self.repository.get_profile(str(tenant.id)),
            self.repository.get_settings(str(tenant.id)),
        )

    def get_profile_or_fail(self, tenant_id: str) -> TenantProfile:
        tenant = self._get_or_fail(tenant_id)
        profile = self.repository.get_profile(str(tenant.id))

        if profile is None:
            raise NotFoundException("Perfil de tenant no encontrado.")

        return profile

    def get_settings_or_fail(self, tenant_id: str) -> TenantSettings:
        tenant = self._get_or_fail(tenant_id)
        settings = self.repository.get_settings(str(tenant.id))

        if settings is None:
            raise NotFoundException("Configuración de tenant no encontrada.")

        return settings

    def get_current_profile_or_fail(self) -> TenantProfile:
        tenant = self.get_current_or_fail()
        profile = self.repository.get_profile(str(tenant.id))

        if profile is None:
            raise NotFoundException("Perfil de tenant no encontrado.")

        return profile

    def get_current_settings_or_fail(self) -> TenantSettings:
        tenant = self.get_current_or_fail()
        settings = self.repository.get_settings(str(tenant.id))

        if settings is None:
            raise NotFoundException("Configuración de tenant no encontrada.")

        return settings

    def create(self, payload: TenantCreateRequest) -> Tenant:
        onboarding = TenantOnboardingService(self.db, context=self.context)
        result = onboarding.create_with_owner(payload)
        self.db.commit()
        self.db.refresh(result.tenant)

        return result.tenant

    def create_network(self, owner_user: User, payload: TenantNetworkCreateRequest) -> Tenant:
        onboarding = TenantOnboardingService(self.db, context=self.context)
        result = onboarding.create_network_with_owner(owner_user, payload)
        self.db.commit()
        self.db.refresh(result.tenant)

        return result.tenant

    def update(self, tenant_id: str, payload: TenantUpdateRequest) -> Tenant:
        tenant = self._get_or_fail(tenant_id)
        changed_fields: list[str] = []

        if payload.slug is not None:
            slug = normalize_slug(payload.slug)
            existing = self.repository.get_by_slug(slug)

            if existing is not None and str(existing.id) != str(tenant.id):
                raise ConflictException("El slug del tenant ya existe.")

            tenant.slug = slug
            changed_fields.append("slug")

        if payload.commercial_name is not None:
            tenant.commercial_name = payload.commercial_name.strip()
            changed_fields.append("commercial_name")

        if payload.tenant_kind is not None:
            tenant.tenant_kind = payload.tenant_kind
            changed_fields.append("tenant_kind")

        self.db.flush()

        self.audit.updated(
            tenant,
            TenantAuditEvent.TENANT_UPDATED,
            resource_type="tenant",
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(tenant)

        return tenant

    def change_status(
        self,
        tenant_id: str,
        payload: TenantStatusChangeRequest,
    ) -> Tenant:
        tenant = self._get_or_fail(tenant_id)
        previous_status = tenant.status

        tenant.status = payload.status
        self.db.flush()

        self.audit.updated(
            tenant,
            TenantAuditEvent.TENANT_STATUS_CHANGED,
            resource_type="tenant",
            event_data={
                "previous_status": previous_status,
                "status": payload.status,
            },
        )

        self.db.commit()
        self.db.refresh(tenant)

        return tenant

    def soft_delete(self, tenant_id: str) -> Tenant:
        tenant = self._get_or_fail(tenant_id)

        tenant.deleted_at = datetime.now(timezone.utc)
        tenant.status = "INACTIVE"

        self.db.flush()

        self.audit.deleted(
            tenant,
            TenantAuditEvent.TENANT_DELETED,
            resource_type="tenant",
        )

        self.db.commit()
        self.db.refresh(tenant)

        return tenant

    def restore(self, tenant_id: str) -> Tenant:
        tenant = self._get_or_fail(tenant_id)

        tenant.deleted_at = None
        tenant.status = "ACTIVE"

        self.db.flush()

        self.audit.updated(
            tenant,
            TenantAuditEvent.TENANT_RESTORED,
            resource_type="tenant",
        )

        self.db.commit()
        self.db.refresh(tenant)

        return tenant

    def upsert_profile(
        self,
        tenant_id: str,
        payload: TenantProfileUpsertRequest,
    ) -> TenantProfile:
        tenant = self._get_or_fail(tenant_id)
        profile = self.ensure_profile(tenant)

        profile.legal_name = payload.legal_name
        profile.tax_identifier = payload.tax_identifier
        profile.business_email = (
            str(payload.business_email)
            if payload.business_email is not None
            else None
        )
        profile.business_phone = payload.business_phone
        profile.website_url = payload.website_url
        profile.address_line = payload.address_line
        profile.city = payload.city
        profile.state = payload.state
        profile.country = payload.country
        profile.latitude = payload.latitude
        profile.longitude = payload.longitude

        self.db.flush()

        self.audit.updated(
            profile,
            TenantAuditEvent.TENANT_PROFILE_UPDATED,
            resource_type="tenant_profile",
            tenant_id=str(tenant.id),
        )

        self.db.commit()
        self.db.refresh(profile)

        return profile

    def upsert_current_profile(
        self,
        payload: TenantProfileUpsertRequest,
    ) -> TenantProfile:
        tenant = self.get_current_or_fail()
        return self.upsert_profile(str(tenant.id), payload)

    def upsert_settings(
        self,
        tenant_id: str,
        payload: TenantSettingsUpsertRequest,
    ) -> TenantSettings:
        tenant = self._get_or_fail(tenant_id)
        settings = self.ensure_settings(tenant)

        settings.default_currency = payload.default_currency
        settings.default_timezone = payload.default_timezone
        settings.default_language = payload.default_language

        self.db.flush()

        self.audit.updated(
            settings,
            TenantAuditEvent.TENANT_SETTINGS_UPDATED,
            resource_type="tenant_settings",
            tenant_id=str(tenant.id),
        )

        self.db.commit()
        self.db.refresh(settings)

        return settings

    def upsert_current_settings(
        self,
        payload: TenantSettingsUpsertRequest,
    ) -> TenantSettings:
        tenant = self.get_current_or_fail()
        return self.upsert_settings(str(tenant.id), payload)

    def ensure_profile(self, tenant: Tenant) -> TenantProfile:
        profile = self.repository.get_profile(str(tenant.id))

        if profile is not None:
            return profile

        profile = TenantProfile(tenant_id=tenant.id)
        return self.repository.add_profile(profile)

    def ensure_settings(self, tenant: Tenant) -> TenantSettings:
        settings = self.repository.get_settings(str(tenant.id))

        if settings is not None:
            return settings

        settings = TenantSettings(tenant_id=tenant.id)
        return self.repository.add_settings(settings)

    def _get_or_fail(self, tenant_id: str) -> Tenant:
        tenant = self.repository.get_by_id(tenant_id)

        if tenant is None:
            raise NotFoundException("Tenant no encontrado.")

        return tenant
