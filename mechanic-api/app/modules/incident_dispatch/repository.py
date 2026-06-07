from __future__ import annotations

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.models import Technician
from app.modules.identity.technician_availability.models import TechnicianAvailability
from app.modules.provider_service.models import ProviderService
from app.modules.technician_service.models import TechnicianService


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class IncidentDispatchRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def find_eligible_providers(
        self,
        *,
        service_catalog_id: str | UUID,
        limit: int = 100,
    ):
        service_catalog_uuid = _to_uuid(service_catalog_id, "service_catalog_id")

        enabled_technicians_subquery = (
            select(
                Technician.provider_profile_id.label("provider_profile_id"),
                func.count(Technician.id).label("enabled_technicians_count"),
            )
            .join(
                TechnicianService,
                TechnicianService.technician_id == Technician.id,
            )
            .where(
                Technician.deleted_at.is_(None),
                Technician.status == "ACTIVE",
                TechnicianService.service_catalog_id == service_catalog_uuid,
                TechnicianService.is_enabled.is_(True),
            )
            .group_by(Technician.provider_profile_id)
            .subquery()
        )

        available_technicians_subquery = (
            select(
                Technician.provider_profile_id.label("provider_profile_id"),
                func.count(Technician.id).label("available_technicians_count"),
            )
            .join(
                TechnicianService,
                TechnicianService.technician_id == Technician.id,
            )
            .join(
                TechnicianAvailability,
                TechnicianAvailability.technician_id == Technician.id,
            )
            .where(
                Technician.deleted_at.is_(None),
                Technician.status == "ACTIVE",
                TechnicianService.service_catalog_id == service_catalog_uuid,
                TechnicianService.is_enabled.is_(True),
                TechnicianAvailability.availability_status == "AVAILABLE",
            )
            .group_by(Technician.provider_profile_id)
            .subquery()
        )

        query = (
            select(
                ProviderProfile,
                ProviderService,
                enabled_technicians_subquery.c.enabled_technicians_count,
                func.coalesce(
                    available_technicians_subquery.c.available_technicians_count,
                    0,
                ).label("available_technicians_count"),
            )
            .join(
                ProviderService,
                ProviderService.provider_profile_id == ProviderProfile.id,
            )
            .join(
                enabled_technicians_subquery,
                enabled_technicians_subquery.c.provider_profile_id
                == ProviderProfile.id,
            )
            .outerjoin(
                available_technicians_subquery,
                available_technicians_subquery.c.provider_profile_id
                == ProviderProfile.id,
            )
            .where(
                ProviderProfile.deleted_at.is_(None),
                ProviderProfile.operational_status == "ACTIVE",
                ProviderProfile.accepts_emergency_requests.is_(True),
                ProviderService.service_catalog_id == service_catalog_uuid,
                ProviderService.is_available.is_(True),
            )
            .order_by(
                func.coalesce(
                    available_technicians_subquery.c.available_technicians_count,
                    0,
                ).desc(),
                ProviderProfile.average_rating.desc().nullslast(),
                ProviderProfile.response_score.desc().nullslast(),
            )
            .limit(limit)
        )

        return self.db.execute(query).all()
