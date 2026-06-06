from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.audit.models import AuditEvent


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class AuditEventRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, audit_event_id: str | UUID) -> AuditEvent | None:
        return self.db.get(AuditEvent, _to_uuid(audit_event_id, "audit_event_id"))

    def list(
        self,
        *,
        scope: str | None = None,
        tenant_id: str | UUID | None = None,
        actor_id: str | UUID | None = None,
        event_type: str | None = None,
        resource_type: str | None = None,
        resource_id: str | UUID | None = None,
        created_from: datetime | None = None,
        created_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[AuditEvent], int]:
        query = select(AuditEvent)

        if scope is not None:
            query = query.where(AuditEvent.scope == scope)

        if tenant_id is not None:
            query = query.where(AuditEvent.tenant_id == _to_uuid(tenant_id))

        if actor_id is not None:
            query = query.where(AuditEvent.user_id == _to_uuid(actor_id))

        if event_type is not None:
            query = query.where(AuditEvent.event_type == event_type)

        if resource_type is not None:
            query = query.where(AuditEvent.resource_type == resource_type)

        if resource_id is not None:
            query = query.where(AuditEvent.resource_id == _to_uuid(resource_id))

        if created_from is not None:
            query = query.where(AuditEvent.created_at >= created_from)

        if created_to is not None:
            query = query.where(AuditEvent.created_at <= created_to)

        return self._paginate(
            query.order_by(AuditEvent.created_at.desc()),
            limit,
            offset,
        )

    def resource_history(
        self,
        *,
        scope: str | None,
        tenant_id: str | UUID | None,
        resource_type: str,
        resource_id: str | UUID,
    ) -> list[AuditEvent]:
        query = select(AuditEvent).where(
            AuditEvent.resource_type == resource_type,
            AuditEvent.resource_id == _to_uuid(resource_id),
        )

        if scope is not None:
            query = query.where(AuditEvent.scope == scope)

        if tenant_id is not None:
            query = query.where(AuditEvent.tenant_id == _to_uuid(tenant_id))

        return list(self.db.scalars(query.order_by(AuditEvent.created_at.desc())))

    def add(self, event: AuditEvent) -> AuditEvent:
        self.db.add(event)
        self.db.flush()
        return event

    def _paginate(
        self,
        query: Select[tuple[AuditEvent]],
        limit: int,
        offset: int,
    ) -> tuple[list[AuditEvent], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)