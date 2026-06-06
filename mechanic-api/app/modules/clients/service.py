from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import ForbiddenException, UnauthorizedException
from app.core.audit.constants import ClientAuditEvent
from app.core.context import RequestContext
from app.core.security import hash_password, verify_password
from app.core.services.base import BaseService
from app.modules.identity.user.models import User
from app.modules.identity.user.repository import UserRepository
from app.modules.identity.user.schemas import UserUpdateRequest


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class ClientService(BaseService):
    def __init__(
        self,
        repository: UserRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(db=repository.db, context=context or _system_context())
        self.repository = repository

    def get_current_user_or_fail(self) -> User:
        if self.context.user_id is None:
            raise UnauthorizedException("Usuario no autenticado.")

        user = self.repository.get_by_id(self.context.user_id)

        if user is None:
            raise UnauthorizedException("Usuario no encontrado.")

        return user

    def update_current_profile(self, payload: UserUpdateRequest) -> User:
        user = self.get_current_user_or_fail()
        changed_fields: list[str] = []

        if payload.first_name is not None:
            user.first_name = payload.first_name.strip()
            changed_fields.append("first_name")

        if payload.last_name is not None:
            user.last_name = payload.last_name.strip()
            changed_fields.append("last_name")

        if payload.phone is not None:
            user.phone = payload.phone
            changed_fields.append("phone")

        if payload.avatar_url is not None:
            user.avatar_url = payload.avatar_url
            changed_fields.append("avatar_url")

        self.db.flush()

        self.audit.updated(
            user,
            ClientAuditEvent.CLIENT_PROFILE_UPDATED,
            resource_type="user",
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def change_current_password(
        self,
        *,
        current_password: str,
        new_password: str,
    ) -> None:
        user = self.get_current_user_or_fail()

        if not verify_password(current_password, user.password_hash):
            raise ForbiddenException("La contraseña actual no es válida.")

        user.password_hash = hash_password(new_password)
        user.password_changed_at = datetime.now(timezone.utc)

        self.db.flush()

        self.audit.updated(
            user,
            ClientAuditEvent.CLIENT_PASSWORD_CHANGED,
            resource_type="user",
        )

        self.db.commit()
