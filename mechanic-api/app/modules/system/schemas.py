from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class HealthPayload(BaseModel):
    status: str
    service: str


class ReadinessPayload(BaseModel):
    status: str
    database: str


class InfoPayload(BaseModel):
    app_name: str
    version: str
    environment: str


class SuccessEnvelope(BaseModel):
    success: bool = True
    message: str
    data: object | None = None

    model_config = ConfigDict(from_attributes=True)


class HealthResponse(SuccessEnvelope):
    data: HealthPayload | None = None


class ReadinessResponse(SuccessEnvelope):
    data: ReadinessPayload | None = None


class InfoResponse(SuccessEnvelope):
    data: InfoPayload | None = None

