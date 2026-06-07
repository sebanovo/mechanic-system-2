from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.notification_device.mappers import notification_device_public
from app.modules.notification_device.repository import NotificationDeviceRepository
from app.modules.notification_device.schemas import (
    NotificationDeviceListData,
    NotificationDeviceResponse,
    NotificationDevicesResponse,
)
from app.modules.notification_device.service import NotificationDeviceService

router = APIRouter(prefix="/platform/notification/devices", tags=["Platform Notification Devices"])


def _service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> NotificationDeviceService:
    return NotificationDeviceService(
        repository=NotificationDeviceRepository(db),
        context=context,
    )


@router.get("", response_model=NotificationDevicesResponse)
def list_all_devices(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: NotificationDeviceService = Depends(_service),
    pagination: PaginationParams = Depends(),
    status: str | None = Query(default=None),
) -> dict:
    devices, total = service.list_all_devices(
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = NotificationDeviceListData(
        items=[notification_device_public(device) for device in devices],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Dispositivos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.delete("/{device_id}", response_model=NotificationDeviceResponse)
def revoke_device(
    device_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: NotificationDeviceService = Depends(_service),
) -> dict:
    device = service.revoke_device(device_id)

    return success_response(
        message="Dispositivo revocado correctamente.",
        data=notification_device_public(device).model_dump(mode="json"),
    )
