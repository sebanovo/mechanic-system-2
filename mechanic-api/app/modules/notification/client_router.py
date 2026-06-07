from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.notification.mappers import notification_public
from app.modules.notification.repository import NotificationRepository
from app.modules.notification.schemas import (
    NotificationBulkActionData,
    NotificationBulkActionResponse,
    NotificationListData,
    NotificationResponse,
    NotificationsResponse,
)
from app.modules.notification.service import NotificationService

router = APIRouter(prefix="/notifications", tags=["Notifications"])


def _notification_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> NotificationService:
    return NotificationService(
        repository=NotificationRepository(db),
        context=context,
    )


@router.get("", response_model=NotificationsResponse)
def list_my_notifications(
    identity: CurrentIdentity = Depends(
        require_user_types("SUPERADMIN", "TENANT_OWNER", "TECHNICIAN", "CLIENT")
    ),
    service: NotificationService = Depends(_notification_service),
    pagination: PaginationParams = Depends(),
    status: str | None = Query(default=None),
) -> dict:
    notifications, total = service.list_current_user(
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = NotificationListData(
        items=[notification_public(notification) for notification in notifications],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Notificaciones obtenidas correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
def mark_my_notification_as_read(
    notification_id: str,
    identity: CurrentIdentity = Depends(
        require_user_types("SUPERADMIN", "TENANT_OWNER", "TECHNICIAN", "CLIENT")
    ),
    service: NotificationService = Depends(_notification_service),
) -> dict:
    notification = service.mark_as_read(notification_id)

    return success_response(
        message="Notificación marcada como leída correctamente.",
        data=notification_public(notification).model_dump(mode="json"),
    )


@router.patch("/read-all", response_model=NotificationBulkActionResponse)
def mark_all_my_notifications_as_read(
    identity: CurrentIdentity = Depends(
        require_user_types("SUPERADMIN", "TENANT_OWNER", "TECHNICIAN", "CLIENT")
    ),
    service: NotificationService = Depends(_notification_service),
) -> dict:
    updated_count = service.mark_all_as_read()

    return success_response(
        message="Notificaciones marcadas como leídas correctamente.",
        data=NotificationBulkActionData(updated_count=updated_count).model_dump(mode="json"),
    )
