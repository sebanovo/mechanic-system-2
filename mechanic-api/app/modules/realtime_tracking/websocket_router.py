from __future__ import annotations

import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Query, WebSocket, WebSocketDisconnect
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.common.exceptions import ForbiddenException, UnauthorizedException
from app.core.config import settings
from app.core.database import get_db
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment_tracking_event.repository import (
    AssignmentTrackingEventRepository,
)
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.realtime_tracking.auth import authenticate_realtime_user
from app.modules.realtime_tracking.connection_manager import (
    realtime_tracking_manager,
)
from app.modules.realtime_tracking.permissions import assert_can_connect_tracking
from app.modules.realtime_tracking.schemas import (
    RealtimeLocationInput,
    RealtimeTrackingOutput,
)
from app.modules.realtime_tracking.service import (
    RealtimeTrackingPersistenceService,
)

router = APIRouter(tags=["Realtime Tracking"])
logger = logging.getLogger(__name__)


@router.websocket("/ws/assignments/{assignment_id}/tracking")
async def assignment_tracking_websocket(
    websocket: WebSocket,
    assignment_id: str,
    db: Session = Depends(get_db),
    token: str | None = Query(default=None),
) -> None:
    try:
        identity = authenticate_realtime_user(
            token=_get_websocket_token(websocket, token),
            db=db,
        )

        connection_role = assert_can_connect_tracking(
            assignment_id=assignment_id,
            identity=identity,
            assignment_repository=AssignmentRepository(db),
            customer_repository=CustomerRepository(db),
            provider_repository=ProviderProfileRepository(db),
            technician_repository=TechnicianRepository(db),
        )

        detail = AssignmentRepository(db).get_detail_by_id(assignment_id)
        if detail is None:
            raise ForbiddenException("Asignación no encontrada.")

        assignment, incident, _offer, provider_profile, technician = detail
        customer_user_id = _get_customer_user_id(incident.customer_id, db)

        await realtime_tracking_manager.connect(
            assignment_id=assignment_id,
            websocket=websocket,
        )

        await realtime_tracking_manager.broadcast(
            assignment_id=assignment_id,
            payload={
                "type": f"{connection_role}_CONNECTED",
                "assignment_id": assignment_id,
            },
        )

        persistence_service = RealtimeTrackingPersistenceService(
            tracking_repository=AssignmentTrackingEventRepository(db),
        )

        try:
            while True:
                raw_payload = await websocket.receive_json()

                if connection_role != "TECHNICIAN":
                    await websocket.send_json(
                        {
                            "type": "FORBIDDEN",
                            "assignment_id": assignment_id,
                            "message": "Solo el técnico puede enviar ubicación.",
                        }
                    )
                    continue

                try:
                    location = RealtimeLocationInput.model_validate(raw_payload)
                except ValidationError as exc:
                    await websocket.send_json(
                        {
                            "type": "VALIDATION_ERROR",
                            "assignment_id": assignment_id,
                            "message": "Mensaje WebSocket inválido.",
                            "details": exc.errors(),
                        }
                    )
                    continue

                occurrence = datetime.now(timezone.utc)
                output = RealtimeTrackingOutput(
                    type="TECHNICIAN_LOCATION_UPDATED",
                    assignment_id=assignment_id,
                    latitude=location.latitude,
                    longitude=location.longitude,
                    heading=location.heading,
                    speed_kmh=location.speed_kmh,
                    occurred_at=occurrence,
                )

                persisted_event = persistence_service.persist_if_needed(
                    assignment_id=assignment_id,
                    latitude=location.latitude,
                    longitude=location.longitude,
                )

                if persisted_event is not None:
                    db.commit()
                else:
                    db.rollback()

                await realtime_tracking_manager.broadcast(
                    assignment_id=assignment_id,
                    payload={
                        **output.model_dump(mode="json"),
                        "assignment_status": assignment.assignment_status,
                        "incident_status": incident.status,
                        "provider_profile_id": str(provider_profile.id),
                        "technician_id": str(technician.id),
                        "customer_user_id": customer_user_id,
                    },
                )

        except WebSocketDisconnect:
            realtime_tracking_manager.disconnect(
                assignment_id=assignment_id,
                websocket=websocket,
            )

            await realtime_tracking_manager.broadcast(
                assignment_id=assignment_id,
                payload={
                    "type": f"{connection_role}_DISCONNECTED",
                    "assignment_id": assignment_id,
                },
            )

    except Exception as exc:
        logger.warning(
            "WebSocket tracking rejected. assignment_id=%s reason=%s",
            assignment_id,
            exc,
        )
        await websocket.close(code=1008, reason=str(exc))
        db.close()
        return
    finally:
        db.close()


def _get_websocket_token(websocket: WebSocket, token: str | None) -> str:
    if token:
        return token

    query_token = websocket.query_params.get("token")
    if query_token:
        return query_token

    cookie_token = websocket.cookies.get(settings.access_cookie_name)
    if cookie_token:
        return cookie_token

    raise UnauthorizedException("Token WebSocket requerido.")


def _get_customer_user_id(customer_id: object, db: Session) -> str | None:
    customer_detail = CustomerRepository(db).get_detail_by_customer_id(customer_id)

    if customer_detail is None:
        return None

    return str(customer_detail[1].id)
