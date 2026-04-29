import {
	TrackingClient,
	TrackingClientDto,
	TrackingHistoryItem,
	TrackingHistoryItemDto,
	TrackingLive,
	TrackingLiveDto,
	TrackingLocationDto,
	TrackingOperation,
	TrackingOperationDto,
	TrackingPriority,
	TrackingTechnician,
	TrackingTechnicianDto,
	UpdateTrackingLocationFormValue,
	UpdateTrackingLocationRequest,
} from "../models/tracking.types";

export function toTrackingTechnician(
	dto: TrackingTechnicianDto | null | undefined
): TrackingTechnician | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number ?? null,
		specialty: dto.specialty ?? "",
		isActive: dto.is_active ?? true,
		isAvailable: dto.is_available ?? false,
		currentLatitude: dto.current_latitude ?? null,
		currentLongitude: dto.current_longitude ?? null,
	};
}

export function toTrackingClient(
	dto: TrackingClientDto | null | undefined
): TrackingClient | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		fullName: dto.full_name,
		email: dto.email ?? null,
		phoneNumber: dto.phone_number ?? null,
	};
}

export function toTrackingOperation(dto: TrackingOperationDto): TrackingOperation {
	return {
		incidentId: dto.incident_id,
		providerId: dto.provider_id ?? null,
		assignedTechnicianId: dto.assigned_technician_id ?? null,
		status: dto.status,
		priority: normalizePriority(dto.priority),
		reportedCategory: dto.reported_category ?? "UNKNOWN",
		title: dto.title,
		description: dto.description ?? "",
		incidentLatitude: dto.incident_latitude ?? null,
		incidentLongitude: dto.incident_longitude ?? null,
		addressReference: dto.address_reference ?? null,
		assignedAt: formatDateTimeOrNull(dto.assigned_at ?? null),
		enRouteAt: formatDateTimeOrNull(dto.en_route_at ?? null),
		arrivedAt: formatDateTimeOrNull(dto.arrived_at ?? null),
		startedAt: formatDateTimeOrNull(dto.started_at ?? null),
		clientUser: toTrackingClient(dto.client_user),
		assignedTechnician: toTrackingTechnician(dto.assigned_technician),
	};
}

export function toTrackingOperations(
	dtos: TrackingOperationDto[]
): TrackingOperation[] {
	return dtos.map(toTrackingOperation);
}

export function toTrackingLive(dto: TrackingLiveDto): TrackingLive {
	const incidentLocation = dto.incident_location ?? null;
	const technicianLocation =
		dto.technician_location ?? dto.last_location ?? null;
	const route = dto.route ?? null;

	return {
		incidentId: dto.incident_id,
		status: dto.status ? String(dto.status) : null,

		incidentLatitude:
			dto.incident_latitude ??
			dto.destination_latitude ??
			getLatitude(incidentLocation),
		incidentLongitude:
			dto.incident_longitude ??
			dto.destination_longitude ??
			getLongitude(incidentLocation),

		technicianLatitude:
			dto.technician_latitude ??
			dto.current_latitude ??
			getLatitude(technicianLocation),
		technicianLongitude:
			dto.technician_longitude ??
			dto.current_longitude ??
			getLongitude(technicianLocation),

		distanceKm:
			dto.distance_km ??
			dto.route_distance_km ??
			route?.distance_km ??
			route?.route_distance_km ??
			null,

		etaMinutes:
			dto.eta_minutes ??
			dto.route_duration_minutes ??
			route?.eta_minutes ??
			route?.duration_minutes ??
			route?.route_duration_minutes ??
			null,

		routePolyline: route?.polyline ?? null,
		lastUpdatedAt: formatDateTimeOrNull(
			dto.last_updated_at ?? dto.updated_at ?? technicianLocation?.updated_at ?? null
		),
		assignedTechnician: toTrackingTechnician(dto.assigned_technician),
	};
}

export function toTrackingHistoryItem(
	dto: TrackingHistoryItemDto
): TrackingHistoryItem {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		technicianId: dto.technician_id ?? null,
		latitude: dto.latitude ?? dto.lat ?? null,
		longitude: dto.longitude ?? dto.lng ?? null,
		accuracyMeters: dto.accuracy_meters ?? null,
		speedKmh: dto.speed_kmh ?? null,
		headingDegrees: dto.heading_degrees ?? null,
		source: dto.source ?? null,
		note: dto.note ?? null,
		recordedAt: formatDateTimeOrNull(dto.recorded_at ?? null),
		createdAt: formatDateTime(dto.created_at),
	};
}

export function toTrackingHistory(
	dtos: TrackingHistoryItemDto[]
): TrackingHistoryItem[] {
	return dtos.map(toTrackingHistoryItem);
}

export function toUpdateTrackingLocationRequest(
	formValue: UpdateTrackingLocationFormValue
): UpdateTrackingLocationRequest {
	return {
		latitude: Number(formValue.latitude),
		longitude: Number(formValue.longitude),
		accuracy_meters: normalizeNullableNumber(formValue.accuracyMeters),
		speed_kmh: normalizeNullableNumber(formValue.speedKmh),
		heading_degrees: normalizeNullableNumber(formValue.headingDegrees),
		note: cleanOptional(formValue.note),
	};
}

function getLatitude(location: TrackingLocationDto | null): number | null {
	if (!location) {
		return null;
	}

	return location.latitude ?? location.lat ?? null;
}

function getLongitude(location: TrackingLocationDto | null): number | null {
	if (!location) {
		return null;
	}

	return location.longitude ?? location.lng ?? null;
}

function normalizePriority(value: TrackingPriority | undefined): TrackingPriority {
	return value ?? "UNKNOWN";
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleaned = value?.trim();

	return cleaned ? cleaned : null;
}

function normalizeNullableNumber(value: number | null | undefined): number | null {
	if (value === null || value === undefined) {
		return null;
	}

	const numberValue = Number(value);

	if (!Number.isFinite(numberValue)) {
		return null;
	}

	return numberValue;
}

function formatDateTimeOrNull(value: string | null): string | null {
	if (!value) {
		return null;
	}

	return formatDateTime(value);
}

function formatDateTime(value: string): string {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return date.toLocaleString("es-BO", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}
