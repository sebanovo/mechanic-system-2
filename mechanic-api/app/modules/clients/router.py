from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.clients.service import ClientService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.user.mappers import user_public
from app.modules.identity.user.repository import UserRepository
from app.modules.identity.user.schemas import UserPublic, UserUpdateRequest

router = APIRouter(prefix="/clients", tags=["Clients"])


class ClientPasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=128)


class ClientResponse(BaseModel):
    success: bool = True
    message: str
    data: UserPublic


class ClientPasswordChangeResponse(BaseModel):
    success: bool = True
    message: str
    data: dict[str, object] = Field(default_factory=dict)


def _client_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ClientService:
    return ClientService(
        repository=UserRepository(db),
        context=context,
    )


@router.get("/me", response_model=ClientResponse)
def me(identity: CurrentIdentity = Depends(require_user_types("CLIENT"))) -> dict:
    return success_response(
        message="Perfil obtenido correctamente.",
        data=user_public(identity.user).model_dump(mode="json"),
    )


@router.put("/me", response_model=ClientResponse)
def update_me(
    payload: UserUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: ClientService = Depends(_client_service),
) -> dict:
    user = service.update_current_profile(payload)

    return success_response(
        message="Perfil actualizado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.patch("/me/password", response_model=ClientPasswordChangeResponse)
def change_password(
    payload: ClientPasswordChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: ClientService = Depends(_client_service),
) -> dict:
    service.change_current_password(
        current_password=payload.current_password,
        new_password=payload.new_password,
    )

    return success_response(
        message="Contraseña actualizada correctamente.",
        data={},
    )
