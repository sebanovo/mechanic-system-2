from __future__ import annotations

from sqlalchemy.orm import Session

from app.common.exceptions import NotFoundException
from app.common.uuid import optional_uuid
from app.core.config import settings
from app.modules.audit.models import AuditEvent
from app.modules.audit.repository import AuditEventRepository


class AuditEventService:
    def __init__(self, repository: AuditEventRepository) -> None:
        self.repository = repository

    def record(
        self,
        *,
        scope: str,
        actor_type: str,
        event_type: str,
        resource_type: str,
        tenant_id: str | None = None,
        user_id: str | None = None,
        resource_id: str | None = None,
        event_data: dict | None = None,
        ip_address: str | None = None,
        user_agent: str | None = None,
    ) -> AuditEvent | None:
        if not settings.audit_enabled:
            return None

        event = AuditEvent(
            tenant_id=optional_uuid(tenant_id, "tenant_id"),
            user_id=optional_uuid(user_id, "user_id"),
            scope=scope,
            actor_type=actor_type,
            event_type=event_type,
            resource_type=resource_type,
            resource_id=optional_uuid(resource_id, "resource_id"),
            event_data=event_data,
            ip_address=ip_address,
            user_agent=user_agent,
        )

        return self.repository.add(event)

    def get_or_fail(self, audit_event_id: str) -> AuditEvent:
        event = self.repository.get_by_id(audit_event_id)

        if event is None:
            raise NotFoundException("Evento de auditoría no encontrado.")

        return event


def record_audit_event(
    db: Session,
    *,
    scope: str,
    actor_type: str,
    event_type: str,
    resource_type: str,
    tenant_id: str | None = None,
    user_id: str | None = None,
    resource_id: str | None = None,
    event_data: dict | None = None,
    ip_address: str | None = None,
    user_agent: str | None = None,
) -> AuditEvent | None:
    return AuditEventService(AuditEventRepository(db)).record(
        scope=scope,
        actor_type=actor_type,
        event_type=event_type,
        resource_type=resource_type,
        tenant_id=tenant_id,
        user_id=user_id,
        resource_id=resource_id,
        event_data=event_data,
        ip_address=ip_address,
        user_agent=user_agent,
    )