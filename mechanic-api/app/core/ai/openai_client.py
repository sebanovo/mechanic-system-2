from __future__ import annotations

import json
from typing import Any

from openai import OpenAI

from app.core.ai.exceptions import AIProviderNotConfiguredError, AIResponseError
from app.core.ai.media import AIMediaPart
from app.core.ai.schemas import AIJsonResult, AITextResult
from app.core.config import settings


class OpenAIClient:
    def __init__(self) -> None:
        if not settings.openai_api_key:
            raise AIProviderNotConfiguredError("OPENAI_API_KEY no está configurado.")

        self.client = OpenAI(
            api_key=settings.openai_api_key,
            timeout=settings.ai_timeout_seconds,
        )

    def generate_text(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AITextResult:
        model_name = settings.openai_model

        response = self.client.responses.create(
            model=model_name,
            input=self._build_input(prompt, media),
            temperature=settings.ai_default_temperature,
            max_output_tokens=settings.ai_default_max_output_tokens,
        )

        content = self._extract_text(response)

        return AITextResult(
            provider="OPENAI",
            model=model_name,
            content=content,
        )

    def generate_json(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AIJsonResult:
        model_name = settings.openai_json_model

        response = self.client.responses.create(
            model=model_name,
            input=self._build_input(
                "Responde únicamente con un objeto JSON válido. "
                "No uses markdown. No incluyas explicación.\n\n"
                f"{prompt}",
                media,
            ),
            temperature=settings.ai_default_temperature,
            max_output_tokens=settings.ai_default_max_output_tokens,
            text={
                "format": {
                    "type": "json_object",
                }
            },
        )

        content = self._extract_text(response)
        parsed = self._parse_json(content)

        return AIJsonResult(
            provider="OPENAI",
            model=model_name,
            content=parsed,
        )

    def _extract_text(self, response: Any) -> str:
        text = getattr(response, "output_text", None)

        if not text:
            raise AIResponseError("OpenAI no devolvió contenido de texto.")

        return str(text).strip()

    def _parse_json(self, content: str) -> dict[str, Any]:
        try:
            parsed = json.loads(content)
        except json.JSONDecodeError as exc:
            raise AIResponseError("OpenAI no devolvió JSON válido.") from exc

        if not isinstance(parsed, dict):
            raise AIResponseError("OpenAI devolvió JSON, pero no es un objeto.")

        return parsed

    def _build_input(
        self,
        prompt: str,
        media: list[AIMediaPart] | None,
    ) -> Any:
        if not media:
            return prompt

        content: list[dict[str, Any]] = [{"type": "input_text", "text": prompt}]

        for item in media:
            if item.kind == "IMAGE" and (item.data_url or item.url):
                content.append(
                    {
                        "type": "input_image",
                        "image_url": item.data_url or item.url,
                    }
                )
                continue

            if item.content:
                content.append(
                    {
                        "type": "input_text",
                        "text": f"[{item.kind}] {item.filename or 'adjunto'}: {item.content}",
                    }
                )
                continue

            if item.url:
                content.append(
                    {
                        "type": "input_text",
                        "text": (
                            f"[{item.kind}] {item.filename or 'adjunto'} disponible en: {item.url}"
                        ),
                    }
                )

        return [
            {
                "role": "user",
                "content": content,
            }
        ]
