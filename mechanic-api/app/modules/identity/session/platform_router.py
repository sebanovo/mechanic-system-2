from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.session.mappers import session_public
from app.modules.identity.session.repository import SessionRepository
from app.modules.identity.session.schemas import (
    SessionListData,
    SessionResponse,
    SessionsResponse,
)
from app.modules.identity.session.service import SessionService

router = APIRouter(prefix="/platform/sessions", tags=["Platform Sessions"])


def _session_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> SessionService:
    return SessionService(
        repository=SessionRepository(db),
        context=context,
    )


@router.get("", response_model=SessionsResponse)
def list_platform_sessions(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: SessionService = Depends(_session_service),
    pagination: PaginationParams = Depends(),
    user_id: str | None = Query(default=None),
    tenant_id: str | None = Query(default=None),
    session_status: str | None = Query(default=None),
) -> dict:
    sessions, total = service.list_sessions(
        user_id=user_id,
        tenant_id=tenant_id,
        session_status=session_status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = SessionListData(
        items=[session_public(session) for session in sessions],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Sesiones obtenidas correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.delete("/{session_id}", response_model=SessionResponse)
def revoke_platform_session(
    session_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: SessionService = Depends(_session_service),
) -> dict:
    session = service.revoke_session(session_id)

    return success_response(
        message="Sesión revocada correctamente.",
        data=session_public(session).model_dump(mode="json"),
    )
