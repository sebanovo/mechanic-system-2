from __future__ import annotations

from pathlib import Path

import firebase_admin
from firebase_admin import credentials, messaging

from app.core.config import settings
from app.core.notifications.schemas import PushNotificationPayload


class FirebasePushClient:
    def __init__(self) -> None:
        self._initialize_app()

    def send(self, payload: PushNotificationPayload) -> str:
        message = messaging.Message(
            data=payload.data,
            token=payload.token,
        )

        return messaging.send(message)

    def _initialize_app(self) -> None:
        if firebase_admin._apps:
            return

        credentials_path = Path(settings.firebase_credentials_path)

        if not credentials_path.exists():
            raise RuntimeError(
                f"No se encontró el archivo de credenciales Firebase: {credentials_path}"
            )

        credential = credentials.Certificate(str(credentials_path))
        options: dict[str, str] = {}

        if settings.firebase_project_id:
            options["projectId"] = settings.firebase_project_id

        firebase_admin.initialize_app(credential, options)
