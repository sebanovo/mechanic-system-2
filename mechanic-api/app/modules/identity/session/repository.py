from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select, update
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.session.models import RefreshToken, UserSession


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class SessionRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_session_by_id(self, session_id: str | UUID) -> UserSession | None:
        return self.db.get(UserSession, _to_uuid(session_id, "session_id"))

    def get_refresh_token_by_hash(self, token_hash: str) -> RefreshToken | None:
        return self.db.scalar(
            select(RefreshToken).where(RefreshToken.token_hash == token_hash)
        )

    def list_sessions(
        self,
        *,
        user_id: str | UUID | None = None,
        tenant_id: str | UUID | None = None,
        session_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[UserSession], int]:
        query = select(UserSession)

        if user_id is not None:
            query = query.where(UserSession.user_id == _to_uuid(user_id))

        if tenant_id is not None:
            query = query.where(UserSession.tenant_id == _to_uuid(tenant_id))

        if session_status is not None:
            query = query.where(UserSession.session_status == session_status)

        return self._paginate(
            query.order_by(UserSession.created_at.desc()),
            limit,
            offset,
        )

    def list_sessions_by_user(
        self,
        user_id: str | UUID,
        *,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[UserSession], int]:
        return self.list_sessions(
            user_id=user_id,
            limit=limit,
            offset=offset,
        )

    def add_session(self, session: UserSession) -> UserSession:
        self.db.add(session)
        self.db.flush()
        return session

    def add_refresh_token(self, refresh_token: RefreshToken) -> RefreshToken:
        self.db.add(refresh_token)
        self.db.flush()
        return refresh_token

    def revoke_active_tokens_by_session(self, session_id: str | UUID) -> None:
        self.db.execute(
            update(RefreshToken)
            .where(
                RefreshToken.session_id == _to_uuid(session_id),
                RefreshToken.status == "ACTIVE",
            )
            .values(status="REVOKED")
        )

    def revoke_token_family(self, token_family: str | UUID) -> None:
        self.db.execute(
            update(RefreshToken)
            .where(
                RefreshToken.token_family == _to_uuid(token_family),
                RefreshToken.status == "ACTIVE",
            )
            .values(status="REVOKED")
        )

    def _paginate(
        self,
        query: Select[tuple[UserSession]],
        limit: int,
        offset: int,
    ) -> tuple[list[UserSession], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)