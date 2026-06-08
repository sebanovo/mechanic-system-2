from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.exceptions import ForbiddenException, NotFoundException
from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.database import get_db
from app.modules.audit.mappers import audit_event_public
from app.modules.audit.repository import AuditEventRepository
from app.modules.audit.schemas import (
    AuditEventListData,
    AuditEventResponse,
    AuditEventsResponse,
)
from app.modules.audit.service import AuditEventService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types

router = APIRouter(prefix="/tenants/current/audit-events", tags=["Tenant Audit"])


def _current_tenant_id(identity: CurrentIdentity) -> str:
    if identity.tenant_id is None:
        raise ForbiddenException("No hay un tenant activo seleccionado.")

    return identity.tenant_id


@router.get("", response_model=AuditEventsResponse)
def list_current_tenant_audit_events(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    db: Session = Depends(get_db),
    pagination: PaginationParams = Depends(),
    actor_id: str | None = Query(default=None),
    event_type: str | None = Query(default=None),
    resource_type: str | None = Query(default=None),
    resource_id: str | None = Query(default=None),
    created_from: datetime | None = Query(default=None),
    created_to: datetime | None = Query(default=None),
) -> dict:
    tenant_id = _current_tenant_id(identity)

    events, total = AuditEventRepository(db).list(
        scope="TENANT",
        tenant_id=tenant_id,
        actor_id=actor_id,
        event_type=event_type,
        resource_type=resource_type,
        resource_id=resource_id,
        created_from=created_from,
        created_to=created_to,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = AuditEventListData(
        items=[audit_event_public(event) for event in events],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Eventos de auditoría obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get(
    "/resources/{resource_type}/{resource_id}",
    response_model=AuditEventsResponse,
)
def get_current_tenant_resource_history(
    resource_type: str,
    resource_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    db: Session = Depends(get_db),
) -> dict:
    tenant_id = _current_tenant_id(identity)

    events = AuditEventRepository(db).resource_history(
        scope="TENANT",
        tenant_id=tenant_id,
        resource_type=resource_type,
        resource_id=resource_id,
    )

    data = AuditEventListData(
        items=[audit_event_public(event) for event in events],
        pagination=build_pagination_meta(
            page=1,
            page_size=max(len(events), 1),
            total=len(events),
        ),
    )

    return success_response(
        message="Historial del recurso obtenido correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{audit_event_id}", response_model=AuditEventResponse)
def get_current_tenant_audit_event(
    audit_event_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    db: Session = Depends(get_db),
) -> dict:
    tenant_id = _current_tenant_id(identity)
    event = AuditEventService(AuditEventRepository(db)).get_or_fail(audit_event_id)

    if event.scope != "TENANT" or str(event.tenant_id) != tenant_id:
        raise NotFoundException("Evento de auditoría no encontrado.")

    return success_response(
        message="Evento de auditoría obtenido correctamente.",
        data=audit_event_public(event).model_dump(mode="json"),
    )
