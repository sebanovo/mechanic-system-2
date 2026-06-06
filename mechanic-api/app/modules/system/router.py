from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.common.exceptions import InfrastructureException
from app.common.openapi import STANDARD_ERROR_RESPONSES
from app.common.responses import success_response
from app.core.config import settings
from app.core.database import get_db
from app.modules.system.schemas import (
    HealthPayload,
    HealthResponse,
    InfoPayload,
    InfoResponse,
    ReadinessPayload,
    ReadinessResponse,
)

router = APIRouter(prefix="/system", tags=["System"], responses=STANDARD_ERROR_RESPONSES)


@router.get("/health", response_model=HealthResponse)
def health() -> dict:
    return success_response(
        message="Sistema operativo.",
        data=HealthPayload(status="ok", service=settings.app_name).model_dump(mode="json"),
    )


@router.get("/readiness", response_model=ReadinessResponse)
def readiness(db: Session = Depends(get_db)) -> dict:
    try:
        db.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        raise InfrastructureException("La base de datos no está lista.") from exc

    return success_response(
        message="Sistema listo.",
        data=ReadinessPayload(status="ready", database="ok").model_dump(mode="json"),
    )


@router.get("/info", response_model=InfoResponse)
def info() -> dict:
    return success_response(
        message="Información del sistema obtenida correctamente.",
        data=InfoPayload(
            app_name=settings.app_name,
            version=settings.app_version,
            environment=settings.env_mode,
        ).model_dump(mode="json"),
    )
