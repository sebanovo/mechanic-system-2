from __future__ import annotations

from app.modules.audit.models import AuditEvent
from app.modules.audit.schemas import AuditEventPublic


def audit_event_public(event: AuditEvent) -> AuditEventPublic:
    return AuditEventPublic(
        id=str(event.id),
        tenant_id=str(event.tenant_id) if event.tenant_id is not None else None,
        user_id=str(event.user_id) if event.user_id is not None else None,
        scope=event.scope,  # type: ignore[arg-type]
        actor_type=event.actor_type,  # type: ignore[arg-type]
        event_type=event.event_type,
        resource_type=event.resource_type,
        resource_id=str(event.resource_id) if event.resource_id is not None else None,
        event_data=event.event_data,
        ip_address=event.ip_address,
        user_agent=event.user_agent,
        created_at=event.created_at,
        updated_at=event.updated_at,
    )
