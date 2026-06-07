from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.common.responses import success_response
from app.core.notifications.dispatcher import NotificationDispatcher
from app.core.notifications.schemas import PushNotificationPayload


router = APIRouter(
    prefix="/notifications",
    tags=["System"],
)


class PushTestRequest(BaseModel):
    token: str = Field(min_length=1)
    title: str = Field(default="Prueba de notificación")
    body: str = Field(default="Firebase está funcionando correctamente.")
    data: dict[str, str] = Field(default_factory=dict)


@router.post("/test-push")
def test_push_notification(payload: PushTestRequest) -> dict:
    message_id = NotificationDispatcher().send_push(
        PushNotificationPayload(
            token=payload.token,
            title=payload.title,
            body=payload.body,
            data=payload.data,
        )
    )

    return success_response(
        message="Notificación enviada correctamente.",
        data={
            "message_id": message_id,
        },
    )
