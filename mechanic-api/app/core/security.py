from __future__ import annotations

import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import Response
from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_access_token(
    subject: str,
    *,
    extra_claims: dict[str, Any] | None = None,
) -> tuple[str, datetime]:
    issued_at = datetime.now(timezone.utc)
    expires_at = issued_at + timedelta(minutes=settings.access_token_expire_minutes)

    payload: dict[str, Any] = {
        "sub": subject,
        "type": "access",
        "iat": issued_at,
        "exp": expires_at,
    }

    if extra_claims:
        payload.update(extra_claims)

    token = jwt.encode(
        payload,
        settings.secret_key,
        algorithm=settings.jwt_algorithm,
    )

    return token, expires_at


def decode_token(token: str) -> dict[str, Any]:
    return jwt.decode(
        token,
        settings.secret_key,
        algorithms=[settings.jwt_algorithm],
    )


def generate_refresh_token() -> str:
    return secrets.token_urlsafe(64)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def refresh_token_expires_at() -> datetime:
    return datetime.now(timezone.utc) + timedelta(
        minutes=settings.refresh_token_expire_minutes,
    )


def session_expires_at() -> datetime:
    return datetime.now(timezone.utc) + timedelta(
        minutes=settings.session_expire_minutes,
    )


def set_auth_cookies(
    response: Response,
    *,
    access_token: str,
    refresh_token: str,
) -> None:
    response.set_cookie(
        key=settings.access_cookie_name,
        value=access_token,
        httponly=settings.cookie_http_only,
        secure=settings.cookie_secure,
        samesite=settings.cookie_same_site,
        domain=settings.cookie_domain or None,
        path=settings.cookie_path,
        max_age=settings.access_token_expire_minutes * 60,
    )

    response.set_cookie(
        key=settings.refresh_cookie_name,
        value=refresh_token,
        httponly=settings.cookie_http_only,
        secure=settings.cookie_secure,
        samesite=settings.cookie_same_site,
        domain=settings.cookie_domain or None,
        path=settings.cookie_path,
        max_age=settings.refresh_token_expire_minutes * 60,
    )


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(
        key=settings.access_cookie_name,
        domain=settings.cookie_domain or None,
        path=settings.cookie_path,
    )

    response.delete_cookie(
        key=settings.refresh_cookie_name,
        domain=settings.cookie_domain or None,
        path=settings.cookie_path,
    )