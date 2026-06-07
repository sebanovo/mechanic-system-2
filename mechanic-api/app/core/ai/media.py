from __future__ import annotations

import base64
from typing import Literal, Sequence

from fastapi import UploadFile
from pydantic import BaseModel, Field, field_validator


AIMediaKind = Literal["TEXT", "IMAGE", "AUDIO", "VIDEO", "PDF"]


class AIMediaInput(BaseModel):
    kind: AIMediaKind
    filename: str | None = Field(default=None, max_length=255)
    mime_type: str | None = Field(default=None, max_length=100)
    size_bytes: int | None = Field(default=None, ge=0)
    content: str | None = Field(default=None, max_length=20_000)
    url: str | None = Field(default=None, max_length=2_000)
    data_url: str | None = Field(default=None, max_length=200_000)

    @field_validator("kind")
    @classmethod
    def normalize_kind(cls, value: str) -> str:
        return value.strip().upper()

    @field_validator("filename", "mime_type", "content", "url", "data_url")
    @classmethod
    def normalize_optional_text(cls, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None


# Backward compatibility for the previous name used across the AI layer.
AIMediaPart = AIMediaInput


async def build_ai_media_inputs(
    files: Sequence[UploadFile] | None,
) -> list[AIMediaInput]:
    if not files:
        return []

    media: list[AIMediaInput] = []

    for upload in files:
        data = await upload.read()
        mime_type = upload.content_type or "application/octet-stream"
        kind = _detect_kind(mime_type)
        size_bytes = len(data)
        filename = upload.filename
        content = _extract_text_preview(data, mime_type)
        data_url = _build_data_url(data, mime_type) if kind == "IMAGE" else None

        media.append(
            AIMediaInput(
                kind=kind,
                filename=filename,
                mime_type=mime_type,
                size_bytes=size_bytes,
                content=content,
                url=data_url,
                data_url=data_url,
            )
        )

    return media


def _detect_kind(mime_type: str) -> AIMediaKind:
    normalized = mime_type.lower()

    if normalized.startswith("image/"):
        return "IMAGE"

    if normalized.startswith("audio/"):
        return "AUDIO"

    if normalized.startswith("video/"):
        return "VIDEO"

    if normalized in {"application/pdf"}:
        return "PDF"

    return "TEXT"


def _extract_text_preview(data: bytes, mime_type: str) -> str | None:
    normalized = mime_type.lower()

    if normalized.startswith("text/") or normalized in {
        "application/json",
        "application/xml",
        "application/x-yaml",
        "application/yaml",
    }:
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            text = data.decode("utf-8", errors="replace")

        preview = text.strip()
        return preview[:20_000] if preview else None

    if not data:
        return None

    preview = base64.b64encode(data[:4096]).decode("ascii")
    return f"binary_base64_preview:{preview}"


def _build_data_url(data: bytes, mime_type: str) -> str:
    encoded = base64.b64encode(data).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"
