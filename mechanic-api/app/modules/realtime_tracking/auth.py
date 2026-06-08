from __future__ import annotations

from datetime import datetime, timezone
from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.common.exceptions import UnauthorizedException
from app.core.security import decode_token
from app.modules.identity.session.repository import SessionRepository
from app.modules.identity.user.repository import UserRepository


@dataclass(frozen=True, slots=True)
class RealtimeIdentity:
    user_id: str
    user_type: str
    tenant_id: str | None


def authenticate_realtime_user(
    *,
    token: str | None,
    db: Session,
) -> RealtimeIdentity:
    if not token:
        raise UnauthorizedException("Token WebSocket requerido.")

    try:
        payload = decode_token(token)
    except Exception as exc:  # pragma: no cover - decode_token already validates
        raise UnauthorizedException("Token WebSocket inválido.") from exc

    if payload.get("type") != "access":
        raise UnauthorizedException("Token WebSocket inválido.")

    user_id = payload.get("sub")
    session_id = payload.get("sid")
    tenant_id = payload.get("tid") or payload.get("tenant_id")

    if not isinstance(user_id, str) or not isinstance(session_id, str):
        raise UnauthorizedException("Token WebSocket inválido.")

    user = UserRepository(db).get_by_id(user_id)
    session = SessionRepository(db).get_session_by_id(session_id)

    if user is None or user.deleted_at is not None or user.status != "ACTIVE":
        raise UnauthorizedException("Usuario no autorizado.")

    if (
        session is None
        or session.session_status != "ACTIVE"
        or session.expires_at <= datetime.now(timezone.utc)
    ):
        raise UnauthorizedException("Sesión no autorizada.")

    if str(session.user_id) != str(user.id):
        raise UnauthorizedException("Sesión no autorizada.")

    return RealtimeIdentity(
        user_id=str(user.id),
        user_type=user.user_type,
        tenant_id=(
            tenant_id
            if isinstance(tenant_id, str)
            else (
                str(session.tenant_id)
                if session.tenant_id is not None
                else None
            )
        ),
    )
