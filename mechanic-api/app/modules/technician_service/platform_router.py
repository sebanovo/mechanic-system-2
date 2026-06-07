from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.technician_service.mappers import technician_service_detail_public
from app.modules.technician_service.repository import TechnicianServiceRepository
from app.modules.technician_service.schemas import (
    TechnicianServiceCreateRequest,
    TechnicianServiceListData,
    TechnicianServiceResponse,
    TechnicianServicesResponse,
    TechnicianServiceStatusChangeRequest,
    TechnicianServiceUpdateRequest,
)
from app.modules.technician_service.service import TechnicianServiceService

router = APIRouter(
    prefix="/platform/technician-services",
    tags=["Platform Technician Services"],
)


def _technician_service_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TechnicianServiceService:
    return TechnicianServiceService(
        repository=TechnicianServiceRepository(db),
        context=context,
    )


@router.get("", response_model=TechnicianServicesResponse)
def list_platform_technician_services(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianServiceService = Depends(_technician_service_service),
    pagination: PaginationParams = Depends(),
    technician_id: str | None = Query(default=None),
    provider_service_id: str | None = Query(default=None),
    provider_profile_id: str | None = Query(default=None),
    service_catalog_id: str | None = Query(default=None),
    skill_level: str | None = Query(default=None),
    is_enabled: bool | None = Query(default=None),
) -> dict:
    items, total = service.list(
        technician_id=technician_id,
        provider_service_id=provider_service_id,
        provider_profile_id=provider_profile_id,
        service_catalog_id=service_catalog_id,
        skill_level=skill_level,
        is_enabled=is_enabled,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = TechnicianServiceListData(
        items=[
            technician_service_detail_public(
                technician_service,
                technician,
                provider_service,
                service_catalog,
            )
            for technician_service, technician, provider_service, service_catalog in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Servicios de técnicos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post("", response_model=TechnicianServiceResponse)
def create_platform_technician_service(
    payload: TechnicianServiceCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    technician_service = service.create(payload)
    detail = service.get_detail_or_fail(str(technician_service.id))

    return success_response(
        message="Servicio del técnico creado correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.get("/{technician_service_id}", response_model=TechnicianServiceResponse)
def get_platform_technician_service(
    technician_service_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    detail = service.get_detail_or_fail(technician_service_id)

    return success_response(
        message="Servicio del técnico obtenido correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.put("/{technician_service_id}", response_model=TechnicianServiceResponse)
def update_platform_technician_service(
    technician_service_id: str,
    payload: TechnicianServiceUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    technician_service = service.update(technician_service_id, payload)
    detail = service.get_detail_or_fail(str(technician_service.id))

    return success_response(
        message="Servicio del técnico actualizado correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{technician_service_id}/status", response_model=TechnicianServiceResponse)
def change_platform_technician_service_status(
    technician_service_id: str,
    payload: TechnicianServiceStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    technician_service = service.change_status(technician_service_id, payload)
    detail = service.get_detail_or_fail(str(technician_service.id))

    return success_response(
        message="Estado del servicio del técnico actualizado correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )