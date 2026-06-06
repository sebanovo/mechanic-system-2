from __future__ import annotations

from app.modules.identity.user.models import User
from app.modules.identity.user.schemas import UserPublic


def user_public(user: User) -> UserPublic:
    return UserPublic(
        id=str(user.id),
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        avatar_url=user.avatar_url,
        user_type=user.user_type,  # type: ignore[arg-type]
        status=user.status,  # type: ignore[arg-type]
        email_verified=user.email_verified,
        email_verified_at=user.email_verified_at,
        last_login_at=user.last_login_at,
        password_changed_at=user.password_changed_at,
        created_at=user.created_at,
        updated_at=user.updated_at,
        deleted_at=user.deleted_at,
    )