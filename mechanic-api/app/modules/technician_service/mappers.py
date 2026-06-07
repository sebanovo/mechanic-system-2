from __future__ import annotations

from app.modules.identity.technician.mappers import technician_public
from app.modules.identity.technician.models import Technician
from app.modules.provider_service.mappers import provider_service_detail_public
from app.modules.provider_service.models import ProviderService
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.technician_service.models import TechnicianService
from app.modules.technician_service.schemas import (
    TechnicianServiceDetailPublic,
    TechnicianServicePublic,
)


def technician_service_public(
    technician_service: TechnicianService,
) -> TechnicianServicePublic:
    return TechnicianServicePublic(
        id=str(technician_service.id),
        technician_id=str(technician_service.technician_id),
        provider_service_id=str(technician_service.provider_service_id),
        skill_level=technician_service.skill_level,  # type: ignore[arg-type]
        is_enabled=technician_service.is_enabled,
        created_at=technician_service.created_at,
        updated_at=technician_service.updated_at,
    )


def technician_service_detail_public(
    technician_service: TechnicianService,
    technician: Technician,
    provider_service: ProviderService,
    service_catalog: ServiceCatalog,
) -> TechnicianServiceDetailPublic:
    return TechnicianServiceDetailPublic(
        technician_service=technician_service_public(technician_service),
        technician=technician_public(technician),
        provider_service=provider_service_detail_public(
            provider_service,
            service_catalog,
        ),
    )