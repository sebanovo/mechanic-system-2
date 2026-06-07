from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.notification.mappers import notification_public
from app.modules.notification.repository import NotificationRepository
from app.modules.notification.schemas import (
    NotificationCreateRequest,
    NotificationResponse,
)
from app.modules.notification.service import NotificationService

router = APIRouter(prefix="/platform/notifications", tags=["Platform Notifications"])


def _notification_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> NotificationService:
    return NotificationService(
        repository=NotificationRepository(db),
        context=context,
    )


@router.post("/test-push", response_model=NotificationResponse)
def send_test_push_notification(
    payload: NotificationCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: NotificationService = Depends(_notification_service),
) -> dict:
    notification = service.create_and_send(payload)

    return success_response(
        message="Notificación enviada correctamente.",
        data=notification_public(notification).model_dump(mode="json"),
    )
