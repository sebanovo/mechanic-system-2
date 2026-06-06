from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.incident.mappers import incident_public
from app.modules.incident.repository import IncidentRepository
from app.modules.incident.schemas import (
    IncidentCancelRequest,
    IncidentListData,
    IncidentResponse,
    IncidentsResponse,
    IncidentStatusChangeRequest,
    IncidentUpdateRequest,
)
from app.modules.incident.service import IncidentService

router = APIRouter(prefix="/platform/incidents", tags=["Platform Incidents"])


def _incident_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentService:
    return IncidentService(
        repository=IncidentRepository(db),
        context=context,
    )


@router.get("", response_model=IncidentsResponse)
def list_platform_incidents(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
    pagination: PaginationParams = Depends(),
    customer_id: str | None = Query(default=None),
    vehicle_id: str | None = Query(default=None),
    service_catalog_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
    priority: str | None = Query(default=None),
    search: str | None = Query(default=None),
    reported_from: datetime | None = Query(default=None),
    reported_to: datetime | None = Query(default=None),
) -> dict:
    incidents, total = service.list(
        customer_id=customer_id,
        vehicle_id=vehicle_id,
        service_catalog_id=service_catalog_id,
        status=status,
        priority=priority,
        search=search,
        reported_from=reported_from,
        reported_to=reported_to,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = IncidentListData(
        items=[incident_public(incident) for incident in incidents],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Incidentes obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_platform_incident(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.get_or_fail(incident_id)

    return success_response(
        message="Incidente obtenido correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.put("/{incident_id}", response_model=IncidentResponse)
def update_platform_incident(
    incident_id: str,
    payload: IncidentUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.update_any(incident_id, payload)

    return success_response(
        message="Incidente actualizado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.patch("/{incident_id}/status", response_model=IncidentResponse)
def change_platform_incident_status(
    incident_id: str,
    payload: IncidentStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.change_status(incident_id, payload)

    return success_response(
        message="Estado de incidente actualizado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.patch("/{incident_id}/cancel", response_model=IncidentResponse)
def cancel_platform_incident(
    incident_id: str,
    payload: IncidentCancelRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.cancel_any(incident_id, payload)

    return success_response(
        message="Incidente cancelado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.patch("/{incident_id}/complete", response_model=IncidentResponse)
def complete_platform_incident(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.complete_any(incident_id)

    return success_response(
        message="Incidente completado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.delete("/{incident_id}", response_model=IncidentResponse)
def delete_platform_incident(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.soft_delete_any(incident_id)

    return success_response(
        message="Incidente eliminado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.patch("/{incident_id}/restore", response_model=IncidentResponse)
def restore_platform_incident(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.restore_any(incident_id)

    return success_response(
        message="Incidente restaurado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )