from __future__ import annotations

from app.modules.service_catalog.models import ServiceCatalog
from app.modules.service_catalog.schemas import ServiceCatalogPublic


def service_catalog_public(service: ServiceCatalog) -> ServiceCatalogPublic:
    return ServiceCatalogPublic(
        id=str(service.id),
        service_code=service.service_code,
        service_name=service.service_name,
        description=service.description,
        category=service.category,
        min_price=service.min_price,
        max_price=service.max_price,
        min_duration_minutes=service.min_duration_minutes,
        max_duration_minutes=service.max_duration_minutes,
        is_active=service.is_active,
        created_at=service.created_at,
        updated_at=service.updated_at,
    )