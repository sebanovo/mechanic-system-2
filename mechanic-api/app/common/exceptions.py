from __future__ import annotations

import logging

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.common.contracts import build_error_payload
from app.common.enums import ErrorCode

logger = logging.getLogger(__name__)


class BaseAppException(Exception):
    def __init__(
        self,
        message: str,
        *,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        error_code: ErrorCode = ErrorCode.APP_ERROR,
    ) -> None:
        self.message = message
        self.status_code = status_code
        self.error_code = error_code.value
        super().__init__(message)


class ValidationException(BaseAppException):
    def __init__(self, message: str = "Los datos enviados son inválidos.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_400_BAD_REQUEST,
            error_code=ErrorCode.VALIDATION_ERROR,
        )


class BusinessException(BaseAppException):
    def __init__(self, message: str = "La operación no puede completarse.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_409_CONFLICT,
            error_code=ErrorCode.BUSINESS_ERROR,
        )


class NotFoundException(BaseAppException):
    def __init__(self, message: str = "Recurso no encontrado.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_404_NOT_FOUND,
            error_code=ErrorCode.NOT_FOUND,
        )


class UnauthorizedException(BaseAppException):
    def __init__(self, message: str = "Se requiere autenticación.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            error_code=ErrorCode.UNAUTHORIZED,
        )


class ForbiddenException(BaseAppException):
    def __init__(self, message: str = "No tiene permisos para realizar esta acción.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_403_FORBIDDEN,
            error_code=ErrorCode.FORBIDDEN,
        )


class ConflictException(BaseAppException):
    def __init__(self, message: str = "El recurso ya existe.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_409_CONFLICT,
            error_code=ErrorCode.CONFLICT,
        )


class InfrastructureException(BaseAppException):
    def __init__(self, message: str = "Las dependencias de la aplicación no están listas.") -> None:
        super().__init__(
            message,
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            error_code=ErrorCode.SERVICE_UNAVAILABLE,
        )


def _request_id(request: Request) -> str | None:
    context = getattr(request.state, "context", None)
    if context is not None:
        return getattr(context, "request_id", None)

    return getattr(request.state, "request_id", None)

def _friendly_validation_message(error: dict) -> str:
    field = ".".join(str(part) for part in error.get("loc", [])[1:])
    error_type = error.get("type")

    if error_type == "missing":
        return f"El campo '{field}' es obligatorio."

    if error_type == "value_error" and field == "email":
        return "El correo electrónico no tiene un formato válido."

    if error_type == "string_too_short":
        return f"El campo '{field}' es demasiado corto."

    if error_type == "string_too_long":
        return f"El campo '{field}' es demasiado largo."

    return "El valor enviado no es válido."

def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(BaseAppException)
    async def handle_app_exception(
        request: Request,
        exc: BaseAppException,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content=build_error_payload(
                message=exc.message,
                error_code=exc.error_code,
                request_id=_request_id(request),
            ),
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation_exception(
        request: Request,
        exc: RequestValidationError,
    ) -> JSONResponse:
        errors = exc.errors()

        has_json_error = any(error.get("type") == "json_invalid" for error in errors)

        if has_json_error:
            message = "El cuerpo de la solicitud no tiene un formato JSON válido."
            details = [
                {
                    "field": "body",
                    "message": "Revisa que el JSON esté bien escrito, sin comas finales y con claves entre comillas dobles.",
                }
            ]
            status_code = status.HTTP_400_BAD_REQUEST
        else:
            message = "Hay campos inválidos en la solicitud."
            details = [
                {
                    "field": ".".join(str(part) for part in error.get("loc", [])[1:]),
                    "message": _friendly_validation_message(error),
                }
                for error in errors
            ]
            status_code = status.HTTP_422_UNPROCESSABLE_ENTITY

        return JSONResponse(
            status_code=status_code,
            content=build_error_payload(
                message=message,
                error_code=ErrorCode.VALIDATION_ERROR.value,
                request_id=_request_id(request),
                details=details,
            ),
        )

    @app.exception_handler(Exception)
    async def handle_unexpected_exception(
        request: Request,
        exc: Exception,
    ) -> JSONResponse:
        logger.exception("Unhandled exception")

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=build_error_payload(
                message="Error interno del servidor.",
                error_code=ErrorCode.INTERNAL_SERVER_ERROR.value,
                request_id=_request_id(request),
            ),
        )