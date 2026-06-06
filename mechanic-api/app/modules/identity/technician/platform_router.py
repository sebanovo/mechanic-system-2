from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.technician.mappers import technician_detail_public
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.technician.schemas import (
    TechnicianListData,
    TechnicianResponse,
    TechniciansResponse,
)
from app.modules.identity.technician.service import TechnicianService

router = APIRouter(prefix="/platform/technicians", tags=["Platform Technicians"])


def _technician_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TechnicianService:
    return TechnicianService(
        repository=TechnicianRepository(db),
        context=context,
    )


@router.get("", response_model=TechniciansResponse)
def list_platform_technicians(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianService = Depends(_technician_service),
    pagination: PaginationParams = Depends(),
    provider_profile_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
) -> dict:
    items, total = service.list(
        provider_profile_id=provider_profile_id,
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = TechnicianListData(
        items=[technician_detail_public(technician, user) for technician, user in items],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Técnicos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{technician_id}", response_model=TechnicianResponse)
def get_platform_technician(
    technician_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TechnicianService = Depends(_technician_service),
) -> dict:
    detail = service.get_detail_or_fail(technician_id)

    return success_response(
        message="Técnico obtenido correctamente.",
        data=technician_detail_public(*detail).model_dump(mode="json"),
    )
