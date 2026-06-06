from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import UserAuditEvent
from app.core.context import RequestContext
from app.core.security import hash_password
from app.core.services.base import BaseService
from app.modules.identity.user.models import User
from app.modules.identity.user.repository import UserRepository
from app.modules.identity.user.schemas import (
    UserCreateRequest,
    UserPasswordChangeRequest,
    UserStatusChangeRequest,
    UserTypeChangeRequest,
    UserUpdateRequest,
)


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class UserService(BaseService):
    def __init__(
        self,
        repository: UserRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(
            db=repository.db,
            context=context or _system_context(),
        )
        self.repository = repository

    def list(
        self,
        *,
        email: str | None = None,
        user_type: str | None = None,
        status: str | None = None,
        created_from: datetime | None = None,
        created_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[User], int]:
        return self.repository.list(
            email=email,
            user_type=user_type,
            status=status,
            created_from=created_from,
            created_to=created_to,
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, user_id: str) -> User:
        return self._get_or_fail(user_id)

    def create(self, payload: UserCreateRequest) -> User:
        user = self._create_uncommitted(payload)

        self.audit.created(
            user,
            UserAuditEvent.USER_CREATED,
            resource_type="user",
            event_data={"user_type": user.user_type},
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def update(self, user_id: str, payload: UserUpdateRequest) -> User:
        user = self._get_or_fail(user_id)
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
            UserAuditEvent.USER_UPDATED,
            resource_type="user",
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def change_type(
        self,
        user_id: str,
        payload: UserTypeChangeRequest,
    ) -> User:
        user = self._get_or_fail(user_id)
        previous_user_type = user.user_type

        user.user_type = payload.user_type
        self.db.flush()

        self.audit.updated(
            user,
            UserAuditEvent.USER_TYPE_CHANGED,
            resource_type="user",
            event_data={
                "previous_user_type": previous_user_type,
                "user_type": payload.user_type,
            },
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def change_status(
        self,
        user_id: str,
        payload: UserStatusChangeRequest,
    ) -> User:
        user = self._get_or_fail(user_id)
        previous_status = user.status

        user.status = payload.status
        self.db.flush()

        self.audit.updated(
            user,
            UserAuditEvent.USER_STATUS_CHANGED,
            resource_type="user",
            event_data={
                "previous_status": previous_status,
                "status": payload.status,
            },
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def change_password(
        self,
        user_id: str,
        payload: UserPasswordChangeRequest,
    ) -> User:
        user = self._get_or_fail(user_id)

        user.password_hash = hash_password(payload.new_password)
        user.password_changed_at = datetime.now(timezone.utc)

        self.db.flush()

        self.audit.updated(
            user,
            UserAuditEvent.USER_PASSWORD_CHANGED,
            resource_type="user",
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def soft_delete(self, user_id: str) -> User:
        user = self._get_or_fail(user_id)

        user.deleted_at = datetime.now(timezone.utc)
        user.status = "INACTIVE"

        self.db.flush()

        self.audit.deleted(
            user,
            UserAuditEvent.USER_DELETED,
            resource_type="user",
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def restore(self, user_id: str) -> User:
        user = self._get_or_fail(user_id)

        user.deleted_at = None
        user.status = "ACTIVE"

        self.db.flush()

        self.audit.updated(
            user,
            UserAuditEvent.USER_RESTORED,
            resource_type="user",
        )

        self.db.commit()
        self.db.refresh(user)

        return user

    def _create_uncommitted(self, payload: UserCreateRequest) -> User:
        email = str(payload.email).strip().lower()

        if self.repository.exists_by_email(email):
            raise ConflictException("El correo electrónico ya está registrado.")

        user = User(
            email=email,
            password_hash=hash_password(payload.password),
            first_name=payload.first_name.strip(),
            last_name=payload.last_name.strip(),
            phone=None,
            avatar_url=None,
            user_type=payload.user_type,
            status="ACTIVE",
            email_verified=False,
            email_verified_at=None,
        )

        return self.repository.add(user)

    def _get_or_fail(self, user_id: str) -> User:
        user = self.repository.get_by_id(user_id)

        if user is None:
            raise NotFoundException("Usuario no encontrado.")

        return user
