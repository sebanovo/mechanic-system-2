import { RealtimeTrackingPoint } from "../model";

export function toGoogleLatLng(
	point: RealtimeTrackingPoint | null
): google.maps.LatLngLiteral | null {
	if (!point) {
		return null;
	}

	const latitude = Number(point.latitude);
	const longitude = Number(point.longitude);

	if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
		return null;
	}

	if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
		return null;
	}

	return {
		lat: latitude,
		lng: longitude,
	};
}

export function formatRouteDistance(
	distanceMeters: number | null | undefined
): string {
	if (
		distanceMeters === null ||
		distanceMeters === undefined ||
		!Number.isFinite(distanceMeters)
	) {
		return "Sin distancia";
	}

	if (distanceMeters < 1_000) {
		return `${Math.round(distanceMeters)} m`;
	}

	return `${(distanceMeters / 1_000).toFixed(1)} km`;
}

export function formatRouteDuration(
	durationMillis: number | null | undefined
): string {
	if (
		durationMillis === null ||
		durationMillis === undefined ||
		!Number.isFinite(durationMillis)
	) {
		return "Sin ETA";
	}

	const totalMinutes = Math.max(1, Math.round(durationMillis / 60_000));

	if (totalMinutes < 60) {
		return `${totalMinutes} min`;
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	if (minutes === 0) {
		return `${hours} h`;
	}

	return `${hours} h ${minutes} min`;
}

export function distanceBetweenCoordinates(
	origin: google.maps.LatLngLiteral,
	destination: google.maps.LatLngLiteral
): number {
	const earthRadiusMeters = 6_371_000;

	const toRadians = (value: number): number => (value * Math.PI) / 180;

	const latitudeDifference = toRadians(destination.lat - origin.lat);

	const longitudeDifference = toRadians(destination.lng - origin.lng);

	const originLatitude = toRadians(origin.lat);
	const destinationLatitude = toRadians(destination.lat);

	const haversine =
		Math.sin(latitudeDifference / 2) ** 2 +
		Math.cos(originLatitude) *
			Math.cos(destinationLatitude) *
			Math.sin(longitudeDifference / 2) ** 2;

	const angularDistance =
		2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

	return earthRadiusMeters * angularDistance;
}

export function buildCoordinateBounds(
	points: (google.maps.LatLngLiteral | null)[]
): google.maps.LatLngBounds | null {
	const validPoints = points.filter(
		(point): point is google.maps.LatLngLiteral => point !== null
	);

	if (validPoints.length === 0) {
		return null;
	}

	const bounds = new google.maps.LatLngBounds();

	for (const point of validPoints) {
		bounds.extend(point);
	}

	return bounds;
}
