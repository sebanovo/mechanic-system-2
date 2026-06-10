from __future__ import annotations

from typing import Any

from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.openapi.utils import get_openapi

from app.common.contracts import STANDARD_ERROR_RESPONSES

API_DESCRIPTION = """
Backend FastAPI para la plataforma Mechanic System.

La API responde con un formato estable y consistente para éxito y error.
"""

OPENAPI_TAGS = [
    {"name": "Root", "description": "Punto de entrada de la API."},
    {"name": "System", "description": "Salud, readiness e información del sistema."},
    {"name": "Auth", "description": "Autenticación y sesión."},
    {"name": "Clients", "description": "Perfil y capacidades del cliente autenticado."},
    {"name": "Tenants", "description": "Contexto y administración de tenant."},
    {"name": "Platform", "description": "Superadministración de plataforma."},
    {"name": "Audit", "description": "Consulta de eventos de auditoría."},
    {"name": "Dynamic Reports", "description": "Reportes dinámicos impulsados por IA."},
]


def configure_openapi(app: FastAPI) -> None:
    def custom_openapi() -> dict[str, Any]:
        if app.openapi_schema:
            return app.openapi_schema

        openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            description=API_DESCRIPTION,
            routes=app.routes,
            tags=OPENAPI_TAGS,
            servers=app.servers,
        )

        openapi_schema["info"]["x-logo"] = {"url": "/static/logo.svg"}
        app.openapi_schema = openapi_schema
        return app.openapi_schema

    app.openapi = custom_openapi  # type: ignore[method-assign]


def apply_standard_error_responses(app: FastAPI) -> None:
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.responses = {
                **STANDARD_ERROR_RESPONSES,
                **(route.responses or {}),
            }


__all__ = [
    "API_DESCRIPTION",
    "OPENAPI_TAGS",
    "apply_standard_error_responses",
    "STANDARD_ERROR_RESPONSES",
    "configure_openapi",
]
