from __future__ import annotations

from app.modules.incident_ai_analysis.ai_schemas import AIServiceCatalogOption
from app.modules.service_catalog.models import ServiceCatalog


def service_catalog_to_ai_option(service: ServiceCatalog) -> AIServiceCatalogOption:
    return AIServiceCatalogOption(
        service_code=service.service_code,
        service_name=service.service_name,
        category=service.category,
        description=service.description,
        min_price=service.min_price,
        max_price=service.max_price,
        min_duration_minutes=service.min_duration_minutes,
        max_duration_minutes=service.max_duration_minutes,
    )


def service_catalog_list_to_ai_options(
    services: list[ServiceCatalog],
) -> list[AIServiceCatalogOption]:
    return [service_catalog_to_ai_option(service) for service in services]
