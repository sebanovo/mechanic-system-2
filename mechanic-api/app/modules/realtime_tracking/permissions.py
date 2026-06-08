from __future__ import annotations

from app.common.exceptions import ForbiddenException, NotFoundException
from app.modules.assignment.repository import AssignmentRepository
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.realtime_tracking.auth import RealtimeIdentity


def assert_can_connect_tracking(
    *,
    assignment_id: str,
    identity: RealtimeIdentity,
    assignment_repository: AssignmentRepository,
    customer_repository: CustomerRepository,
    provider_repository: ProviderProfileRepository,
    technician_repository: TechnicianRepository,
) -> str:
    detail = assignment_repository.get_detail_by_id(assignment_id)

    if detail is None:
        raise NotFoundException("Asignación no encontrada.")

    assignment, incident, _offer, provider_profile, technician = detail

    if assignment.assignment_status in {"COMPLETED", "CANCELLED"}:
        raise ForbiddenException("La asignación ya no permite tracking en vivo.")

    if identity.user_type == "TECHNICIAN":
        if identity.tenant_id is None:
            raise ForbiddenException("Tenant requerido.")

        technician_record = technician_repository.get_by_tenant_and_user(
            identity.tenant_id,
            identity.user_id,
        )

        if technician_record is None:
            raise ForbiddenException("El técnico no está asignado a esta orden.")

        if str(technician_record.id) != str(assignment.technician_id):
            raise ForbiddenException("El técnico no está asignado a esta orden.")

        return "TECHNICIAN"

    if identity.user_type == "CLIENT":
        customer = customer_repository.get_by_user_id(identity.user_id)

        if customer is None or customer.deleted_at is not None:
            raise ForbiddenException("Cliente no autorizado.")

        if str(incident.customer_id) != str(customer.id):
            raise ForbiddenException("El cliente no pertenece a esta asignación.")

        return "CLIENT"

    if identity.user_type == "TENANT_OWNER":
        if identity.tenant_id is None:
            raise ForbiddenException("Tenant requerido.")

        provider = provider_repository.get_by_tenant_id(identity.tenant_id)

        if provider is None:
            raise ForbiddenException("Proveedor no encontrado.")

        if str(provider_profile.id) != str(provider.id):
            raise ForbiddenException("La asignación no pertenece al taller.")

        return "TENANT_OWNER"

    raise ForbiddenException("Usuario no autorizado para tracking.")
