from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.user.mappers import user_public
from app.modules.identity.user.repository import UserRepository
from app.modules.identity.user.schemas import (
    UserCreateRequest,
    UserListData,
    UserPasswordChangeRequest,
    UserResponse,
    UsersResponse,
    UserStatusChangeRequest,
    UserTypeChangeRequest,
    UserUpdateRequest,
)
from app.modules.identity.user.service import UserService

router = APIRouter(prefix="/platform/users", tags=["Platform Users"])


def _user_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> UserService:
    return UserService(
        repository=UserRepository(db),
        context=context,
    )


@router.get("", response_model=UsersResponse)
def list_users(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
    pagination: PaginationParams = Depends(),
    email: str | None = Query(default=None),
    user_type: str | None = Query(default=None),
    status: str | None = Query(default=None),
    created_from: datetime | None = Query(default=None),
    created_to: datetime | None = Query(default=None),
) -> dict:
    users, total = service.list(
        email=email,
        user_type=user_type,
        status=status,
        created_from=created_from,
        created_to=created_to,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = UserListData(
        items=[user_public(user) for user in users],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Usuarios obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.get_or_fail(user_id)

    return success_response(
        message="Usuario obtenido correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.post("", response_model=UserResponse)
def create_user(
    payload: UserCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.create(payload)

    return success_response(
        message="Usuario creado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    payload: UserUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.update(user_id, payload)

    return success_response(
        message="Usuario actualizado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.patch("/{user_id}/type", response_model=UserResponse)
def change_user_type(
    user_id: str,
    payload: UserTypeChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.change_type(user_id, payload)

    return success_response(
        message="Tipo de usuario actualizado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.patch("/{user_id}/status", response_model=UserResponse)
def change_user_status(
    user_id: str,
    payload: UserStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.change_status(user_id, payload)

    return success_response(
        message="Estado de usuario actualizado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.patch("/{user_id}/password", response_model=UserResponse)
def change_user_password(
    user_id: str,
    payload: UserPasswordChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.change_password(user_id, payload)

    return success_response(
        message="Contraseña actualizada correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(
    user_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.soft_delete(user_id)

    return success_response(
        message="Usuario eliminado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )


@router.patch("/{user_id}/restore", response_model=UserResponse)
def restore_user(
    user_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: UserService = Depends(_user_service),
) -> dict:
    user = service.restore(user_id)

    return success_response(
        message="Usuario restaurado correctamente.",
        data=user_public(user).model_dump(mode="json"),
    )
