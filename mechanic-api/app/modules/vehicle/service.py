from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import VehicleAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.customer.models import Customer
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.user.models import User
from app.modules.vehicle.models import Vehicle
from app.modules.vehicle.repository import VehicleRepository
from app.modules.vehicle.schemas import (
    VehicleCreateRequest,
    VehicleStatusChangeRequest,
    VehicleUpdateRequest,
)


class VehicleService(BaseService):
    def __init__(
        self,
        repository: VehicleRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.customer_repository = CustomerRepository(self.db)

    def list(
        self,
        *,
        customer_id: str | None = None,
        search: str | None = None,
        vehicle_type: str | None = None,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Vehicle], int]:
        return self.repository.list(
            customer_id=customer_id,
            search=self._normalize_optional_text(search),
            vehicle_type=self._normalize_optional_text(vehicle_type),
            status=self._normalize_optional_text(status),
            limit=limit,
            offset=offset,
        )

    def list_current_customer(
        self,
        *,
        search: str | None = None,
        vehicle_type: str | None = None,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Vehicle], int]:
        customer = self._get_current_customer_or_fail()

        return self.repository.list_by_customer(
            str(customer.id),
            search=self._normalize_optional_text(search),
            vehicle_type=self._normalize_optional_text(vehicle_type),
            status=self._normalize_optional_text(status),
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, vehicle_id: str) -> Vehicle:
        vehicle = self.repository.get_by_id(vehicle_id)

        if vehicle is None or vehicle.deleted_at is not None:
            raise NotFoundException("Vehículo no encontrado.")

        return vehicle

    def get_detail_or_fail(self, vehicle_id: str) -> tuple[Vehicle, Customer, User]:
        detail = self.repository.get_detail_by_id(vehicle_id)

        if detail is None:
            raise NotFoundException("Vehículo no encontrado.")

        return detail

    def get_current_customer_vehicle_or_fail(self, vehicle_id: str) -> Vehicle:
        customer = self._get_current_customer_or_fail()
        vehicle = self.get_or_fail(vehicle_id)

        if str(vehicle.customer_id) != str(customer.id):
            raise NotFoundException("Vehículo no encontrado.")

        return vehicle

    def get_current_customer_detail_or_fail(
        self,
        vehicle_id: str,
    ) -> tuple[Vehicle, Customer, User]:
        customer = self._get_current_customer_or_fail()
        vehicle, detail_customer, user = self.get_detail_or_fail(vehicle_id)

        if str(detail_customer.id) != str(customer.id):
            raise NotFoundException("Vehículo no encontrado.")

        return vehicle, detail_customer, user

    def create_current_customer_vehicle(
        self,
        payload: VehicleCreateRequest,
    ) -> Vehicle:
        customer = self._get_current_customer_or_fail()

        return self._create_for_customer(
            customer=customer,
            payload=payload,
            tenant_id=None,
        )

    def create_for_customer(
        self,
        *,
        customer_id: str,
        payload: VehicleCreateRequest,
    ) -> Vehicle:
        customer = self.customer_repository.get_by_id(customer_id)

        if customer is None or customer.deleted_at is not None:
            raise NotFoundException("Cliente no encontrado.")

        return self._create_for_customer(
            customer=customer,
            payload=payload,
            tenant_id=self.context.tenant_id,
        )

    def update_current_customer_vehicle(
        self,
        vehicle_id: str,
        payload: VehicleUpdateRequest,
    ) -> Vehicle:
        vehicle = self.get_current_customer_vehicle_or_fail(vehicle_id)
        return self._update(vehicle, payload)

    def update_any(
        self,
        vehicle_id: str,
        payload: VehicleUpdateRequest,
    ) -> Vehicle:
        vehicle = self.get_or_fail(vehicle_id)
        return self._update(vehicle, payload)

    def change_current_customer_vehicle_status(
        self,
        vehicle_id: str,
        payload: VehicleStatusChangeRequest,
    ) -> Vehicle:
        vehicle = self.get_current_customer_vehicle_or_fail(vehicle_id)
        return self._change_status(vehicle, payload)

    def change_any_status(
        self,
        vehicle_id: str,
        payload: VehicleStatusChangeRequest,
    ) -> Vehicle:
        vehicle = self.get_or_fail(vehicle_id)
        return self._change_status(vehicle, payload)

    def get_platform_detail_or_fail(
        self,
        vehicle_id: str,
    ) -> tuple[Vehicle, Customer, User]:
        return self.get_detail_or_fail(vehicle_id)

    def soft_delete_current_customer_vehicle(self, vehicle_id: str) -> Vehicle:
        vehicle = self.get_current_customer_vehicle_or_fail(vehicle_id)
        return self._soft_delete(vehicle)

    def soft_delete_any(self, vehicle_id: str) -> Vehicle:
        vehicle = self.get_or_fail(vehicle_id)
        return self._soft_delete(vehicle)

    def restore_any(self, vehicle_id: str) -> Vehicle:
        vehicle = self.repository.get_by_id(vehicle_id)

        if vehicle is None:
            raise NotFoundException("Vehículo no encontrado.")

        vehicle.deleted_at = None
        vehicle.status = "ACTIVE"

        self.db.flush()

        self.audit.updated(
            vehicle,
            VehicleAuditEvent.VEHICLE_RESTORED,
            resource_type="vehicle",
            tenant_id=self.context.tenant_id,
        )

        self.db.commit()
        self.db.refresh(vehicle)

        return vehicle

    def _create_for_customer(
        self,
        *,
        customer: Customer,
        payload: VehicleCreateRequest,
        tenant_id: str | None,
    ) -> Vehicle:
        plate_number = payload.plate_number.strip().upper()

        existing = self.repository.get_by_customer_and_plate(
            customer_id=str(customer.id),
            plate_number=plate_number,
        )

        if existing is not None:
            raise ConflictException("El cliente ya tiene registrado un vehículo con esa placa.")

        vehicle = Vehicle(
            customer_id=customer.id,
            plate_number=plate_number,
            vehicle_type=payload.vehicle_type,
            brand=self._normalize_optional_text(payload.brand),
            model=self._normalize_optional_text(payload.model),
            year=payload.year,
            color=self._normalize_optional_text(payload.color),
            status="ACTIVE",
        )

        vehicle = self.repository.add(vehicle)

        self.audit.created(
            vehicle,
            VehicleAuditEvent.VEHICLE_CREATED,
            resource_type="vehicle",
            tenant_id=tenant_id,
            event_data={
                "customer_id": str(customer.id),
                "plate_number": vehicle.plate_number,
                "vehicle_type": vehicle.vehicle_type,
            },
        )

        self.db.commit()
        self.db.refresh(vehicle)

        return vehicle

    def _update(
        self,
        vehicle: Vehicle,
        payload: VehicleUpdateRequest,
    ) -> Vehicle:
        changed_fields: list[str] = []

        if payload.plate_number is not None:
            new_plate = payload.plate_number.strip().upper()

            existing = self.repository.get_by_customer_and_plate(
                customer_id=str(vehicle.customer_id),
                plate_number=new_plate,
            )

            if existing is not None and str(existing.id) != str(vehicle.id):
                raise ConflictException("El cliente ya tiene registrado un vehículo con esa placa.")

            vehicle.plate_number = new_plate
            changed_fields.append("plate_number")

        if payload.vehicle_type is not None:
            vehicle.vehicle_type = payload.vehicle_type
            changed_fields.append("vehicle_type")

        if payload.brand is not None:
            vehicle.brand = self._normalize_optional_text(payload.brand)
            changed_fields.append("brand")

        if payload.model is not None:
            vehicle.model = self._normalize_optional_text(payload.model)
            changed_fields.append("model")

        if payload.year is not None:
            vehicle.year = payload.year
            changed_fields.append("year")

        if payload.color is not None:
            vehicle.color = self._normalize_optional_text(payload.color)
            changed_fields.append("color")

        self.db.flush()

        self.audit.updated(
            vehicle,
            VehicleAuditEvent.VEHICLE_UPDATED,
            resource_type="vehicle",
            tenant_id=self.context.tenant_id,
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(vehicle)

        return vehicle

    def _change_status(
        self,
        vehicle: Vehicle,
        payload: VehicleStatusChangeRequest,
    ) -> Vehicle:
        previous_status = vehicle.status
        vehicle.status = payload.status

        self.db.flush()

        self.audit.updated(
            vehicle,
            VehicleAuditEvent.VEHICLE_STATUS_CHANGED,
            resource_type="vehicle",
            tenant_id=self.context.tenant_id,
            event_data={
                "previous_status": previous_status,
                "status": payload.status,
            },
        )

        self.db.commit()
        self.db.refresh(vehicle)

        return vehicle

    def _soft_delete(self, vehicle: Vehicle) -> Vehicle:
        vehicle.deleted_at = datetime.now(timezone.utc)
        vehicle.status = "INACTIVE"

        self.db.flush()

        self.audit.deleted(
            vehicle,
            VehicleAuditEvent.VEHICLE_DELETED,
            resource_type="vehicle",
            tenant_id=self.context.tenant_id,
        )

        self.db.commit()
        self.db.refresh(vehicle)

        return vehicle

    def _get_current_customer_or_fail(self) -> Customer:
        if self.context.user_id is None:
            raise NotFoundException("Cliente no encontrado.")

        customer = self.customer_repository.get_by_user_id(self.context.user_id)

        if customer is None or customer.deleted_at is not None:
            raise NotFoundException("Cliente no encontrado.")

        return customer

    def _normalize_optional_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None
