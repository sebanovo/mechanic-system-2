from __future__ import annotations

from pydantic import BaseModel, Field, field_validator

from app.core.ai.media import AIMediaInput
from app.modules.incident_ai_analysis.ai_schemas import AIServiceCatalogOption


class IncidentAIMultimodalInput(BaseModel):
    text: str | None = Field(default=None, max_length=20_000)
    media: list[AIMediaInput] = Field(default_factory=list, max_length=20)
    service_catalogs: list[AIServiceCatalogOption] = Field(default_factory=list, max_length=200)

    @field_validator("text")
    @classmethod
    def normalize_text(cls, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    @field_validator("media", "service_catalogs")
    @classmethod
    def compact_lists(cls, values: list[BaseModel]) -> list[BaseModel]:
        return [value for value in values if value is not None]
