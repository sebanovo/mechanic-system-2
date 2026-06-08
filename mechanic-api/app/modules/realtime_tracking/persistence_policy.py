from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import math


@dataclass(frozen=True)
class LastPersistedLocation:
    latitude: float
    longitude: float
    occurred_at: datetime


class RealtimeTrackingPersistencePolicy:
    def __init__(
        self,
        *,
        interval_seconds: int,
        min_distance_meters: int,
    ) -> None:
        self.interval_seconds = interval_seconds
        self.min_distance_meters = min_distance_meters

    def should_persist(
        self,
        *,
        last_location: LastPersistedLocation | None,
        latitude,
        longitude,
        occurred_at: datetime | None = None,
    ) -> bool:
        occurred_at = occurred_at or datetime.now(timezone.utc)

        if last_location is None:
            return True

        seconds_elapsed = (
            occurred_at - last_location.occurred_at
        ).total_seconds()
        distance_meters = self._distance_meters(
            latitude_a=last_location.latitude,
            longitude_a=last_location.longitude,
            latitude_b=latitude,
            longitude_b=longitude,
        )

        return (
            seconds_elapsed >= self.interval_seconds
            or distance_meters >= self.min_distance_meters
        )

    def _distance_meters(
        self,
        *,
        latitude_a,
        longitude_a,
        latitude_b,
        longitude_b,
    ) -> float:
        earth_radius_m = 6_371_000.0

        lat1 = math.radians(float(latitude_a))
        lon1 = math.radians(float(longitude_a))
        lat2 = math.radians(float(latitude_b))
        lon2 = math.radians(float(longitude_b))

        delta_lat = lat2 - lat1
        delta_lon = lon2 - lon1

        a = (
            math.sin(delta_lat / 2) ** 2
            + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2) ** 2
        )
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return earth_radius_m * c
