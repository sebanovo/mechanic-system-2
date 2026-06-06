from __future__ import annotations

from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.orm import Session

from app.common.exceptions import UnauthorizedException
from app.common.responses import success_response
from app.core.config import settings
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.core.security import clear_auth_cookies, set_auth_cookies
from app.modules.identity.auth.authorization import (
    CurrentIdentity,
    get_current_identity,
)
from app.modules.identity.auth.schemas import (
    AuthResponse,
    LoginRequest,
    MeResponse,
    LogoutResponse,
    RefreshRequest,
    RegisterClientRequest,
    RegisterTenantRequest,
    SelectTenantRequest,
)
from app.modules.identity.auth.service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


def _auth_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> AuthService:
    return AuthService(db=db, context=context)


def _set_cookies_if_tokens(response: Response, auth) -> None:
    if auth.tokens is None:
        return

    set_auth_cookies(
        response,
        access_token=auth.tokens.access_token,
        refresh_token=auth.tokens.refresh_token,
    )


@router.post("/register-client", response_model=AuthResponse)
def register_client(
    payload: RegisterClientRequest,
    response: Response,
    service: AuthService = Depends(_auth_service),
) -> dict:
    auth = service.register_client(payload)
    _set_cookies_if_tokens(response, auth)

    return success_response(
        message="Cliente creado correctamente.",
        data=auth.model_dump(mode="json"),
    )


@router.post("/register-tenant", response_model=AuthResponse)
def register_tenant(
    payload: RegisterTenantRequest,
    response: Response,
    service: AuthService = Depends(_auth_service),
) -> dict:
    auth = service.register_tenant(payload)
    _set_cookies_if_tokens(response, auth)

    return success_response(
        message="Tenant creado correctamente.",
        data=auth.model_dump(mode="json"),
    )


@router.post("/login", response_model=AuthResponse)
def login(
    payload: LoginRequest,
    response: Response,
    service: AuthService = Depends(_auth_service),
) -> dict:
    auth = service.login(payload)
    _set_cookies_if_tokens(response, auth)

    return success_response(
        message="Inicio de sesión exitoso.",
        data=auth.model_dump(mode="json"),
    )


@router.post("/select-tenant", response_model=AuthResponse)
def select_tenant(
    payload: SelectTenantRequest,
    response: Response,
    identity: CurrentIdentity = Depends(get_current_identity),
    service: AuthService = Depends(_auth_service),
) -> dict:
    auth = service.select_tenant(
        user=identity.user,
        session=identity.session,
        payload=payload,
    )
    _set_cookies_if_tokens(response, auth)

    return success_response(
        message="Tenant seleccionado correctamente.",
        data=auth.model_dump(mode="json"),
    )


@router.post("/refresh", response_model=AuthResponse)
def refresh(
    payload: RefreshRequest,
    request: Request,
    response: Response,
    service: AuthService = Depends(_auth_service),
) -> dict:
    raw_refresh_token = payload.refresh_token or request.cookies.get(
        settings.refresh_cookie_name
    )

    if raw_refresh_token is None:
        raise UnauthorizedException("Refresh token requerido.")

    auth = service.refresh(raw_refresh_token)
    _set_cookies_if_tokens(response, auth)

    return success_response(
        message="Sesión renovada correctamente.",
        data=auth.model_dump(mode="json"),
    )


@router.post("/logout", response_model=LogoutResponse)
def logout(
    response: Response,
    identity: CurrentIdentity = Depends(get_current_identity),
    service: AuthService = Depends(_auth_service),
) -> dict:
    service.logout(identity.session)
    clear_auth_cookies(response)

    return success_response(
        message="Sesión cerrada correctamente.",
        data={},
    )


@router.get("/me", response_model=MeResponse)
def me(
    identity: CurrentIdentity = Depends(get_current_identity),
    service: AuthService = Depends(_auth_service),
) -> dict:
    auth = service.me(identity.user, identity.session)

    return success_response(
        message="Perfil obtenido correctamente.",
        data=auth.model_dump(mode="json"),
    )
