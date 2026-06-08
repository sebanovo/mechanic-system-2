from __future__ import annotations

from pydantic import BaseModel, Field


class PushNotificationPayload(BaseModel):
    token: str = Field(min_length=1)
    data: dict[str, str] = Field(default_factory=dict)
