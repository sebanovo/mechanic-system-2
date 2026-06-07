from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.common.pagination import PaginationMeta

IncidentRecommendedPriority = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]


class IncidentAiAnalysisCreateRequest(BaseModel):
    analysis_version: str = Field(min_length=1, max_length=50)
    probable_service_code: str | None = Field(default=None, max_length=100)
    probable_problem: str | None = None
    confidence_score: Decimal | None = Field(default=None, ge=0, le=100)
    estimated_min_price: Decimal | None = Field(default=None, ge=0)
    estimated_max_price: Decimal | None = Field(default=None, ge=0)
    estimated_min_duration_minutes: int | None = Field(default=None, gt=0)
    estimated_max_duration_minutes: int | None = Field(default=None, gt=0)
    recommended_priority: IncidentRecommendedPriority | None = None
    analysis_result: dict[str, Any] | None = None

    @model_validator(mode="after")
    def validate_ranges(self) -> "IncidentAiAnalysisCreateRequest":
        if (
            self.estimated_min_price is not None
            and self.estimated_max_price is not None
            and self.estimated_max_price < self.estimated_min_price
        ):
            raise ValueError("El precio máximo estimado no puede ser menor al precio mínimo estimado.")

        if (
            self.estimated_min_duration_minutes is not None
            and self.estimated_max_duration_minutes is not None
            and self.estimated_max_duration_minutes < self.estimated_min_duration_minutes
        ):
            raise ValueError("La duración máxima estimada no puede ser menor a la duración mínima estimada.")

        return self

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "analysis_version": "v1",
                "probable_service_code": "BATTERY_ASSISTANCE",
                "probable_problem": "Posible descarga de batería.",
                "confidence_score": 87.5,
                "estimated_min_price": 50,
                "estimated_max_price": 120,
                "estimated_min_duration_minutes": 20,
                "estimated_max_duration_minutes": 45,
                "recommended_priority": "MEDIUM",
                "analysis_result": {
                    "symptoms": ["no enciende", "luces débiles"],
                    "source": "rule_engine",
                },
            }
        }
    )


class IncidentAiAnalysisPublic(BaseModel):
    id: str
    incident_id: str
    analysis_version: str
    probable_service_code: str | None = None
    probable_problem: str | None = None
    confidence_score: Decimal | None = None
    estimated_min_price: Decimal | None = None
    estimated_max_price: Decimal | None = None
    estimated_min_duration_minutes: int | None = None
    estimated_max_duration_minutes: int | None = None
    recommended_priority: IncidentRecommendedPriority | None = None
    analysis_result: dict[str, Any] | None = None
    created_at: datetime
    updated_at: datetime


class IncidentAiAnalysisListData(BaseModel):
    items: list[IncidentAiAnalysisPublic]
    pagination: PaginationMeta


class IncidentAiAnalysisResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentAiAnalysisPublic


class IncidentAiAnalysesResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentAiAnalysisListData