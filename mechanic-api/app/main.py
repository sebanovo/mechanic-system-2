from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.bootstrap.runtime_identity import hydrate_identity_runtime
from app.bootstrap.runtime_tenancy import hydrate_tenancy_runtime
from app.common.contracts import RootResponse
from app.common.exceptions import register_exception_handlers
from app.common.openapi import (
    API_DESCRIPTION,
    OPENAPI_TAGS,
    STANDARD_ERROR_RESPONSES,
    apply_standard_error_responses,
    configure_openapi,
)
from app.common.responses import success_response
from app.core.config import settings
from app.core.logging import RequestLoggingMiddleware, configure_logging
from app.core.middleware import RequestContextMiddleware, SecurityHeadersMiddleware
from app.modules.assignment.platform_router import (
    router as assignment_platform_router,
)
from app.modules.assignment.client_router import (
    router as assignment_client_router,
)
from app.modules.assignment.tenant_router import (
    router as assignment_tenant_router,
)
from app.modules.assignment_tracking_event.client_router import (
    router as assignment_tracking_event_client_router,
)
from app.modules.assignment_tracking_event.platform_router import (
    router as assignment_tracking_event_platform_router,
)
from app.modules.assignment_tracking_event.tenant_router import (
    router as assignment_tracking_event_tenant_router,
)
from app.modules.audit.platform_router import router as audit_platform_router
from app.modules.audit.tenant_router import router as audit_tenant_router
from app.modules.clients.router import router as clients_router
from app.modules.identity.auth.authorization import require_tenant_selected
from app.modules.identity.auth.router import router as auth_router
from app.modules.identity.customer.platform_router import (
    router as customer_platform_router,
)
from app.modules.identity.membership.platform_router import (
    router as membership_platform_router,
)
from app.modules.identity.membership.tenant_router import (
    router as membership_tenant_router,
)
from app.modules.identity.provider.platform_router import (
    router as provider_platform_router,
)
from app.modules.identity.provider.tenant_router import router as provider_tenant_router
from app.modules.identity.session.client_router import router as session_client_router
from app.modules.identity.session.platform_router import (
    router as session_platform_router,
)
from app.modules.identity.session.tenant_router import router as session_tenant_router
from app.modules.identity.technician.platform_router import (
    router as technician_platform_router,
)
from app.modules.identity.technician.platform_tenant_router import (
    router as technician_platform_tenant_router,
)
from app.modules.identity.technician.tenant_router import (
    router as technician_tenant_router,
)
from app.modules.identity.technician_availability.tenant_router import (
    router as technician_availability_tenant_router,
)
from app.modules.identity.tenant.platform_router import router as tenant_platform_router
from app.modules.identity.tenant.tenant_router import router as tenant_context_router
from app.modules.identity.user.platform_router import router as user_platform_router
from app.modules.dashboard.tenant_router import router as dashboard_tenant_router
from app.modules.dashboard.client_router import (
    router as dashboard_client_router,
)
from app.modules.dashboard.technician_router import (
    router as dashboard_technician_router,
)
from app.modules.dashboard.platform_dashboard.router import (
    router as dashboard_platform_router,
)
from app.modules.incident.client_router import router as incident_client_router
from app.modules.incident.platform_router import router as incident_platform_router
from app.modules.incident.tenant_router import router as incident_tenant_router
from app.modules.incident_ai_analysis.client_router import (
    router as incident_ai_analysis_client_router,
)
from app.modules.incident_ai_analysis.router import (
    router as incident_ai_analysis_router,
)
from app.modules.incident_ai_analysis.platform_router import (
    router as incident_ai_analysis_platform_router,
)
from app.modules.incident_ai_analysis.tenant_router import (
    router as incident_ai_analysis_tenant_router,
)
from app.modules.incident_candidate_provider.platform_router import (
    router as incident_candidate_provider_platform_router,
)
from app.modules.incident_candidate_provider.tenant_router import (
    router as incident_candidate_provider_tenant_router,
)
from app.modules.incident_offer.platform_router import (
    router as incident_offer_platform_router,
)
from app.modules.incident_offer.tenant_router import (
    router as incident_offer_tenant_router,
)
from app.modules.notification.client_router import router as notification_client_router
from app.modules.notification.platform_router import (
    router as notification_platform_router,
)
from app.modules.notification_device.client_router import (
    router as notification_device_client_router,
)
from app.modules.notification_device.platform_router import (
    router as notification_device_platform_router,
)
from app.modules.platform.summary_router import router as platform_summary_router
from app.modules.realtime_tracking.client_router import (
    router as realtime_tracking_client_router,
)
from app.modules.realtime_tracking.tenant_router import (
    router as realtime_tracking_tenant_router,
)
from app.modules.realtime_tracking.websocket_router import (
    router as realtime_tracking_router,
)
from app.modules.provider_service.platform_router import (
    router as provider_service_platform_router,
)
from app.modules.provider_service.tenant_router import (
    router as provider_service_tenant_router,
)
from app.modules.service_catalog.platform_router import (
    router as service_catalog_platform_router,
)
from app.modules.service_catalog.tenant_router import (
    router as service_catalog_tenant_router,
)
from app.modules.system.ai_test_router import router as ai_test_router
from app.modules.system.router import router as system_router
from app.modules.technician_service.platform_router import (
    router as technician_service_platform_router,
)
from app.modules.technician_service.tenant_router import (
    router as technician_service_tenant_router,
)
from app.modules.vehicle.client_router import router as vehicle_client_router
from app.modules.vehicle.platform_router import router as vehicle_platform_router

