from __future__ import annotations

from collections import defaultdict

from fastapi import WebSocket


class RealtimeTrackingConnectionManager:
    def __init__(self) -> None:
        self._connections: dict[str, set[WebSocket]] = defaultdict(set)

    async def connect(
        self,
        *,
        assignment_id: str,
        websocket: WebSocket,
    ) -> None:
        await websocket.accept()
        self._connections[assignment_id].add(websocket)

    def disconnect(
        self,
        *,
        assignment_id: str,
        websocket: WebSocket,
    ) -> None:
        connections = self._connections.get(assignment_id)

        if connections is None:
            return

        connections.discard(websocket)

        if not connections:
            self._connections.pop(assignment_id, None)

    async def broadcast(
        self,
        *,
        assignment_id: str,
        payload: dict,
    ) -> None:
        connections = list(self._connections.get(assignment_id, set()))

        for websocket in connections:
            try:
                await websocket.send_json(payload)
            except Exception:
                self.disconnect(
                    assignment_id=assignment_id,
                    websocket=websocket,
                )


realtime_tracking_manager = RealtimeTrackingConnectionManager()
