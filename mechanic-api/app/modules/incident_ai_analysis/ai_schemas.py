from __future__ import annotations

from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field, field_validator


AISeverity = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
AIPriority = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]


class AIServiceCatalogOption(BaseModel):
    service_code: str = Field(min_length=1, max_length=100)
    service_name: str = Field(min_length=1, max_length=150)
    category: str | None = Field(default=None, max_length=80)
    description: str | None = Field(default=None, max_length=1000)
    min_price: Decimal | None = Field(default=None, ge=0)
    max_price: Decimal | None = Field(default=None, ge=0)
    min_duration_minutes: int | None = Field(default=None, ge=0)
    max_duration_minutes: int | None = Field(default=None, ge=0)

    @field_validator("service_code", "service_name", "category", "description")
    @classmethod
    def normalize_optional_text(cls, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None


class IncidentAIAnalysisResult(BaseModel):
    suggested_title: str | None = Field(default=None, max_length=150)
    suggested_address_text: str | None = Field(default=None, max_length=500)
    detected_problem: str = Field(min_length=1, max_length=255)
    detected_service_category: str = Field(min_length=1, max_length=100)
    probable_service_code: str = Field(min_length=1, max_length=100)
    severity: AISeverity
    priority: AIPriority
    confidence: float = Field(ge=0, le=1)
    estimated_min_price: Decimal | None = Field(default=None, ge=0)
    estimated_max_price: Decimal | None = Field(default=None, ge=0)
    estimated_min_duration_minutes: int | None = Field(default=None, ge=0)
    estimated_max_duration_minutes: int | None = Field(default=None, ge=0)
    summary: str = Field(min_length=1, max_length=1000)
    recommended_actions: list[str] = Field(default_factory=list, max_length=10)
    risk_notes: list[str] = Field(default_factory=list, max_length=10)

    @field_validator("probable_service_code", "detected_service_category")
    @classmethod
    def normalize_category(cls, value: str) -> str:
        return value.strip().upper().replace(" ", "_")

    @field_validator("suggested_title", "suggested_address_text")
    @classmethod
    def normalize_optional_text(cls, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    @field_validator("recommended_actions", "risk_notes")
    @classmethod
    def clean_text_list(cls, values: list[str]) -> list[str]:
        cleaned: list[str] = []

        for value in values:
            normalized = value.strip()
            if normalized:
                cleaned.append(normalized[:300])

        return cleaned
