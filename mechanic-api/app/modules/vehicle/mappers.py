from __future__ import annotations

from app.modules.identity.customer.mappers import customer_detail_public
from app.modules.identity.customer.models import Customer
from app.modules.identity.user.models import User
from app.modules.vehicle.models import Vehicle
from app.modules.vehicle.schemas import VehicleDetailPublic, VehiclePublic


def vehicle_public(vehicle: Vehicle) -> VehiclePublic:
    return VehiclePublic(
        id=str(vehicle.id),
        customer_id=str(vehicle.customer_id),
        plate_number=vehicle.plate_number,
        brand=vehicle.brand,
        model=vehicle.model,
        year=vehicle.year,
        color=vehicle.color,
        vehicle_type=vehicle.vehicle_type,  # type: ignore[arg-type]
        status=vehicle.status,  # type: ignore[arg-type]
        created_at=vehicle.created_at,
        updated_at=vehicle.updated_at,
        deleted_at=vehicle.deleted_at,
    )


def vehicle_detail_public(
    vehicle: Vehicle,
    customer: Customer,
    user: User,
) -> VehicleDetailPublic:
    return VehicleDetailPublic(
        vehicle=vehicle_public(vehicle),
        customer=customer_detail_public(customer, user),
    )
