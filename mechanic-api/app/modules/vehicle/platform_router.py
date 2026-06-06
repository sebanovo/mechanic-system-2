from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.vehicle.mappers import vehicle_detail_public, vehicle_public
from app.modules.vehicle.repository import VehicleRepository
from app.modules.vehicle.schemas import (
    VehicleCreateRequest,
    VehicleDetailResponse,
    VehicleListData,
    VehicleResponse,
    VehiclesResponse,
    VehicleStatusChangeRequest,
    VehicleUpdateRequest,
)
from app.modules.vehicle.service import VehicleService

router = APIRouter(prefix="/platform/vehicles", tags=["Platform Vehicles"])


def _vehicle_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> VehicleService:
    return VehicleService(
        repository=VehicleRepository(db),
        context=context,
    )


@router.get("", response_model=VehiclesResponse)
def list_platform_vehicles(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
    pagination: PaginationParams = Depends(),
    customer_id: str | None = Query(default=None),
    search: str | None = Query(default=None),
    vehicle_type: str | None = Query(default=None),
    status: str | None = Query(default=None),
) -> dict:
    vehicles, total = service.list(
        customer_id=customer_id,
        search=search,
        vehicle_type=vehicle_type,
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = VehicleListData(
        items=[vehicle_public(vehicle) for vehicle in vehicles],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Vehículos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post("/customers/{customer_id}", response_model=VehicleResponse)
def create_platform_customer_vehicle(
    customer_id: str,
    payload: VehicleCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.create_for_customer(
        customer_id=customer_id,
        payload=payload,
    )

    return success_response(
        message="Vehículo creado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.get("/{vehicle_id}", response_model=VehicleDetailResponse)
def get_platform_vehicle(
    vehicle_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle, customer, user = service.get_platform_detail_or_fail(vehicle_id)

    return success_response(
        message="Vehículo obtenido correctamente.",
        data=vehicle_detail_public(vehicle, customer, user).model_dump(mode="json"),
    )


@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_platform_vehicle(
    vehicle_id: str,
    payload: VehicleUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.update_any(vehicle_id, payload)

    return success_response(
        message="Vehículo actualizado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.patch("/{vehicle_id}/status", response_model=VehicleResponse)
def change_platform_vehicle_status(
    vehicle_id: str,
    payload: VehicleStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.change_any_status(vehicle_id, payload)

    return success_response(
        message="Estado de vehículo actualizado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.delete("/{vehicle_id}", response_model=VehicleResponse)
def delete_platform_vehicle(
    vehicle_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.soft_delete_any(vehicle_id)

    return success_response(
        message="Vehículo eliminado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.patch("/{vehicle_id}/restore", response_model=VehicleResponse)
def restore_platform_vehicle(
    vehicle_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.restore_any(vehicle_id)

    return success_response(
        message="Vehículo restaurado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )
