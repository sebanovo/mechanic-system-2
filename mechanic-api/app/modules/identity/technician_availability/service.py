from __future__ import annotations

from sqlalchemy import select

from app.common.exceptions import ForbiddenException, NotFoundException
from app.core.audit.constants import TechnicianAvailabilityAuditEvent
from app.common.uuid import to_uuid
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.models import Technician
from app.modules.identity.technician_availability.models import TechnicianAvailability
from app.modules.identity.technician_availability.repository import (
    TechnicianAvailabilityRepository,
)
from app.modules.identity.technician_availability.schemas import (
    TechnicianAvailabilityUpsertRequest,
)


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class TechnicianAvailabilityService(BaseService):
    def __init__(
        self,
        repository: TechnicianAvailabilityRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(db=repository.db, context=context or _system_context())
        self.repository = repository

    def get_or_fail(self, technician_id: str) -> TechnicianAvailability:
        availability = self.repository.get_by_technician_id(
            to_uuid(technician_id, "technician_id")
        )

        if availability is None:
            raise NotFoundException("Disponibilidad de técnico no encontrada.")

        return availability

    def get_for_current_tenant_or_fail(
        self,
        technician_id: str,
    ) -> TechnicianAvailability:
        self.ensure_technician_belongs_to_current_tenant(technician_id)
        return self.get_or_fail(technician_id)

    def upsert(
        self,
        technician_id: str,
        payload: TechnicianAvailabilityUpsertRequest,
    ) -> TechnicianAvailability:
        technician = self._get_technician_or_fail(technician_id)

        availability = self.repository.get_by_technician_id(technician.id)

        if availability is None:
            availability = TechnicianAvailability(
                technician_id=technician.id,
                availability_status=payload.availability_status,
                available_from=payload.available_from,
                available_until=payload.available_until,
            )
            availability = self.repository.add(availability)
            event_type = TechnicianAvailabilityAuditEvent.TECHNICIAN_AVAILABILITY_CREATED
        else:
            availability.availability_status = payload.availability_status
            availability.available_from = payload.available_from
            availability.available_until = payload.available_until
            self.db.flush()
            event_type = TechnicianAvailabilityAuditEvent.TECHNICIAN_AVAILABILITY_UPDATED

        tenant_id = self._tenant_id_from_technician(technician)

        self.audit.updated(
            availability,
            event_type,
            resource_type="technician_availability",
            tenant_id=tenant_id,
            event_data={"availability_status": payload.availability_status},
        )

        self.db.commit()
        self.db.refresh(availability)

        return availability

    def upsert_for_current_tenant(
        self,
        technician_id: str,
        payload: TechnicianAvailabilityUpsertRequest,
        *,
        actor_user_type: str,
        actor_user_id: str,
    ) -> TechnicianAvailability:
        technician = self.ensure_technician_belongs_to_current_tenant(technician_id)

        if actor_user_type == "TECHNICIAN" and str(technician.user_id) != actor_user_id:
            raise ForbiddenException("Solo puede actualizar su propia disponibilidad.")

        return self.upsert(str(technician.id), payload)

    def ensure_technician_belongs_to_current_tenant(
        self,
        technician_id: str,
    ) -> Technician:
        if self.context.tenant_id is None:
            raise ForbiddenException("No hay un tenant activo seleccionado.")

        technician = self._get_technician_or_fail(technician_id)

        provider_profile = self.db.scalar(
            select(ProviderProfile).where(
                ProviderProfile.id == technician.provider_profile_id,
                ProviderProfile.tenant_id == to_uuid(self.context.tenant_id, "tenant_id"),
            )
        )

        if provider_profile is None:
            raise ForbiddenException("El técnico no pertenece al tenant actual.")

        return technician

    def _get_technician_or_fail(self, technician_id: str) -> Technician:
        technician = self.db.get(Technician, to_uuid(technician_id, "technician_id"))

        if technician is None or technician.deleted_at is not None:
            raise NotFoundException("Técnico no encontrado.")

        return technician

    def _tenant_id_from_technician(self, technician: Technician) -> str | None:
        provider_profile = self.db.get(ProviderProfile, technician.provider_profile_id)

        if provider_profile is None:
            return self.context.tenant_id

        return str(provider_profile.tenant_id)
