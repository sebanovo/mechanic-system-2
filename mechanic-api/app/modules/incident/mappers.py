from __future__ import annotations

from app.modules.incident.models import Incident
from app.modules.incident.schemas import IncidentPublic


def incident_public(incident: Incident) -> IncidentPublic:
    return IncidentPublic(
        id=str(incident.id),
        customer_id=str(incident.customer_id),
        vehicle_id=str(incident.vehicle_id),
        service_catalog_id=(
            str(incident.service_catalog_id)
            if incident.service_catalog_id is not None
            else None
        ),
        incident_code=incident.incident_code,
        title=incident.title,
        description=incident.description,
        latitude=incident.latitude,
        longitude=incident.longitude,
        address_text=incident.address_text,
        priority=incident.priority,  # type: ignore[arg-type]
        status=incident.status,  # type: ignore[arg-type]
        reported_at=incident.reported_at,
        cancelled_at=incident.cancelled_at,
        completed_at=incident.completed_at,
        unattended_reason=incident.unattended_reason,
        unattended_at=incident.unattended_at,
        created_at=incident.created_at,
        updated_at=incident.updated_at,
        deleted_at=incident.deleted_at,
    )
