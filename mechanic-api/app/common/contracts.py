from __future__ import annotations

from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ConfigDict

from app.common.enums import ErrorCode
from app.common.pagination import PaginatedData, PaginationMeta

DataT = TypeVar("DataT")


class ResponseMeta(BaseModel):
    request_id: str | None = None


class ValidationErrorDetail(BaseModel):
    field: str
    message: str


class ResponseEnvelope(BaseModel):
    success: bool = True
    message: str
    meta: ResponseMeta | None = None


class ApiResponse(BaseModel, Generic[DataT]):
    success: bool = True
    message: str
    data: DataT | None = None
    meta: ResponseMeta | None = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Operación realizada correctamente.",
                "data": {"id": "uuid-value"},
                "meta": {"request_id": "req_01HZX9Y9K2"},
            }
        }
    )


class PaginatedResponse(BaseModel, Generic[DataT]):
    success: bool = True
    message: str
    data: PaginatedData[DataT]
    meta: ResponseMeta | None = None


class ErrorBody(BaseModel):
    code: ErrorCode
    details: list[ValidationErrorDetail] | None = None


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error: ErrorBody
    meta: ResponseMeta | None = None


class RootPayload(BaseModel):
    app_name: str
    version: str
    environment: str
    docs_enabled: bool
    docs_url: str | None = None
    health_url: str
    readiness_url: str
    info_url: str
    auth_base_url: str
    clients_base_url: str
    tenants_base_url: str
    platform_base_url: str


class RootResponse(ApiResponse[RootPayload]):
    pass


ERROR_EXAMPLES: dict[int, dict[str, Any]] = {
    400: {
        "success": False,
        "message": "Solicitud inválida.",
        "error": {
            "code": ErrorCode.APP_ERROR.value,
            "details": [
                {
                    "field": "body",
                    "message": "Revisa que el JSON esté bien escrito, sin comas finales y con claves entre comillas dobles.",
                }
            ],
        },
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    401: {
        "success": False,
        "message": "Se requiere autenticación.",
        "error": {"code": ErrorCode.UNAUTHORIZED.value},
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    403: {
        "success": False,
        "message": "No tiene permisos para acceder a este recurso.",
        "error": {"code": ErrorCode.FORBIDDEN.value},
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    404: {
        "success": False,
        "message": "Recurso no encontrado.",
        "error": {"code": ErrorCode.NOT_FOUND.value},
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    409: {
        "success": False,
        "message": "El recurso ya existe.",
        "error": {"code": ErrorCode.CONFLICT.value},
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    422: {
        "success": False,
        "message": "Los datos enviados son inválidos.",
        "error": {
            "code": ErrorCode.VALIDATION_ERROR.value,
            "details": [
                {
                    "field": "email",
                    "message": "El campo 'email' es obligatorio.",
                }
            ],
        },
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    500: {
        "success": False,
        "message": "Error interno del servidor.",
        "error": {"code": ErrorCode.INTERNAL_SERVER_ERROR.value},
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
    503: {
        "success": False,
        "message": "Las dependencias de la aplicación no están listas.",
        "error": {"code": ErrorCode.SERVICE_UNAVAILABLE.value},
        "meta": {"request_id": "req_01HZX9Y9K2"},
    },
}


StandardResponses = dict[int | str, dict[str, Any]]

STANDARD_ERROR_RESPONSES: StandardResponses = {
    status_code: {
        "model": ErrorResponse,
        "description": ERROR_EXAMPLES[status_code]["message"],
        "content": {
            "application/json": {
                "example": ERROR_EXAMPLES[status_code],
            },
        },
    }
    for status_code in (400, 401, 403, 404, 409, 422, 500, 503)
}


def build_success_payload(
    *,
    message: str,
    data: Any | None = None,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return {
        "success": True,
        "message": message,
        "data": data,
        "meta": meta,
    }


def build_paginated_payload(
    *,
    message: str,
    items: list[Any],
    pagination: PaginationMeta,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return {
        "success": True,
        "message": message,
        "data": {
            "items": items,
            "pagination": pagination.model_dump(mode="json"),
        },
        "meta": meta,
    }


def build_error_payload(
    *,
    message: str,
    error_code: str,
    request_id: str | None,
    details: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    error: dict[str, Any] = {"code": error_code}

    if details is not None:
        error["details"] = details

    return {
        "success": False,
        "message": message,
        "error": error,
        "meta": {"request_id": request_id},
    }
