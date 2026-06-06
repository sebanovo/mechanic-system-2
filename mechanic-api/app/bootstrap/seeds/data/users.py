from __future__ import annotations

from app.core.config import settings

PLATFORM_ADMIN_USER = {
    "email": settings.initial_platform_admin_email,
    "password": settings.initial_platform_admin_password,
    "first_name": settings.initial_platform_admin_first_name,
    "last_name": settings.initial_platform_admin_last_name,
    "phone": settings.initial_platform_admin_phone,
    "user_type": "SUPERADMIN",
}

