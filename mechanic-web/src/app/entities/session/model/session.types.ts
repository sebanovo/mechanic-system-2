import { AuthTenant } from "../../tenant/model";
import { User, UserType } from "../../user/model";
import { StatusConfig } from "../../../shared/types";

export type SessionStatus = "ACTIVE" | "EXPIRED" | "REVOKED";

export type TokenPair = {
	access_token: string;
	access_expires_at: string;
	refresh_token?: string;
	refresh_expires_at?: string;
};

export type UserSession = {
	id: string;
	user_id: string;
	tenant_id: string | null;
	session_status: string;
	device_type: string | null;
	device_name: string | null;
	ip_address: string | null;
	user_agent: string | null;
	last_seen_at: string | null;
	expires_at: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type Session = UserSession;

export type SessionPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type SessionListData = {
	items: Session[];
	pagination: SessionPagination;
};

export type SessionListQuery = {
	page?: number;
	page_size?: number;
	session_status?: SessionStatus | "";
};

export function createEmptySessionPagination(): SessionPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export const SESSION_STATUS_OPTIONS: {
	value: SessionStatus | "";
	label: string;
}[] = [
	{ value: "", label: "Todas las sesiones" },
	{ value: "ACTIVE", label: "Activa" },
	{ value: "EXPIRED", label: "Expirada" },
	{ value: "REVOKED", label: "Revocada" },
];

export const SESSION_STATUS_CONFIG: Record<
	SessionStatus,
	StatusConfig<SessionStatus>
> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activa",
		description: "La sesión está habilitada y puede seguir usándose.",
		tone: "success",
		order: 1,
	},
	EXPIRED: {
		value: "EXPIRED",
		label: "Expirada",
		description: "La sesión alcanzó su fecha de expiración.",
		tone: "warning",
		order: 2,
	},
	REVOKED: {
		value: "REVOKED",
		label: "Revocada",
		description: "La sesión fue revocada manualmente.",
		tone: "destructive",
		order: 3,
	},
};

export type AuthContext = {
	user: User;
	user_type: UserType;
	tenant_id: string | null;
	current_tenant: AuthTenant | null;
	available_tenants: AuthTenant[];
	requires_tenant_selection: boolean;
	session: UserSession;
	tokens: TokenPair | null;
};

export type LoginRequest = {
	email: string;
	password: string;
	device_type?: string | null;
	device_name?: string | null;
};

export type RegisterClientRequest = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};

export type RegisterTenantKind =
	| "WORKSHOP"
	| "WORKSHOP_NETWORK"
	| "INDEPENDENT_TECHNICIAN";

export type RegisterTenantRequest = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	commercial_name: string;
	tenant_kind?: RegisterTenantKind;
};

export type SelectTenantRequest = {
	tenant_id: string;
};

export function getSessionStatusConfig(
	status: SessionStatus | string | null
): StatusConfig<SessionStatus> | undefined {
	if (!status) {
		return undefined;
	}

	return SESSION_STATUS_CONFIG[status as SessionStatus];
}

export function getSessionStatusLabel(
	status: SessionStatus | string | null
): string {
	if (!status) {
		return "Sin estado";
	}

	return getSessionStatusConfig(status)?.label ?? status;
}

export function formatSessionDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}