configure_logging()


@asynccontextmanager
async def lifespan(_: FastAPI):
    hydrate_identity_runtime()
    hydrate_tenancy_runtime()
    yield


def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        summary="API backend para una plataforma de asistencia mecánica.",
        description=API_DESCRIPTION,
        openapi_tags=OPENAPI_TAGS,
        docs_url="/docs" if settings.docs_enabled else None,
        redoc_url="/redoc" if settings.docs_enabled else None,
        openapi_url="/openapi.json" if settings.docs_enabled else None,
        lifespan=lifespan,
        servers=[
            {
                "url": "http://localhost:8000",
                "description": "Local Development",
            }
        ],
    )

    allow_credentials = "*" not in settings.cors_origins

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.add_middleware(GZipMiddleware, minimum_size=500)

    if settings.trusted_hosts_list:
        application.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=settings.trusted_hosts_list,
        )

    if settings.https_redirect_enabled:
        application.add_middleware(HTTPSRedirectMiddleware)

    if settings.security_headers_enabled:
        application.add_middleware(SecurityHeadersMiddleware)

    application.add_middleware(RequestLoggingMiddleware)
    application.add_middleware(RequestContextMiddleware)

    register_exception_handlers(application)

    # Public / System
    application.include_router(system_router, prefix=settings.api_v1_prefix)
    application.include_router(auth_router, prefix=settings.api_v1_prefix)
    application.include_router(ai_test_router, prefix=settings.api_v1_prefix)
    application.include_router(realtime_tracking_router)

    # Client context
    application.include_router(clients_router, prefix=settings.api_v1_prefix)
    application.include_router(session_client_router, prefix=settings.api_v1_prefix)
    application.include_router(
        vehicle_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        incident_client_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        incident_ai_analysis_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        incident_ai_analysis_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        assignment_tracking_event_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        assignment_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        notification_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        notification_device_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        dashboard_client_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        realtime_tracking_client_router,
        prefix=settings.api_v1_prefix,
    )

    # Tenant context
    application.include_router(tenant_context_router, prefix=settings.api_v1_prefix)
    application.include_router(
        dashboard_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        provider_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        technician_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        technician_availability_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        membership_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        session_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        audit_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        service_catalog_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        provider_service_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        incident_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        incident_ai_analysis_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        technician_service_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        incident_candidate_provider_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        incident_offer_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        assignment_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    application.include_router(
        assignment_tracking_event_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        dashboard_technician_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )
    application.include_router(
        realtime_tracking_tenant_router,
        prefix=settings.api_v1_prefix,
        dependencies=[Depends(require_tenant_selected())],
    )

    # Platform context
    application.include_router(platform_summary_router, prefix=settings.api_v1_prefix)
    application.include_router(
        dashboard_platform_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        notification_platform_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        notification_device_platform_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(user_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(customer_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(tenant_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(provider_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(technician_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(technician_platform_tenant_router, prefix=settings.api_v1_prefix)
    application.include_router(membership_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(session_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(audit_platform_router, prefix=settings.api_v1_prefix)
    application.include_router(
        service_catalog_platform_router,
        prefix=settings.api_v1_prefix,
    )
    application.include_router(
        provider_service_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        vehicle_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        incident_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        incident_ai_analysis_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        technician_service_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        incident_candidate_provider_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        incident_offer_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        assignment_platform_router,
        prefix=settings.api_v1_prefix,
    )

    application.include_router(
        assignment_tracking_event_platform_router,
        prefix=settings.api_v1_prefix,
    )

    apply_standard_error_responses(application)

    @application.get(
        "/",
        tags=["Root"],
        response_model=RootResponse,
        responses=STANDARD_ERROR_RESPONSES,
    )
    def root() -> dict:
        return success_response(
            message="API inicializada correctamente.",
            data={
                "app_name": settings.app_name,
                "version": settings.app_version,
                "environment": settings.env_mode,
                "docs_enabled": settings.docs_enabled,
                "docs_url": "/docs" if settings.docs_enabled else None,
                "health_url": f"{settings.api_v1_prefix}/health",
                "readiness_url": f"{settings.api_v1_prefix}/readiness",
                "info_url": f"{settings.api_v1_prefix}/info",
                "auth_base_url": f"{settings.api_v1_prefix}/auth",
                "clients_base_url": f"{settings.api_v1_prefix}/clients",
                "tenants_base_url": f"{settings.api_v1_prefix}/tenants",
                "platform_base_url": f"{settings.api_v1_prefix}/platform",
            },
        )

    configure_openapi(application)
    return application


app = create_application()
application = app
