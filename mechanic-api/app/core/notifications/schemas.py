from __future__ import annotations

from pydantic import BaseModel, Field


class PushNotificationPayload(BaseModel):
    token: str = Field(min_length=1)
    title: str = Field(min_length=1, max_length=120)
    body: str = Field(min_length=1, max_length=500)
    data: dict[str, str] = Field(default_factory=dict)
