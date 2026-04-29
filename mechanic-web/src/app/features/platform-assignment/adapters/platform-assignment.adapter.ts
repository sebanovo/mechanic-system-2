import {
	AssignmentCandidate,
	AssignmentCandidateDto,
	AssignmentCandidateMatchedService,
	AssignmentCandidateMatchedServiceDto,
	AssignmentPublishResponseDto,
	AssignmentPublishResult,
	PlatformIncident,
	PlatformIncidentDto,
} from "../models/platform-assignment.types";

export function toPlatformIncident(dto: PlatformIncidentDto): PlatformIncident {
	return {
		id: dto.id,
		clientUserId: dto.client_user_id,
		vehicleId: dto.vehicle_id,
		providerId: dto.provider_id,
		assignedTechnicianId: dto.assigned_technician_id,
		dispatchMode: dto.dispatch_mode,

		status: dto.status,
		priority: dto.priority,
		reportedCategory: dto.reported_category,
		title: dto.title,
		description: dto.description,
		clientContactPhoneSnapshot: dto.client_contact_phone_snapshot,
		incidentLatitude: dto.incident_latitude,
		incidentLongitude: dto.incident_longitude,
		addressReference: dto.address_reference,
		estimatedPriceMin: dto.estimated_price_min,
		estimatedPriceMax: dto.estimated_price_max,

		aiSummaryStatus: dto.ai_summary_status,
		summaryProviderName: dto.summary_provider_name,
		structuredSummary: dto.structured_summary,
		suggestedCategory: dto.suggested_category,
		suggestedPriority: dto.suggested_priority,
		requiresMoreInformation: dto.requires_more_information,
		summaryProcessedAt: formatDateTimeOrNull(dto.summary_processed_at),
		summaryErrorMessage: dto.summary_error_message,

		routeDistanceKm: dto.route_distance_km ?? null,
		routeEtaMinutes: dto.route_eta_minutes ?? null,
		routeErrorMessage: dto.route_error_message ?? null,

		requestedAt: formatDateTime(dto.requested_at),
		assignedAt: formatDateTimeOrNull(dto.assigned_at),
		enRouteAt: formatDateTimeOrNull(dto.en_route_at),
		arrivedAt: formatDateTimeOrNull(dto.arrived_at),
		startedAt: formatDateTimeOrNull(dto.started_at),
		completedAt: formatDateTimeOrNull(dto.completed_at),
		cancelledAt: formatDateTimeOrNull(dto.cancelled_at),
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),

		vehicle: {
			id: dto.vehicle.id,
			plateNumber: dto.vehicle.plate_number,
			vehicleType: dto.vehicle.vehicle_type,
			brand: dto.vehicle.brand,
			model: dto.vehicle.model,
			year: dto.vehicle.year,
			color: dto.vehicle.color,
		},

		clientUser: {
			id: dto.client_user.id,
			email: dto.client_user.email,
			firstName: dto.client_user.first_name,
			lastName: dto.client_user.last_name,
			fullName: dto.client_user.full_name,
			phoneNumber: dto.client_user.phone_number,
		},

		provider: dto.provider
			? {
					id: dto.provider.id,
					providerType: dto.provider.provider_type,
					businessName: dto.provider.business_name,
					contactPhone: dto.provider.contact_phone,
					city: dto.provider.city,
					isAvailable: dto.provider.is_available ?? null,
					averageRating: dto.provider.average_rating,
				}
			: null,

		assignedTechnician: dto.assigned_technician
			? {
					id: dto.assigned_technician.id,
					providerId: dto.assigned_technician.provider_id,
					firstName: dto.assigned_technician.first_name,
					lastName: dto.assigned_technician.last_name,
					fullName: dto.assigned_technician.full_name,
					phoneNumber: dto.assigned_technician.phone_number,
					specialty: dto.assigned_technician.specialty,
					isActive: dto.assigned_technician.is_active,
					isAvailable: dto.assigned_technician.is_available,
				}
			: null,
	};
}

