from __future__ import annotations

from app.core.audit.constants import AuditActorType
from app.core.audit.helpers import infer_resource_id, infer_resource_type
from sqlalchemy.orm import Session

from app.core.context import RequestContext
from app.modules.audit.service import record_audit_event


class AuditManager:
    def __init__(
        self,
        db: Session,
        context: RequestContext,
    ) -> None:
        self.db = db
        self.context = context

    def created(
        self,
        entity: object,
        event_type: str,
        *,
        event_data: dict | None = None,
        resource_type: str | None = None,
        tenant_id: str | None = None,
        actor_type: str | None = None,
    ) -> None:
        self._record(
            entity=entity,
            event_type=event_type,
            event_data=event_data,
            resource_type=resource_type,
            tenant_id=tenant_id,
            actor_type=actor_type,
        )

    def updated(
        self,
        entity: object,
        event_type: str,
        *,
        event_data: dict | None = None,
        resource_type: str | None = None,
        tenant_id: str | None = None,
        actor_type: str | None = None,
    ) -> None:
        self._record(
            entity=entity,
            event_type=event_type,
            event_data=event_data,
            resource_type=resource_type,
            tenant_id=tenant_id,
            actor_type=actor_type,
        )

    def deleted(
        self,
        entity: object,
        event_type: str,
        *,
        event_data: dict | None = None,
        resource_type: str | None = None,
        tenant_id: str | None = None,
        actor_type: str | None = None,
    ) -> None:
        self._record(
            entity=entity,
            event_type=event_type,
            event_data=event_data,
            resource_type=resource_type,
            tenant_id=tenant_id,
            actor_type=actor_type,
        )

    def _record(
        self,
        *,
        entity: object,
        event_type: str,
        event_data: dict | None,
        resource_type: str | None,
        tenant_id: str | None,
        actor_type: str | None,
    ) -> None:
        final_tenant_id = tenant_id or self.context.tenant_id
        final_actor_type = actor_type or self.context.actor_type or AuditActorType.SYSTEM

        record_audit_event(
            self.db,
            scope="TENANT" if final_tenant_id else "PLATFORM",
            actor_type=final_actor_type,
            event_type=event_type,
            resource_type=resource_type or infer_resource_type(entity),
            resource_id=infer_resource_id(entity),
            tenant_id=final_tenant_id,
            user_id=self.context.user_id,
            event_data=event_data,
            ip_address=self.context.ip_address,
            user_agent=self.context.user_agent,
        )
