import {
	AssignmentCandidate,
	AssignmentCandidateDto,
	CandidateActionResult,
	CandidateActionResultDto,
	CandidateIncident,
	CandidateIncidentDto,
	CandidateMatchedService,
	CandidateMatchedServiceDto,
	CandidateProvider,
	CandidateProviderDto,
	CandidateProviderOwnerUser,
	CandidateProviderOwnerUserDto,
	CandidateRationaleDto,
} from "../models/candidate.types";

export function toCandidateProviderOwnerUser(
	dto: CandidateProviderOwnerUserDto
): CandidateProviderOwnerUser {
	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
	};
}

export function toCandidateMatchedService(
	dto: CandidateMatchedServiceDto
): CandidateMatchedService {
	return {
		code: dto.code,
		category: dto.category,
		title: dto.title,
	};
}

export function toCandidateProvider(dto: CandidateProviderDto): CandidateProvider {
	return {
		id: dto.id,
		providerType: dto.provider_type,
		businessName: dto.business_name,
		city: dto.city ?? "",
		contactPhone: dto.contact_phone,
		averageRating: dto.average_rating,
		availableCapacity: dto.available_capacity,
		availableTechniciansCount: dto.available_technicians_count,
		baseLatitude: dto.base_latitude,
		baseLongitude: dto.base_longitude,
		ownerUser: toCandidateProviderOwnerUser(dto.owner_user),
		matchedServices: (dto.matched_services ?? []).map(toCandidateMatchedService),
	};
}

export function toCandidateIncident(dto: CandidateIncidentDto): CandidateIncident {
	return {
		id: dto.id,
		status: dto.status,
		priority: dto.priority,
		reportedCategory: dto.reported_category,
		title: dto.title,
		description: dto.description,
		incidentLatitude: dto.incident_latitude,
		incidentLongitude: dto.incident_longitude,
		addressReference: dto.address_reference,
		aiSummaryStatus: dto.ai_summary_status,
		structuredSummary: dto.structured_summary,
		suggestedCategory: dto.suggested_category,
		suggestedPriority: dto.suggested_priority,
		requiresMoreInformation: dto.requires_more_information,
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
		rationale: normalizeRationale(dto.rationale),
		providerAverageRatingSnapshot: dto.provider_average_rating_snapshot,
		providerAvailableCapacitySnapshot: dto.provider_available_capacity_snapshot,
		availableTechniciansCountSnapshot: dto.available_technicians_count_snapshot,
		publishedAt: formatDateTime(dto.published_at),
		respondedAt: dto.responded_at ? formatDateTime(dto.responded_at) : null,
		expiresAt: dto.expires_at ? formatDateTime(dto.expires_at) : null,
		provider: toCandidateProvider(dto.provider),
		incident: toCandidateIncident(dto.incident),
	};
}

export function toAssignmentCandidates(
	dtos: AssignmentCandidateDto[]
): AssignmentCandidate[] {
	return dtos.map(toAssignmentCandidate);
}

export function toCandidateActionResult(
	dto: CandidateActionResultDto
): CandidateActionResult {
	return {
		candidateId: dto.candidate_id,
		candidateStatus: dto.candidate_status,
		incidentId: dto.incident_id,
		incidentStatus: dto.incident_status,
		assignedProviderId: dto.assigned_provider_id,
		assignedAt: dto.assigned_at ? formatDateTime(dto.assigned_at) : null,
	};
}

function normalizeRationale(
	rationale: CandidateRationaleDto | null | undefined
): Record<string, unknown> {
	if (!rationale || typeof rationale !== "object") {
		return {};
	}

	return rationale;
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
