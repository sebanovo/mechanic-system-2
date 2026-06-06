from __future__ import annotations

from sqlalchemy import select

from app.bootstrap.seeds.data.users import PLATFORM_ADMIN_USER
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.modules.identity.user.models import User


def load_platform_admin() -> None:
    with SessionLocal() as session:
        existing = session.scalar(
            select(User).where(User.email == PLATFORM_ADMIN_USER["email"])
        )
        if existing is not None:
            return

        user = User(
            email=PLATFORM_ADMIN_USER["email"],
            password_hash=hash_password(PLATFORM_ADMIN_USER["password"]),
            first_name=PLATFORM_ADMIN_USER["first_name"],
            last_name=PLATFORM_ADMIN_USER["last_name"],
            phone=PLATFORM_ADMIN_USER["phone"],
            user_type=PLATFORM_ADMIN_USER["user_type"],
            status="ACTIVE",
            email_verified=True,
        )
        session.add(user)
        session.commit()

