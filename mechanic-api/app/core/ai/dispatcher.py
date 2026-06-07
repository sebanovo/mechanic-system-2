from __future__ import annotations

from app.core.ai.exceptions import (
    AIProviderDisabledError,
    AIProviderNotSupportedError,
)
from app.core.ai.media import AIMediaPart
from app.core.ai.gemini_client import GeminiClient
from app.core.ai.openai_client import OpenAIClient
from app.core.ai.protocols import AIClient
from app.core.ai.schemas import AIJsonResult, AITextResult
from app.core.config import settings


class AIDispatcher:
    def __init__(self) -> None:
        self.client = self._build_client()

    def generate_text(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AITextResult:
        return self.client.generate_text(prompt, media=media)

    def generate_json(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AIJsonResult:
        return self.client.generate_json(prompt, media=media)

    def _build_client(self) -> AIClient:
        if not settings.ai_enabled:
            raise AIProviderDisabledError("La IA está deshabilitada.")

        if settings.ai_provider == "GEMINI":
            return GeminiClient()

        if settings.ai_provider == "OPENAI":
            return OpenAIClient()

        raise AIProviderNotSupportedError(
            f"Proveedor IA no soportado: {settings.ai_provider}"
        )
