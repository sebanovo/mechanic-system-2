from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Callable

from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.common.exceptions import ForbiddenException, UnauthorizedException
from app.common.uuid import to_uuid
from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_token
from app.modules.identity.session.models import UserSession
from app.modules.identity.user.models import User
from app.modules.identity.user.repository import UserRepository

bearer_scheme = HTTPBearer(auto_error=False)


@dataclass(slots=True)
class CurrentIdentity:
    user: User
    session: UserSession
    tenant_id: str | None


def _get_access_token(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None,
) -> str:
    if credentials is not None:
        return credentials.credentials

    cookie_token = request.cookies.get(settings.access_cookie_name)

    if cookie_token:
        return cookie_token

    raise UnauthorizedException("Se requiere un token de acceso.")


def get_current_identity(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> CurrentIdentity:
    access_token = _get_access_token(request, credentials)

    try:
        claims = decode_token(access_token)
    except Exception as exc:
        raise UnauthorizedException("Token de acceso inválido.") from exc

    if claims.get("type") != "access":
        raise UnauthorizedException("Token de acceso inválido.")

    user_id = claims.get("sub")
    session_id = claims.get("sid")
    tenant_id = claims.get("tid")

    if not user_id or not session_id:
        raise UnauthorizedException("Token de acceso inválido.")

    user = UserRepository(db).get_by_id(str(user_id))
    session = db.get(UserSession, to_uuid(str(session_id), "session_id"))

    if user is None or session is None:
        raise UnauthorizedException("Sesión no encontrada.")

    if user.deleted_at is not None:
        raise UnauthorizedException("El usuario no está disponible.")

    if user.status != "ACTIVE":
        raise UnauthorizedException("El usuario no está activo.")

    if session.session_status != "ACTIVE":
        raise UnauthorizedException("La sesión ha expirado.")

    if session.expires_at <= datetime.now(timezone.utc):
        raise UnauthorizedException("La sesión ha expirado.")

    request.state.request_user_id = str(user.id)
    request.state.request_tenant_id = tenant_id
    request.state.request_session_id = str(session.id)

    context = getattr(request.state, "context", None)
    if context is not None:
        context.user_id = str(user.id)
        context.tenant_id = tenant_id
        context.session_id = str(session.id)
        context.actor_type = user.user_type

    return CurrentIdentity(
        user=user,
        session=session,
        tenant_id=tenant_id,
    )


def require_user_types(*allowed_types: str) -> Callable:
    def dependency(
        identity: CurrentIdentity = Depends(get_current_identity),
    ) -> CurrentIdentity:
        if identity.user.user_type not in allowed_types:
            raise ForbiddenException("No tiene acceso a este contexto.")

        return identity

    return dependency


def require_tenant_selected() -> Callable:
    def dependency(
        identity: CurrentIdentity = Depends(get_current_identity),
    ) -> CurrentIdentity:
        if identity.tenant_id is None:
            raise ForbiddenException("Debe seleccionar un tenant para continuar.")

        return identity

    return dependency