export function toPlatformIncidents(
	dtos: PlatformIncidentDto[]
): PlatformIncident[] {
	return dtos.map(toPlatformIncident);
}

export function toAssignmentCandidateMatchedService(
	dto: AssignmentCandidateMatchedServiceDto
): AssignmentCandidateMatchedService {
	return {
		code: dto.code,
		category: dto.category,
		title: dto.title,
	};
}

export function toAssignmentCandidate(
	dto: AssignmentCandidateDto
): AssignmentCandidate {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		providerId: dto.provider_id,
		status: dto.status,
		recommendationRank: dto.recommendation_rank,
		score: dto.score,
		distanceKm: dto.distance_km,
		requiredServiceCodes: dto.required_service_codes ?? [],
		matchedServiceCodes: dto.matched_service_codes ?? [],
		rationale: dto.rationale ?? {},
		providerAverageRatingSnapshot: dto.provider_average_rating_snapshot,
		providerAvailableCapacitySnapshot:
			dto.provider_available_capacity_snapshot,
		availableTechniciansCountSnapshot:
			dto.available_technicians_count_snapshot,
		publishedAt: formatDateTime(dto.published_at),
		respondedAt: formatDateTimeOrNull(dto.responded_at),
		expiresAt: formatDateTimeOrNull(dto.expires_at),

		provider: {
			id: dto.provider.id,
			providerType: dto.provider.provider_type,
			businessName: dto.provider.business_name,
			city: dto.provider.city,
			contactPhone: dto.provider.contact_phone,
			averageRating: dto.provider.average_rating,
			availableCapacity: dto.provider.available_capacity,
			availableTechniciansCount: dto.provider.available_technicians_count,
			baseLatitude: dto.provider.base_latitude,
			baseLongitude: dto.provider.base_longitude,
			ownerUser: {
				id: dto.provider.owner_user.id,
				email: dto.provider.owner_user.email,
				firstName: dto.provider.owner_user.first_name,
				lastName: dto.provider.owner_user.last_name,
				fullName: dto.provider.owner_user.full_name,
				phoneNumber: dto.provider.owner_user.phone_number,
			},
			matchedServices: (dto.provider.matched_services ?? []).map(
				toAssignmentCandidateMatchedService
			),
		},

		incident: {
			id: dto.incident.id,
			status: dto.incident.status,
			priority: dto.incident.priority,
			reportedCategory: dto.incident.reported_category,
			title: dto.incident.title,
			description: dto.incident.description,
			incidentLatitude: dto.incident.incident_latitude,
			incidentLongitude: dto.incident.incident_longitude,
			addressReference: dto.incident.address_reference,
			aiSummaryStatus: dto.incident.ai_summary_status,
			structuredSummary: dto.incident.structured_summary,
			suggestedCategory: dto.incident.suggested_category,
			suggestedPriority: dto.incident.suggested_priority,
			requiresMoreInformation: dto.incident.requires_more_information,
		},
	};
}

export function toAssignmentCandidates(
	dtos: AssignmentCandidateDto[]
): AssignmentCandidate[] {
	return dtos.map(toAssignmentCandidate);
}

export function toAssignmentPublishResult(
	dto: AssignmentPublishResponseDto
): AssignmentPublishResult {
	return {
		incidentId: dto.incident_id,
		incidentStatus: dto.incident_status,
		usedCategory: dto.used_category,
		usedPriority: dto.used_priority,
		requiredServiceCodes: dto.required_service_codes ?? [],
		publishedCandidatesCount: dto.published_candidates_count,
		recommendedCandidateId: dto.recommended_candidate_id,
		recommendedProviderId: dto.recommended_provider_id,
	};
}

export function jsonToText(value: Record<string, unknown>): string {
	return JSON.stringify(value ?? {}, null, 2);
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
