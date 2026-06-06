from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.service_catalog.mappers import service_catalog_public
from app.modules.service_catalog.repository import ServiceCatalogRepository
from app.modules.service_catalog.schemas import (
    ServiceCatalogCreateRequest,
    ServiceCatalogListData,
    ServiceCatalogResponse,
    ServiceCatalogsResponse,
    ServiceCatalogStatusChangeRequest,
    ServiceCatalogUpdateRequest,
)
from app.modules.service_catalog.service import ServiceCatalogService

router = APIRouter(prefix="/platform/service-catalog", tags=["Platform Service Catalog"])


def _service_catalog_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ServiceCatalogService:
    return ServiceCatalogService(
        repository=ServiceCatalogRepository(db),
        context=context,
    )


@router.get("", response_model=ServiceCatalogsResponse)
def list_platform_service_catalog(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ServiceCatalogService = Depends(_service_catalog_service),
    pagination: PaginationParams = Depends(),
    search: str | None = Query(default=None),
    category: str | None = Query(default=None),
    is_active: bool | None = Query(default=None),
) -> dict:
    items, total = service.list(
        search=search,
        category=category,
        is_active=is_active,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = ServiceCatalogListData(
        items=[service_catalog_public(item) for item in items],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Catálogo de servicios obtenido correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post("", response_model=ServiceCatalogResponse)
def create_platform_service_catalog(
    payload: ServiceCatalogCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ServiceCatalogService = Depends(_service_catalog_service),
) -> dict:
    service_catalog = service.create(payload)

    return success_response(
        message="Servicio de catálogo creado correctamente.",
        data=service_catalog_public(service_catalog).model_dump(mode="json"),
    )


@router.get("/{service_catalog_id}", response_model=ServiceCatalogResponse)
def get_platform_service_catalog(
    service_catalog_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ServiceCatalogService = Depends(_service_catalog_service),
) -> dict:
    service_catalog = service.get_or_fail(service_catalog_id)

    return success_response(
        message="Servicio de catálogo obtenido correctamente.",
        data=service_catalog_public(service_catalog).model_dump(mode="json"),
    )


@router.put("/{service_catalog_id}", response_model=ServiceCatalogResponse)
def update_platform_service_catalog(
    service_catalog_id: str,
    payload: ServiceCatalogUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ServiceCatalogService = Depends(_service_catalog_service),
) -> dict:
    service_catalog = service.update(service_catalog_id, payload)

    return success_response(
        message="Servicio de catálogo actualizado correctamente.",
        data=service_catalog_public(service_catalog).model_dump(mode="json"),
    )


@router.patch("/{service_catalog_id}/status", response_model=ServiceCatalogResponse)
def change_platform_service_catalog_status(
    service_catalog_id: str,
    payload: ServiceCatalogStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ServiceCatalogService = Depends(_service_catalog_service),
) -> dict:
    service_catalog = service.change_status(service_catalog_id, payload)

    return success_response(
        message="Estado de servicio de catálogo actualizado correctamente.",
        data=service_catalog_public(service_catalog).model_dump(mode="json"),
    )