import {
	CompleteIncidentFormValue,
	CompleteIncidentRequest,
	DispatchIncidentFormValue,
	DispatchIncidentRequest,
	IncidentOperationEvent,
	IncidentOperationEventDto,
	IncidentOperationState,
	IncidentOperationStateDto,
	OperationClientSummary,
	OperationClientSummaryDto,
	OperationEventActor,
	OperationEventActorDto,
	OperationNoteFormValue,
	OperationNoteRequest,
	OperationTechnicianSummary,
	OperationTechnicianSummaryDto,
	ProviderTechnician,
	ProviderTechnicianDto,
} from "../models/operation.types";

export function toOperationTechnicianSummary(
	dto: OperationTechnicianSummaryDto
): OperationTechnicianSummary {
	return {
		id: dto.id,
		providerId: dto.provider_id,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
		specialty: dto.specialty ?? "",
		isActive: dto.is_active,
		isAvailable: dto.is_available,
	};
}

export function toOperationClientSummary(
	dto: OperationClientSummaryDto
): OperationClientSummary {
	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
	};
}

export function toIncidentOperationState(
	dto: IncidentOperationStateDto
): IncidentOperationState {
	return {
		incidentId: dto.incident_id,
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

		aiSummaryStatus: dto.ai_summary_status,
		structuredSummary: dto.structured_summary,
		suggestedCategory: dto.suggested_category,
		suggestedPriority: dto.suggested_priority,
		requiresMoreInformation: dto.requires_more_information,

		assignedAt: formatDateTimeOrNull(dto.assigned_at),
		enRouteAt: formatDateTimeOrNull(dto.en_route_at),
		arrivedAt: formatDateTimeOrNull(dto.arrived_at),
		startedAt: formatDateTimeOrNull(dto.started_at),
		completedAt: formatDateTimeOrNull(dto.completed_at),
		cancelledAt: formatDateTimeOrNull(dto.cancelled_at),

		clientUser: toOperationClientSummary(dto.client_user),
		assignedTechnician: dto.assigned_technician
			? toOperationTechnicianSummary(dto.assigned_technician)
			: null,
	};
}

export function toIncidentOperationStates(
	dtos: IncidentOperationStateDto[]
): IncidentOperationState[] {
	return dtos.map(toIncidentOperationState);
}

export function toOperationEventActor(
	dto: OperationEventActorDto
): OperationEventActor {
	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
	};
}

export function toIncidentOperationEvent(
	dto: IncidentOperationEventDto
): IncidentOperationEvent {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		providerId: dto.provider_id,
		technicianId: dto.technician_id,
		actorUserId: dto.actor_user_id,
		eventType: dto.event_type,
		fromStatus: dto.from_status,
		toStatus: dto.to_status,
		note: dto.note,
		payloadJson: dto.payload_json ?? {},
		createdAt: formatDateTime(dto.created_at),
		actorUser: dto.actor_user ? toOperationEventActor(dto.actor_user) : null,
		technician: dto.technician
			? toOperationTechnicianSummary(dto.technician)
			: null,
	};
}

export function toIncidentOperationEvents(
	dtos: IncidentOperationEventDto[]
): IncidentOperationEvent[] {
	return dtos.map(toIncidentOperationEvent);
}

export function toProviderTechnician(dto: ProviderTechnicianDto): ProviderTechnician {
	return {
		id: dto.id,
		providerId: dto.provider_id,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
		specialty: dto.specialty ?? "",
		isActive: dto.is_active,
		isAvailable: dto.is_available,
		currentLatitude: dto.current_latitude,
		currentLongitude: dto.current_longitude,
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
	};
}

export function toProviderTechnicians(
	dtos: ProviderTechnicianDto[]
): ProviderTechnician[] {
	return dtos.map(toProviderTechnician);
}

export function toDispatchIncidentRequest(
	formValue: DispatchIncidentFormValue
): DispatchIncidentRequest {
	return {
		technician_id: cleanOptional(formValue.technicianId),
		note: cleanOptional(formValue.note),
	};
}

export function toOperationNoteRequest(
	formValue: OperationNoteFormValue
): OperationNoteRequest {
	return {
		note: cleanOptional(formValue.note),
	};
}

export function toCompleteIncidentRequest(
	formValue: CompleteIncidentFormValue
): CompleteIncidentRequest {
	return {
		note: cleanOptional(formValue.note),
		completion_summary: cleanOptional(formValue.completionSummary),
	};
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
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
