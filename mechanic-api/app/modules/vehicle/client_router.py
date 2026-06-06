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

router = APIRouter(prefix="/clients/me/vehicles", tags=["Client Vehicles"])


def _vehicle_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> VehicleService:
    return VehicleService(
        repository=VehicleRepository(db),
        context=context,
    )


@router.get("", response_model=VehiclesResponse)
def list_my_vehicles(
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: VehicleService = Depends(_vehicle_service),
    pagination: PaginationParams = Depends(),
    search: str | None = Query(default=None),
    vehicle_type: str | None = Query(default=None),
    status: str | None = Query(default=None),
) -> dict:
    vehicles, total = service.list_current_customer(
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


@router.post("", response_model=VehicleResponse)
def create_my_vehicle(
    payload: VehicleCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.create_current_customer_vehicle(payload)

    return success_response(
        message="Vehículo creado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.get("/{vehicle_id}", response_model=VehicleDetailResponse)
def get_my_vehicle(
    vehicle_id: str,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle, customer, user = service.get_current_customer_detail_or_fail(vehicle_id)

    return success_response(
        message="Vehículo obtenido correctamente.",
        data=vehicle_detail_public(vehicle, customer, user).model_dump(mode="json"),
    )


@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_my_vehicle(
    vehicle_id: str,
    payload: VehicleUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.update_current_customer_vehicle(vehicle_id, payload)

    return success_response(
        message="Vehículo actualizado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.patch("/{vehicle_id}/status", response_model=VehicleResponse)
def change_my_vehicle_status(
    vehicle_id: str,
    payload: VehicleStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.change_current_customer_vehicle_status(vehicle_id, payload)

    return success_response(
        message="Estado de vehículo actualizado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )


@router.delete("/{vehicle_id}", response_model=VehicleResponse)
def delete_my_vehicle(
    vehicle_id: str,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: VehicleService = Depends(_vehicle_service),
) -> dict:
    vehicle = service.soft_delete_current_customer_vehicle(vehicle_id)

    return success_response(
        message="Vehículo eliminado correctamente.",
        data=vehicle_public(vehicle).model_dump(mode="json"),
    )
