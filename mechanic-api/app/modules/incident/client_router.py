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
    IncidentCreateRequest,
    IncidentListData,
    IncidentResponse,
    IncidentsResponse,
    IncidentUpdateRequest,
)
from app.modules.incident.service import IncidentService

router = APIRouter(prefix="/clients/me/incidents", tags=["Client Incidents"])


def _incident_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentService:
    return IncidentService(
        repository=IncidentRepository(db),
        context=context,
    )


@router.get("", response_model=IncidentsResponse)
def list_my_incidents(
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: IncidentService = Depends(_incident_service),
    pagination: PaginationParams = Depends(),
    status: str | None = Query(default=None),
    priority: str | None = Query(default=None),
    service_catalog_id: str | None = Query(default=None),
    search: str | None = Query(default=None),
    reported_from: datetime | None = Query(default=None),
    reported_to: datetime | None = Query(default=None),
) -> dict:
    incidents, total = service.list_current_customer(
        status=status,
        priority=priority,
        service_catalog_id=service_catalog_id,
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


@router.post("", response_model=IncidentResponse)
def create_my_incident(
    payload: IncidentCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.create_current_customer_incident(payload)

    return success_response(
        message="Incidente creado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_my_incident(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.get_current_customer_incident_or_fail(incident_id)

    return success_response(
        message="Incidente obtenido correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.put("/{incident_id}", response_model=IncidentResponse)
def update_my_incident(
    incident_id: str,
    payload: IncidentUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.update_current_customer_incident(incident_id, payload)

    return success_response(
        message="Incidente actualizado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )


@router.patch("/{incident_id}/cancel", response_model=IncidentResponse)
def cancel_my_incident(
    incident_id: str,
    payload: IncidentCancelRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.cancel_current_customer_incident(incident_id, payload)

    return success_response(
        message="Incidente cancelado correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )