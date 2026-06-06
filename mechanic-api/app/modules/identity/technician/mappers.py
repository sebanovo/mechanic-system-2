from __future__ import annotations

from app.modules.identity.technician.models import Technician
from app.modules.identity.technician.schemas import (
    TechnicianDetailPublic,
    TechnicianPublic,
)
from app.modules.identity.user.mappers import user_public
from app.modules.identity.user.models import User


def technician_public(technician: Technician) -> TechnicianPublic:
    return TechnicianPublic(
        id=str(technician.id),
        provider_profile_id=str(technician.provider_profile_id),
        user_id=str(technician.user_id),
        technician_code=technician.technician_code,
        status=technician.status,  # type: ignore[arg-type]
        average_rating=float(technician.average_rating),
        total_reviews=technician.total_reviews,
        created_at=technician.created_at,
        updated_at=technician.updated_at,
        deleted_at=technician.deleted_at,
    )


def technician_detail_public(technician: Technician, user: User) -> TechnicianDetailPublic:
    return TechnicianDetailPublic(
        technician=technician_public(technician),
        user=user_public(user),
    )