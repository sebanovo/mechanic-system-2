from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field

AIProvider = Literal["GEMINI", "OPENAI"]


class AITextRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)


class AIJsonRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)


class AITextResult(BaseModel):
    provider: AIProvider
    model: str
    content: str


class AIJsonResult(BaseModel):
    provider: AIProvider
    model: str
    content: dict[str, Any]