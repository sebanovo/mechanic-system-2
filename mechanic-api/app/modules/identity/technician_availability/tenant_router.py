from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.technician_availability.mappers import (
    technician_availability_public,
)
from app.modules.identity.technician_availability.repository import (
    TechnicianAvailabilityRepository,
)
from app.modules.identity.technician_availability.schemas import (
    TechnicianAvailabilityResponse,
    TechnicianAvailabilityUpsertRequest,
)
from app.modules.identity.technician_availability.service import (
    TechnicianAvailabilityService,
)

router = APIRouter(
    prefix="/tenants/current/technicians",
    tags=["Tenant Technician Availability"],
)


def _availability_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TechnicianAvailabilityService:
    return TechnicianAvailabilityService(
        repository=TechnicianAvailabilityRepository(db),
        context=context,
    )


@router.get(
    "/{technician_id}/availability",
    response_model=TechnicianAvailabilityResponse,
    summary="Obtener disponibilidad del técnico",
    description=(
        "Devuelve la disponibilidad actual del técnico dentro del tenant. "
        "La disponibilidad controla si puede ser asignado a una orden."
    ),
)
def get_technician_availability(
    technician_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: TechnicianAvailabilityService = Depends(_availability_service),
) -> dict:
    availability = service.get_for_current_tenant_or_fail(technician_id)

    return success_response(
        message="Disponibilidad de técnico obtenida correctamente.",
        data=technician_availability_public(availability).model_dump(mode="json"),
    )


@router.put(
    "/{technician_id}/availability",
    response_model=TechnicianAvailabilityResponse,
    summary="Actualizar disponibilidad del técnico",
    description=(
        "Actualiza el estado horario del técnico. Si tiene una asignación activa "
        "sin cerrar, el backend rechaza el cambio."
    ),
)
def upsert_technician_availability(
    technician_id: str,
    payload: TechnicianAvailabilityUpsertRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: TechnicianAvailabilityService = Depends(_availability_service),
) -> dict:
    availability = service.upsert_for_current_tenant(
        technician_id,
        payload,
        actor_user_type=identity.user.user_type,
        actor_user_id=str(identity.user.id),
    )

    return success_response(
        message="Disponibilidad de técnico actualizada correctamente.",
        data=technician_availability_public(availability).model_dump(mode="json"),
    )
