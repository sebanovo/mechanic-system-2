from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import ValidationError

from app.modules.realtime_tracking.connection_manager import (
    realtime_tracking_manager,
)
from app.modules.realtime_tracking.schemas import (
    RealtimeLocationInput,
    RealtimeTrackingOutput,
)

router = APIRouter(tags=["Realtime Tracking"])


@router.websocket("/ws/assignments/{assignment_id}/tracking")
async def assignment_tracking_websocket(
    websocket: WebSocket,
    assignment_id: str,
) -> None:
    await realtime_tracking_manager.connect(
        assignment_id=assignment_id,
        websocket=websocket,
    )

    await websocket.send_json(
        RealtimeTrackingOutput(
            type="CONNECTED",
            assignment_id=assignment_id,
            message="Conectado al tracking en tiempo real.",
        ).model_dump(mode="json")
    )

    try:
        while True:
            raw_payload = await websocket.receive_json()

            try:
                location = RealtimeLocationInput.model_validate(raw_payload)
            except ValidationError:
                await websocket.send_json(
                    RealtimeTrackingOutput(
                        type="ERROR",
                        assignment_id=assignment_id,
                        message="Payload de ubicación inválido.",
                    ).model_dump(mode="json")
                )
                continue

            output = RealtimeTrackingOutput(
                type="TECHNICIAN_LOCATION_UPDATED",
                assignment_id=assignment_id,
                latitude=location.latitude,
                longitude=location.longitude,
                heading=location.heading,
                speed_kmh=location.speed_kmh,
                occurred_at=datetime.now(timezone.utc),
            )

            await realtime_tracking_manager.broadcast(
                assignment_id=assignment_id,
                payload=output.model_dump(mode="json"),
            )

    except WebSocketDisconnect:
        realtime_tracking_manager.disconnect(
            assignment_id=assignment_id,
            websocket=websocket,
        )
