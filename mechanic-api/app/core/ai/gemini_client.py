from __future__ import annotations

import base64
import json
import logging
import re
from typing import Any

from google import genai
from google.genai import types

from app.core.ai.exceptions import AIProviderNotConfiguredError, AIResponseError
from app.core.ai.media import AIMediaPart
from app.core.ai.schemas import AIJsonResult, AITextResult
from app.core.config import settings

logger = logging.getLogger(__name__)


class GeminiClient:
    def __init__(self) -> None:
        if not settings.gemini_api_key:
            raise AIProviderNotConfiguredError("GEMINI_API_KEY no está configurado.")

        self.client = genai.Client(api_key=settings.gemini_api_key)

    def generate_text(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AITextResult:
        model_name = settings.gemini_model

        try:
            response = self.client.models.generate_content(
                model=model_name,
                contents=self._build_contents(prompt, media),
                config=types.GenerateContentConfig(
                    temperature=settings.ai_default_temperature,
                    max_output_tokens=settings.ai_default_max_output_tokens,
                ),
            )
        except Exception as exc:
            raise AIResponseError(f"Error al consultar Gemini: {exc}") from exc

        content = self._extract_text(response)

        return AITextResult(
            provider="GEMINI",
            model=model_name,
            content=content,
        )

    def generate_json(
        self,
        prompt: str,
        media: list[AIMediaPart] | None = None,
    ) -> AIJsonResult:
        model_name = settings.gemini_json_model or settings.gemini_model
        max_output_tokens = max(settings.ai_default_max_output_tokens, 4096)

        json_prompt = (
            "Responde únicamente con un objeto JSON válido. "
            "No uses markdown. "
            "No incluyas explicación. "
            "No devuelvas texto fuera del JSON. "
            "Usa strings cortos.\n\n"
            f"{prompt}"
        )

        try:
            response = self.client.models.generate_content(
                model=model_name,
                contents=self._build_contents(json_prompt, media),
                config=types.GenerateContentConfig(
                    temperature=0,
                    max_output_tokens=max_output_tokens,
                    response_mime_type="application/json",
                ),
            )
        except Exception as exc:
            raise AIResponseError(f"Error al consultar Gemini: {exc}") from exc

        content = self._extract_text(response)
        parsed = self._parse_json(content)

        return AIJsonResult(
            provider="GEMINI",
            model=model_name,
            content=parsed,
        )

    def _extract_text(self, response: Any) -> str:
        text = getattr(response, "text", None)

        if not text:
            logger.error("Gemini respondió sin texto. Response=%s", response)
            raise AIResponseError("Gemini no devolvió contenido de texto.")

        return str(text).strip()

    def _parse_json(self, content: str) -> dict[str, Any]:
        normalized_content = self._normalize_json_content(content)

        try:
            parsed = json.loads(normalized_content)
        except json.JSONDecodeError as exc:
            logger.error("Gemini JSON inválido recibido: %s", content)
            raise AIResponseError("Gemini no devolvió JSON válido.") from exc

        if not isinstance(parsed, dict):
            logger.error("Gemini devolvió JSON no objeto: %s", parsed)
            raise AIResponseError("Gemini devolvió JSON, pero no es un objeto.")

        return parsed

    def _normalize_json_content(self, content: str) -> str:
        normalized = content.strip()

        if normalized.startswith("```"):
            normalized = re.sub(r"^```(?:json)?\s*", "", normalized, flags=re.IGNORECASE)
            normalized = re.sub(r"\s*```$", "", normalized)
            normalized = normalized.strip()

        start = normalized.find("{")
        end = normalized.rfind("}")

        if start != -1 and end != -1 and end > start:
            normalized = normalized[start : end + 1]

        normalized = re.sub(r",(\s*[}\]])", r"\1", normalized)

        return normalized

    def _build_contents(
        self,
        prompt: str,
        media: list[AIMediaPart] | None,
    ) -> list[Any]:
        contents: list[Any] = [prompt]

        if not media:
            return contents

        for item in media:
            if item.data_url and item.mime_type:
                try:
                    raw_bytes = self._data_url_to_bytes(item.data_url)
                    if raw_bytes is not None and hasattr(types.Part, "from_bytes"):
                        try:
                            contents.append(
                                types.Part.from_bytes(
                                    data=raw_bytes,
                                    mime_type=item.mime_type,
                                )
                            )
                            continue
                        except TypeError:
                            contents.append(
                                types.Part.from_bytes(
                                    raw_bytes,
                                    item.mime_type,
                                )
                            )
                            continue
                except Exception:
                    logger.exception(
                        "No se pudo adjuntar el media inline para Gemini: %s",
                        item.filename or item.mime_type,
                    )

            if item.url and item.mime_type:
                try:
                    contents.append(
                        types.Part.from_uri(
                            file_uri=item.url,
                            mime_type=item.mime_type,
                        )
                    )
                    continue
                except Exception:
                    logger.exception(
                        "No se pudo adjuntar el recurso multimodal para Gemini: %s",
                        item.url,
                    )

            if item.content:
                contents.append(
                    f"[{item.kind}] {item.filename or 'adjunto'}: {item.content}"
                )

        return contents

    def _data_url_to_bytes(self, data_url: str) -> bytes | None:
        if not data_url.startswith("data:"):
            return None

        try:
            _, encoded = data_url.split(",", 1)
        except ValueError:
            return None

        try:
            return base64.b64decode(encoded)
        except Exception:
            return None
