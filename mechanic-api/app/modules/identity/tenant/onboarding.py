from __future__ import annotations

from dataclasses import dataclass

from app.common.exceptions import ConflictException
from app.core.audit.constants import (
    AuditActorType,
    ProviderAuditEvent,
    TenantAuditEvent,
)
from app.common.validators import generate_unique_slug
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.core.security import hash_password
from app.modules.identity.auth.schemas import RegisterTenantRequest
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService
from app.modules.identity.tenant.models import Tenant, TenantProfile, TenantSettings
from app.modules.identity.tenant.repository import TenantRepository
from app.modules.identity.tenant.schemas import (
    TenantCreateRequest,
    TenantNetworkCreateRequest,
)
from app.modules.identity.user.models import User
from app.modules.identity.user.repository import UserRepository
from sqlalchemy.orm import Session


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


@dataclass(slots=True)
class TenantOnboardingResult:
    user: User
    tenant: Tenant
    profile: TenantProfile
    settings: TenantSettings
    provider_profile: ProviderProfile
    membership: TenantMembership


@dataclass(slots=True)
class TenantNetworkOnboardingResult:
    tenant: Tenant
    profile: TenantProfile
    settings: TenantSettings
    provider_profile: ProviderProfile
    membership: TenantMembership


class TenantOnboardingService(BaseService):
    def __init__(
        self,
        db: Session,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(db=db, context=context or _system_context())
        self.user_repository = UserRepository(db)
        self.tenant_repository = TenantRepository(db)
        self.provider_profile_service = ProviderProfileService(
            repository=ProviderProfileRepository(db),
            context=self.context,
        )

    def create_with_owner(
        self,
        payload: RegisterTenantRequest | TenantCreateRequest,
    ) -> TenantOnboardingResult:
        email = str(payload.email).strip().lower()

        if self.user_repository.exists_by_email(email):
            raise ConflictException("El correo electrónico ya está registrado.")

        user = User(
            email=email,
            password_hash=hash_password(payload.password),
            first_name=payload.first_name.strip(),
            last_name=payload.last_name.strip(),
            phone=None,
            avatar_url=None,
            user_type="TENANT_OWNER",
            status="ACTIVE",
            email_verified=False,
            email_verified_at=None,
        )
        self.db.add(user)
        self.db.flush()

        slug = generate_unique_slug(self.tenant_repository, payload.commercial_name)

        tenant = Tenant(
            commercial_name=payload.commercial_name.strip(),
            slug=slug,
            tenant_kind=payload.tenant_kind,
            status="ACTIVE",
        )
        self.db.add(tenant)
        self.db.flush()

        profile = TenantProfile(
            tenant_id=tenant.id,
            legal_name=payload.commercial_name.strip(),
            tax_identifier=None,
            business_email=None,
            business_phone=None,
            website_url=None,
            address_line=None,
            city=None,
            state=None,
            country=None,
            latitude=None,
            longitude=None,
        )
        self.db.add(profile)

        settings = TenantSettings(tenant_id=tenant.id)
        self.db.add(settings)

        provider_profile = self.provider_profile_service.build_for_tenant_uncommitted(
            tenant
        )
        self.db.add(provider_profile)

        membership = TenantMembership(
            tenant_id=tenant.id,
            user_id=user.id,
            status="ACTIVE",
        )
        self.db.add(membership)
        self.db.flush()

        self.audit.created(
            user,
            TenantAuditEvent.TENANT_OWNER_CREATED,
            resource_type="user",
            event_data={"user_type": user.user_type},
            actor_type=AuditActorType.TENANT_OWNER,
        )
        self.audit.created(
            tenant,
            TenantAuditEvent.TENANT_CREATED,
            resource_type="tenant",
            event_data={"tenant_kind": tenant.tenant_kind, "slug": tenant.slug},
            actor_type=AuditActorType.TENANT_OWNER,
        )
        self.audit.created(
            profile,
            TenantAuditEvent.TENANT_PROFILE_CREATED,
            resource_type="tenant_profile",
            tenant_id=str(tenant.id),
            actor_type=AuditActorType.TENANT_OWNER,
        )
        self.audit.created(
            settings,
            TenantAuditEvent.TENANT_SETTINGS_CREATED,
            resource_type="tenant_settings",
            tenant_id=str(tenant.id),
            actor_type=AuditActorType.TENANT_OWNER,
        )
        self.audit.created(
            provider_profile,
            ProviderAuditEvent.PROVIDER_PROFILE_CREATED,
            resource_type="provider_profile",
            tenant_id=str(tenant.id),
            actor_type=AuditActorType.TENANT_OWNER,
        )
        self.audit.created(
            membership,
            TenantAuditEvent.TENANT_MEMBERSHIP_CREATED,
            resource_type="tenant_membership",
            tenant_id=str(tenant.id),
            event_data={"owner_user_id": str(user.id)},
            actor_type=AuditActorType.TENANT_OWNER,
        )

        return TenantOnboardingResult(
            user=user,
            tenant=tenant,
            profile=profile,
            settings=settings,
            provider_profile=provider_profile,
            membership=membership,
        )

    def create_network_with_owner(
        self,
        owner_user: User,
        payload: TenantNetworkCreateRequest,
    ) -> TenantNetworkOnboardingResult:
        if owner_user.deleted_at is not None:
            raise ConflictException("El usuario no está disponible.")

        slug = generate_unique_slug(self.tenant_repository, payload.commercial_name)

        tenant = Tenant(
            commercial_name=payload.commercial_name.strip(),
            slug=slug,
            tenant_kind="WORKSHOP_NETWORK",
            status="ACTIVE",
        )
        self.db.add(tenant)
        self.db.flush()

        profile = TenantProfile(
            tenant_id=tenant.id,
            legal_name=payload.commercial_name.strip(),
            tax_identifier=None,
            business_email=None,
            business_phone=None,
            website_url=None,
            address_line=None,
            city=None,
            state=None,
            country=None,
            latitude=None,
            longitude=None,
        )
        self.db.add(profile)

        settings = TenantSettings(tenant_id=tenant.id)
        self.db.add(settings)

        provider_profile = self.provider_profile_service.build_for_tenant_uncommitted(
            tenant
        )
        self.db.add(provider_profile)

        membership = TenantMembership(
            tenant_id=tenant.id,
            user_id=owner_user.id,
            status="ACTIVE",
        )
        self.db.add(membership)
        self.db.flush()

        actor_type = self.context.actor_type or AuditActorType.TENANT_OWNER

        self.audit.created(
            tenant,
            TenantAuditEvent.TENANT_CREATED,
            resource_type="tenant",
            event_data={
                "tenant_kind": tenant.tenant_kind,
                "slug": tenant.slug,
                "creation_mode": "NETWORK",
            },
            actor_type=actor_type,
        )
        self.audit.created(
            profile,
            TenantAuditEvent.TENANT_PROFILE_CREATED,
            resource_type="tenant_profile",
            tenant_id=str(tenant.id),
            actor_type=actor_type,
        )
        self.audit.created(
            settings,
            TenantAuditEvent.TENANT_SETTINGS_CREATED,
            resource_type="tenant_settings",
            tenant_id=str(tenant.id),
            actor_type=actor_type,
        )
        self.audit.created(
            provider_profile,
            ProviderAuditEvent.PROVIDER_PROFILE_CREATED,
            resource_type="provider_profile",
            tenant_id=str(tenant.id),
            actor_type=actor_type,
        )
        self.audit.created(
            membership,
            TenantAuditEvent.TENANT_MEMBERSHIP_CREATED,
            resource_type="tenant_membership",
            tenant_id=str(tenant.id),
            event_data={"owner_user_id": str(owner_user.id)},
            actor_type=actor_type,
        )

        return TenantNetworkOnboardingResult(
            tenant=tenant,
            profile=profile,
            settings=settings,
            provider_profile=provider_profile,
            membership=membership,
        )
