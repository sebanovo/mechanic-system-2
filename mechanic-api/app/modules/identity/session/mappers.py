from __future__ import annotations

from app.modules.identity.session.models import RefreshToken, UserSession
from app.modules.identity.session.schemas import RefreshTokenPublic, SessionPublic


def session_public(session: UserSession) -> SessionPublic:
    return SessionPublic(
        id=str(session.id),
        user_id=str(session.user_id),
        tenant_id=str(session.tenant_id) if session.tenant_id is not None else None,
        session_status=session.session_status,  # type: ignore[arg-type]
        device_type=session.device_type,
        device_name=session.device_name,
        ip_address=session.ip_address,
        user_agent=session.user_agent,
        login_at=session.login_at,
        last_activity_at=session.last_activity_at,
        expires_at=session.expires_at,
        revoked_at=session.revoked_at,
        created_at=session.created_at,
        updated_at=session.updated_at,
    )


def refresh_token_public(refresh_token: RefreshToken) -> RefreshTokenPublic:
    return RefreshTokenPublic(
        id=str(refresh_token.id),
        session_id=str(refresh_token.session_id),
        token_family=str(refresh_token.token_family),
        status=refresh_token.status,  # type: ignore[arg-type]
        issued_at=refresh_token.issued_at,
        expires_at=refresh_token.expires_at,
        used_at=refresh_token.used_at,
        revoked_at=refresh_token.revoked_at,
        created_at=refresh_token.created_at,
        updated_at=refresh_token.updated_at,
    )