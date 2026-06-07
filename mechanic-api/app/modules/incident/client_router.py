from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.common.exceptions import ValidationException
from app.core.ai.media import build_ai_media_inputs
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


@router.post(
    "/with-files",
    response_model=IncidentResponse,
    openapi_extra={
        "requestBody": {
            "content": {
                "multipart/form-data": {
                    "example": {
                        "vehicle_id": "uuid-del-vehiculo",
                        "latitude": -16.5001,
                        "longitude": -68.1193,
                        "description": "El auto se apagó en marcha y ahora no enciende.",
                        "priority": "MEDIUM",
                    }
                }
            }
        }
    },
)
async def create_my_incident_with_files(
    vehicle_id: Annotated[
        str,
        Form(
            description="UUID del vehículo del cliente.",
            examples=["uuid-del-vehiculo"],
        ),
    ],
    latitude: Annotated[
        Decimal,
        Form(
            description="Latitud geográfica donde ocurrió el incidente.",
            examples=[-16.5001],
        ),
    ],
    longitude: Annotated[
        Decimal,
        Form(
            description="Longitud geográfica donde ocurrió el incidente.",
            examples=[-68.1193],
        ),
    ],
    description: Annotated[
        str | None,
        Form(
            description="Descripción opcional del incidente. Si no se envía, al menos debe llegar un archivo.",
            examples=["El auto se apagó en marcha y ahora no enciende."],
        ),
    ] = None,
    priority: Annotated[
        str | None,
        Form(
            description="Prioridad opcional del incidente. Si no se envía, el backend usa MEDIUM.",
            examples=["MEDIUM"],
        ),
    ] = None,
    files: Annotated[
        list[UploadFile] | None,
        File(
            description="Archivos opcionales del incidente. Imágenes, video, audio o PDF.",
        ),
    ] = None,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: IncidentService = Depends(_incident_service),
) -> dict:
    if (description is None or not description.strip()) and not files:
        raise ValidationException("Debes enviar una descripción o al menos un archivo.")

    media = await build_ai_media_inputs(files)

    payload = IncidentCreateRequest(
        vehicle_id=vehicle_id,
        description=description,
        latitude=latitude,
        longitude=longitude,
        priority=priority or "MEDIUM",
    )

    incident = service.create_for_current_customer(
        payload,
        ai_media=media,
    )

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
