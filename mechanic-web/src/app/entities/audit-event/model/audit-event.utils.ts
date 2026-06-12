import {
	AUDIT_ACTOR_CONFIG,
	AuditActorType,
	AuditEvent,
	AuditEventData,
} from "./audit-event.types";

export function getAuditActorConfig(actorType: AuditActorType) {
	return AUDIT_ACTOR_CONFIG[actorType];
}

export function getAuditActorLabel(actorType: AuditActorType): string {
	return AUDIT_ACTOR_CONFIG[actorType].label;
}

export function formatAuditDate(value: string | null | undefined): string {
	if (!value) {
		return "Sin registro";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "medium",
	}).format(date);
}

export function formatAuditEventType(value: string): string {
	return formatAuditIdentifier(value);
}

export function formatAuditResourceType(value: string): string {
	return formatAuditIdentifier(value);
}

export function formatAuditIdentifier(value: string): string {
	return value
		.trim()
		.replaceAll("_", " ")
		.replaceAll("-", " ")
		.toLowerCase()
		.replace(/\b\w/g, character => character.toUpperCase());
}

export function formatAuditEventData(value: AuditEventData | null): string {
	if (!value) {
		return "Sin datos adicionales";
	}

	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return String(value);
	}
}

export function hasAuditEventData(event: AuditEvent): boolean {
	return Boolean(event.event_data && Object.keys(event.event_data).length > 0);
}

export function getAuditResourceLabel(event: AuditEvent): string {
	const resourceType = formatAuditResourceType(event.resource_type);

	if (!event.resource_id) {
		return resourceType;
	}

	return `${resourceType} · ${event.resource_id}`;
}

export function getAuditActorReference(event: AuditEvent): string {
	if (event.user_id) {
		return event.user_id;
	}

	return event.actor_type === "SYSTEM"
		? "Proceso automático"
		: "Sin usuario asociado";
}

export function matchesAuditSearch(event: AuditEvent, search: string): boolean {
	const normalizedSearch = search.trim().toLowerCase();

	if (!normalizedSearch) {
		return true;
	}

	const searchableValues = [
		event.event_type,
		event.resource_type,
		event.resource_id,
		event.actor_type,
		event.user_id,
		event.ip_address,
		formatAuditEventType(event.event_type),
		formatAuditResourceType(event.resource_type),
	];

	return searchableValues.some(value =>
		value?.toLowerCase().includes(normalizedSearch)
	);
}

export function toAuditDateTimeStart(value: string): string | undefined {
	if (!value) {
		return undefined;
	}

	const date = new Date(`${value}T00:00:00`);

	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function toAuditDateTimeEnd(value: string): string | undefined {
	if (!value) {
		return undefined;
	}

	const date = new Date(`${value}T23:59:59.999`);

	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
