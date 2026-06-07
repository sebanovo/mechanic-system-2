from __future__ import annotations

from app.modules.assignment.models import Assignment
from app.modules.assignment.schemas import AssignmentDetailPublic, AssignmentPublic
from app.modules.identity.provider.mappers import provider_profile_public
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.mappers import technician_public
from app.modules.identity.technician.models import Technician
from app.modules.incident.mappers import incident_public
from app.modules.incident.models import Incident
from app.modules.incident_offer.mappers import incident_offer_public
from app.modules.incident_offer.models import IncidentOffer


def assignment_public(assignment: Assignment) -> AssignmentPublic:
    return AssignmentPublic(
        id=str(assignment.id),
        incident_id=str(assignment.incident_id),
        offer_id=str(assignment.offer_id),
        provider_profile_id=str(assignment.provider_profile_id),
        technician_id=str(assignment.technician_id),
        assignment_status=assignment.assignment_status,  # type: ignore[arg-type]
        notes=assignment.notes,
        assigned_at=assignment.assigned_at,
        started_at=assignment.started_at,
        arrived_at=assignment.arrived_at,
        completed_at=assignment.completed_at,
        cancelled_at=assignment.cancelled_at,
        created_at=assignment.created_at,
        updated_at=assignment.updated_at,
    )


def assignment_detail_public(
    assignment: Assignment,
    incident: Incident,
    offer: IncidentOffer,
    provider_profile: ProviderProfile,
    technician: Technician,
) -> AssignmentDetailPublic:
    return AssignmentDetailPublic(
        assignment=assignment_public(assignment),
        incident=incident_public(incident),
        offer=incident_offer_public(offer),
        provider_profile=provider_profile_public(provider_profile),
        technician=technician_public(technician),
    )