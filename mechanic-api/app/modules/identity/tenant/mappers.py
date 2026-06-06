from __future__ import annotations

from app.modules.identity.tenant.models import Tenant, TenantProfile, TenantSettings
from app.modules.identity.tenant.schemas import (
    TenantDetailPublic,
    TenantProfilePublic,
    TenantPublic,
    TenantSettingsPublic,
)


def tenant_public(tenant: Tenant) -> TenantPublic:
    return TenantPublic(
        id=str(tenant.id),
        commercial_name=tenant.commercial_name,
        slug=tenant.slug,
        tenant_kind=tenant.tenant_kind,  # type: ignore[arg-type]
        status=tenant.status,  # type: ignore[arg-type]
        created_at=tenant.created_at,
        updated_at=tenant.updated_at,
        deleted_at=tenant.deleted_at,
    )


def tenant_profile_public(profile: TenantProfile) -> TenantProfilePublic:
    return TenantProfilePublic(
        id=str(profile.id),
        tenant_id=str(profile.tenant_id),
        legal_name=profile.legal_name,
        tax_identifier=profile.tax_identifier,
        business_email=profile.business_email,
        business_phone=profile.business_phone,
        website_url=profile.website_url,
        address_line=profile.address_line,
        city=profile.city,
        state=profile.state,
        country=profile.country,
        latitude=profile.latitude,
        longitude=profile.longitude,
        created_at=profile.created_at,
        updated_at=profile.updated_at,
    )


def tenant_settings_public(settings: TenantSettings) -> TenantSettingsPublic:
    return TenantSettingsPublic(
        id=str(settings.id),
        tenant_id=str(settings.tenant_id),
        default_currency=settings.default_currency,
        default_timezone=settings.default_timezone,
        default_language=settings.default_language,
        created_at=settings.created_at,
        updated_at=settings.updated_at,
    )


def tenant_detail_public(
    tenant: Tenant,
    profile: TenantProfile | None,
    settings: TenantSettings | None,
) -> TenantDetailPublic:
    return TenantDetailPublic(
        tenant=tenant_public(tenant),
        profile=tenant_profile_public(profile) if profile is not None else None,
        settings=tenant_settings_public(settings) if settings is not None else None,
    )
