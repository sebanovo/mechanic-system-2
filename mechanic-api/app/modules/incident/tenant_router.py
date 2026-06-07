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
    IncidentListData,
    IncidentResponse,
    IncidentsResponse,
)
from app.modules.incident.service import IncidentService

router = APIRouter(prefix="/tenants/current/incidents", tags=["Tenant Incidents"])


def _incident_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentService:
    return IncidentService(
        repository=IncidentRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=IncidentsResponse,
    summary="Listar incidentes del taller actual",
    description=(
        "Devuelve los incidentes asignados al taller actual. "
        "Permite filtrar por estado, prioridad, catálogo y búsqueda."
    ),
)
def list_current_tenant_incidents(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: IncidentService = Depends(_incident_service),
    pagination: PaginationParams = Depends(),
    service_catalog_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
    priority: str | None = Query(default=None),
    search: str | None = Query(default=None),
    reported_from: datetime | None = Query(default=None),
    reported_to: datetime | None = Query(default=None),
) -> dict:
    incidents, total = service.list_for_current_provider(
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


@router.get(
    "/{incident_id}",
    response_model=IncidentResponse,
    summary="Obtener incidente del taller",
    description="Devuelve el detalle de un incidente visible para el taller actual.",
)
def get_current_tenant_incident(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    incident = service.get_for_current_provider_or_fail(incident_id)

    return success_response(
        message="Incidente obtenido correctamente.",
        data=incident_public(incident).model_dump(mode="json"),
    )
