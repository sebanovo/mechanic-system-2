import { StatusConfig } from "../../../shared/types";

export type AuditScope = "PLATFORM" | "TENANT";

export type AuditActorType =
	| "USER"
	| "SYSTEM"
	| "SUPERADMIN"
	| "TENANT_OWNER"
	| "TECHNICIAN"
	| "CLIENT";

export type AuditEventData = Record<string, unknown>;

export type AuditEvent = {
	id: string;
	tenant_id: string | null;
	user_id: string | null;
	scope: AuditScope;
	actor_type: AuditActorType;
	event_type: string;
	resource_type: string;
	resource_id: string | null;
	event_data: AuditEventData | null;
	ip_address: string | null;
	user_agent: string | null;
	created_at: string;
	updated_at: string;
};

export type AuditEventPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type AuditEventListData = {
	items: AuditEvent[];
	pagination: AuditEventPagination;
};

export type AuditEventListQuery = {
	page?: number;
	page_size?: number;
	actor_id?: string;
	event_type?: string;
	resource_type?: string;
	resource_id?: string;
	created_from?: string;
	created_to?: string;
};

export type AuditEventFilters = {
	actor_id: string;
	event_type: string;
	resource_type: string;
	resource_id: string;
	created_from: string;
	created_to: string;
};

export const AUDIT_ACTOR_CONFIG: Record<
	AuditActorType,
	StatusConfig<AuditActorType>
> = {
	USER: {
		value: "USER",
		label: "Usuario",
		description: "Acción realizada por un usuario autenticado.",
		tone: "info",
		order: 1,
	},
	SYSTEM: {
		value: "SYSTEM",
		label: "Sistema",
		description: "Acción automática del sistema.",
		tone: "muted",
		order: 2,
	},
	SUPERADMIN: {
		value: "SUPERADMIN",
		label: "Superadmin",
		description: "Acción administrativa de plataforma.",
		tone: "destructive",
		order: 3,
	},
	TENANT_OWNER: {
		value: "TENANT_OWNER",
		label: "Owner",
		description: "Acción del propietario del tenant.",
		tone: "warning",
		order: 4,
	},
	TECHNICIAN: {
		value: "TECHNICIAN",
		label: "Técnico",
		description: "Acción realizada por un técnico.",
		tone: "success",
		order: 5,
	},
	CLIENT: {
		value: "CLIENT",
		label: "Cliente",
		description: "Acción realizada por un cliente.",
		tone: "info",
		order: 6,
	},
};

export const AUDIT_ACTOR_OPTIONS: {
	value: AuditActorType | "";
	label: string;
}[] = [
	{
		value: "",
		label: "Todos los actores",
	},
	{
		value: "USER",
		label: "Usuario",
	},
	{
		value: "SYSTEM",
		label: "Sistema",
	},
	{
		value: "SUPERADMIN",
		label: "Superadmin",
	},
	{
		value: "TENANT_OWNER",
		label: "Owner",
	},
	{
		value: "TECHNICIAN",
		label: "Técnico",
	},
	{
		value: "CLIENT",
		label: "Cliente",
	},
];

export function createEmptyAuditEventPagination(): AuditEventPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function createEmptyAuditEventFilters(): AuditEventFilters {
	return {
		actor_id: "",
		event_type: "",
		resource_type: "",
		resource_id: "",
		created_from: "",
		created_to: "",
	};
}
