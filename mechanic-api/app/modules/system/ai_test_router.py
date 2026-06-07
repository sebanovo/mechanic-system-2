from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.common.responses import success_response
from app.core.ai.dispatcher import AIDispatcher
from app.core.ai.media import AIMediaPart
from app.modules.incident_ai_analysis.inputs import IncidentAIMultimodalInput

router = APIRouter(
    prefix="/system/ai",
    tags=["System AI"],
)


class AITestTextRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)


class AITestJsonRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)


class AITestMultimodalRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=20_000)
    input: IncidentAIMultimodalInput | None = None


@router.post("/test")
def test_ai_text(payload: AITestTextRequest) -> dict:
    result = AIDispatcher().generate_text(payload.prompt)

    return success_response(
        message="Respuesta IA generada correctamente.",
        data=result.model_dump(mode="json"),
    )


@router.post("/test-json")
def test_ai_json(payload: AITestJsonRequest) -> dict:
    result = AIDispatcher().generate_json(payload.prompt)

    return success_response(
        message="Respuesta JSON IA generada correctamente.",
        data=result.model_dump(mode="json"),
    )


@router.post("/test-multimodal")
def test_ai_multimodal(payload: AITestMultimodalRequest) -> dict:
    multimodal_input = payload.input or IncidentAIMultimodalInput()
    result = AIDispatcher().generate_json(
        payload.prompt,
        media=[
            AIMediaPart(
                kind=item.kind,
                filename=item.filename,
                mime_type=item.mime_type,
                size_bytes=item.size_bytes,
                content=item.content,
                url=item.url,
            )
            for item in multimodal_input.media
        ],
    )

    return success_response(
        message="Respuesta multimodal IA generada correctamente.",
        data={
            "prompt": payload.prompt,
            "input": multimodal_input.model_dump(mode="json"),
            "result": result.model_dump(mode="json"),
        },
    )
