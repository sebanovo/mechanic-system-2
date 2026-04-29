import {
	CreateIncidentFormValue,
	CreateIncidentRequest,
	CreateTextEvidenceFormValue,
	CreateTextEvidenceRequest,
	CreateVehicleFormValue,
	CreateVehicleRequest,
	Incident,
	IncidentDto,
	IncidentEvidence,
	IncidentEvidenceDto,
	IncidentProviderSummary,
	IncidentProviderSummaryDto,
	IncidentTechnicianSummary,
	IncidentTechnicianSummaryDto,
	IncidentUserSummary,
	IncidentUserSummaryDto,
	IncidentVehicleSummary,
	IncidentVehicleSummaryDto,
	Vehicle,
	VehicleDto,
} from "../models/client-portal.types";

export function toVehicle(dto: VehicleDto): Vehicle {
	return {
		id: dto.id,
		ownerUserId: dto.owner_user_id,
		plateNumber: dto.plate_number,
		vehicleType: dto.vehicle_type,
		brand: dto.brand,
		model: dto.model,
		year: dto.year,
		color: dto.color,
		notes: dto.notes,
		isActive: dto.is_active,
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
	};
}

export function toVehicles(dtos: VehicleDto[]): Vehicle[] {
	return dtos.map(toVehicle);
}

export function toCreateVehicleRequest(
	formValue: CreateVehicleFormValue
): CreateVehicleRequest {
	return {
		plate_number: formValue.plateNumber.trim().toUpperCase(),
		vehicle_type: formValue.vehicleType,
		brand: formValue.brand.trim(),
		model: formValue.model.trim(),
		year: normalizeNullableNumber(formValue.year),
		color: cleanOptional(formValue.color),
		notes: cleanOptional(formValue.notes),
	};
}

export function toIncidentVehicleSummary(
	dto: IncidentVehicleSummaryDto
): IncidentVehicleSummary {
	return {
		id: dto.id,
		plateNumber: dto.plate_number,
		vehicleType: dto.vehicle_type,
		brand: dto.brand,
		model: dto.model,
		year: dto.year,
		color: dto.color,
	};
}

export function toIncidentUserSummary(
	dto: IncidentUserSummaryDto
): IncidentUserSummary {
	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
	};
}

export function toIncidentProviderSummary(
	dto: IncidentProviderSummaryDto | null
): IncidentProviderSummary | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		providerType: dto.provider_type,
		businessName: dto.business_name,
		city: dto.city,
		contactPhone: dto.contact_phone,
		averageRating: dto.average_rating,
	};
}

export function toIncidentTechnicianSummary(
	dto: IncidentTechnicianSummaryDto | null
): IncidentTechnicianSummary | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		providerId: dto.provider_id,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
		specialty: dto.specialty,
		isActive: dto.is_active,
		isAvailable: dto.is_available,
	};
}

export function toIncident(dto: IncidentDto): Incident {
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

		responderLastLatitude: dto.responder_last_latitude,
		responderLastLongitude: dto.responder_last_longitude,
		responderLastSourceType: dto.responder_last_source_type,
		responderLastRecordedAt: formatDateTimeOrNull(dto.responder_last_recorded_at),

		routeProviderName: dto.route_provider_name,
		routeDistanceKm: dto.route_distance_km,
		routeEtaMinutes: dto.route_eta_minutes,
		routeErrorMessage: dto.route_error_message,

		requestedAt: formatDateTime(dto.requested_at),
		assignedAt: formatDateTimeOrNull(dto.assigned_at),
		enRouteAt: formatDateTimeOrNull(dto.en_route_at),
		arrivedAt: formatDateTimeOrNull(dto.arrived_at),
		startedAt: formatDateTimeOrNull(dto.started_at),
		completedAt: formatDateTimeOrNull(dto.completed_at),
		cancelledAt: formatDateTimeOrNull(dto.cancelled_at),
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),

		vehicle: toIncidentVehicleSummary(dto.vehicle),
		clientUser: toIncidentUserSummary(dto.client_user),
		provider: toIncidentProviderSummary(dto.provider),
		assignedTechnician: toIncidentTechnicianSummary(dto.assigned_technician),
	};
}

export function toIncidents(dtos: IncidentDto[]): Incident[] {
	return dtos.map(toIncident);
}

export function toCreateIncidentRequest(
	formValue: CreateIncidentFormValue
): CreateIncidentRequest {
	return {
		vehicle_id: formValue.vehicleId,
		reported_category: formValue.reportedCategory,
		priority: formValue.priority,
		title: formValue.title.trim(),
		description: formValue.description.trim(),
		incident_latitude: normalizeNullableNumber(formValue.incidentLatitude),
		incident_longitude: normalizeNullableNumber(formValue.incidentLongitude),
		address_reference: cleanOptional(formValue.addressReference),
	};
}

export function toIncidentEvidence(
	dto: IncidentEvidenceDto
): IncidentEvidence {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		uploadedByUserId: dto.uploaded_by_user_id,
		evidenceType: dto.evidence_type,
		originalFilename: dto.original_filename,
		storedFilename: dto.stored_filename,
		fileExtension: dto.file_extension,
		mimeType: dto.mime_type,
		fileSizeBytes: dto.file_size_bytes,
		description: dto.description,
		textContentSnapshot: dto.text_content_snapshot,

		storageProvider: dto.storage_provider,
		publicUrl: dto.public_url,
		downloadUrl: dto.download_url,

		audioProcessingStatus: dto.audio_processing_status,
		audioProviderName: dto.audio_provider_name,
		transcriptText: dto.transcript_text,
		transcriptLanguageCode: dto.transcript_language_code,
		transcriptConfidence: dto.transcript_confidence,
		audioProcessedAt: formatDateTimeOrNull(dto.audio_processed_at),
		audioErrorMessage: dto.audio_error_message,

		imageProcessingStatus: dto.image_processing_status,
		imageProviderName: dto.image_provider_name,
		imageLabels: dto.image_labels_json ?? [],
		imageDetections: dto.image_detections_json ?? [],
		imageSummary: dto.image_summary,
		imageProcessedAt: formatDateTimeOrNull(dto.image_processed_at),
		imageErrorMessage: dto.image_error_message,

		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
	};
}

export function toIncidentEvidences(
	dtos: IncidentEvidenceDto[]
): IncidentEvidence[] {
	return dtos.map(toIncidentEvidence);
}

export function toCreateTextEvidenceRequest(
	formValue: CreateTextEvidenceFormValue
): CreateTextEvidenceRequest {
	return {
		description: cleanOptional(formValue.description),
		text_content: formValue.textContent.trim(),
		evidence_type: "TEXT",
	};
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
}

function normalizeNullableNumber(value: number | null | undefined): number | null {
	if (value === null || value === undefined) {
		return null;
	}

	const normalized = Number(value);

	if (!Number.isFinite(normalized)) {
		return null;
	}

	return normalized;
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
