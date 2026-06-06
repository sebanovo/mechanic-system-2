from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID

from app.common.exceptions import (
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
)
from app.core.audit.constants import SessionAuditEvent
from app.core.context import RequestContext
from app.core.security import hash_token, refresh_token_expires_at, session_expires_at
from app.core.services.base import BaseService
from app.modules.identity.session.models import RefreshToken, UserSession
from app.modules.identity.session.repository import SessionRepository
from app.modules.identity.user.models import User


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class SessionService(BaseService):
    def __init__(
        self,
        repository: SessionRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(db=repository.db, context=context or _system_context())
        self.repository = repository

    def list_sessions(
        self,
        *,
        user_id: str | None = None,
        tenant_id: str | None = None,
        session_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[UserSession], int]:
        return self.repository.list_sessions(
            user_id=user_id,
            tenant_id=tenant_id,
            session_status=session_status,
            limit=limit,
            offset=offset,
        )

    def list_current_user_sessions(
        self,
        *,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[UserSession], int]:
        if self.context.user_id is None:
            raise UnauthorizedException("Usuario no autenticado.")

        return self.repository.list_sessions_by_user(
            self.context.user_id,
            limit=limit,
            offset=offset,
        )

    def create_session(
        self,
        *,
        user: User,
        tenant_id: str | UUID | None,
        device_type: str | None,
        device_name: str | None,
        ip_address: str | None,
        user_agent: str | None,
    ) -> UserSession:
        now = datetime.now(timezone.utc)

        session = UserSession(
            user_id=user.id,
            tenant_id=UUID(tenant_id) if isinstance(tenant_id, str) else tenant_id,
            session_status="ACTIVE",
            device_type=device_type,
            device_name=device_name,
            ip_address=ip_address,
            user_agent=user_agent,
            login_at=now,
            last_activity_at=now,
            expires_at=session_expires_at(),
        )

        user.last_login_at = now
        return self.repository.add_session(session)

    def create_refresh_token(
        self,
        *,
        session: UserSession,
        raw_refresh_token: str,
        token_family: UUID | str | None = None,
    ) -> RefreshToken:
        refresh_token = RefreshToken(
            session_id=session.id,
            token_hash=hash_token(raw_refresh_token),
            token_family=(
                UUID(token_family)
                if isinstance(token_family, str)
                else token_family or session.id
            ),
            status="ACTIVE",
            expires_at=refresh_token_expires_at(),
        )

        return self.repository.add_refresh_token(refresh_token)

    def validate_refresh_token(self, raw_refresh_token: str) -> RefreshToken:
        token = self.repository.get_refresh_token_by_hash(hash_token(raw_refresh_token))

        if token is None:
            raise UnauthorizedException("Refresh token inválido.")

        if token.status != "ACTIVE":
            raise UnauthorizedException("Refresh token inválido.")

        if token.expires_at <= datetime.now(timezone.utc):
            token.status = "EXPIRED"
            self.db.flush()
            raise UnauthorizedException("Refresh token expirado.")

        return token

    def mark_refresh_token_used(self, token: RefreshToken) -> RefreshToken:
        token.status = "USED"
        token.used_at = datetime.now(timezone.utc)
        self.db.flush()
        return token

    def revoke_session(self, session_id: str | UUID) -> UserSession:
        session = self.revoke_session_uncommitted(session_id)

        self.audit.deleted(
            session,
            SessionAuditEvent.SESSION_REVOKED,
            resource_type="session",
            tenant_id=str(session.tenant_id) if session.tenant_id is not None else None,
        )

        self.db.commit()
        self.db.refresh(session)

        return session

    def revoke_current_user_session(self, session_id: str) -> UserSession:
        if self.context.user_id is None:
            raise UnauthorizedException("Usuario no autenticado.")

        session = self.repository.get_session_by_id(session_id)

        if session is None or str(session.user_id) != self.context.user_id:
            raise NotFoundException("Sesión no encontrada.")

        if self.context.tenant_id is not None and str(session.tenant_id) != self.context.tenant_id:
            raise ForbiddenException("La sesión no pertenece al tenant actual.")

        return self.revoke_session(session_id)

    def revoke_token_family(self, token_family: str | UUID) -> None:
        self.repository.revoke_token_family(token_family)
        self.db.flush()

    def touch_session(self, session: UserSession) -> UserSession:
        session.last_activity_at = datetime.now(timezone.utc)
        self.db.flush()
        return session

    def revoke_session_uncommitted(self, session_id: str | UUID) -> UserSession:
        session = self.get_session_or_fail(session_id)

        session.session_status = "REVOKED"
        session.revoked_at = datetime.now(timezone.utc)
        session.last_activity_at = datetime.now(timezone.utc)

        self.repository.revoke_active_tokens_by_session(session.id)
        self.db.flush()

        return session

    def get_session_or_fail(self, session_id: str | UUID) -> UserSession:
        session = self.repository.get_session_by_id(session_id)

        if session is None:
            raise NotFoundException("Sesión no encontrada.")

        return session
