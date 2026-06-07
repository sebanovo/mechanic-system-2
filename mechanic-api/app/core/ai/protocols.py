from __future__ import annotations

from typing import Protocol

from app.core.ai.media import AIMediaPart
from app.core.ai.schemas import AIJsonResult, AITextResult


class AIClient(Protocol):
    def generate_text(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AITextResult:
        """Generate plain text from a prompt."""

    def generate_json(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AIJsonResult:
        """Generate structured JSON from a prompt."""
