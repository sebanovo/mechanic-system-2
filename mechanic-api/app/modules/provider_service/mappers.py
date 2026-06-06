from __future__ import annotations

from app.modules.provider_service.models import ProviderService
from app.modules.provider_service.schemas import (
    ProviderServiceDetailPublic,
    ProviderServicePublic,
)
from app.modules.service_catalog.mappers import service_catalog_public
from app.modules.service_catalog.models import ServiceCatalog


def provider_service_public(provider_service: ProviderService) -> ProviderServicePublic:
    return ProviderServicePublic(
        id=str(provider_service.id),
        provider_profile_id=str(provider_service.provider_profile_id),
        service_catalog_id=str(provider_service.service_catalog_id),
        is_available=provider_service.is_available,
        custom_min_price=provider_service.custom_min_price,
        custom_max_price=provider_service.custom_max_price,
        created_at=provider_service.created_at,
        updated_at=provider_service.updated_at,
    )


def provider_service_detail_public(
    provider_service: ProviderService,
    service_catalog: ServiceCatalog,
) -> ProviderServiceDetailPublic:
    return ProviderServiceDetailPublic(
        provider_service=provider_service_public(provider_service),
        service_catalog=service_catalog_public(service_catalog),
    )