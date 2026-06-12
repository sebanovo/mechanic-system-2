import { StatusConfig } from "../../../shared/types";

export type TenantKind =
	| "WORKSHOP"
	| "WORKSHOP_NETWORK"
	| "INDEPENDENT_TECHNICIAN";

export type TenantStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type AuthTenant = {
	id: string;
	slug: string;
	commercial_name: string;
	tenant_kind: TenantKind;
	status: TenantStatus;
};

export type Tenant = {
	id: string;
	commercial_name: string;
	slug: string;
	tenant_kind: TenantKind;
	status: TenantStatus;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type TenantProfile = {
	id: string;
	tenant_id: string;
	legal_name: string | null;
	tax_identifier: string | null;
	business_email: string | null;
	business_phone: string | null;
	website_url: string | null;
	address_line: string | null;
	city: string | null;
	state: string | null;
	country: string | null;
	latitude: number | null;
	longitude: number | null;
	created_at: string;
	updated_at: string;
};

export type TenantSettings = {
	id: string;
	tenant_id: string;
	default_currency: string;
	default_timezone: string;
	default_language: string;
	created_at: string;
	updated_at: string;
};

export type TenantDetail = {
	tenant: Tenant;
	profile: TenantProfile | null;
	settings: TenantSettings | null;
};

export type UpdateTenantProfilePayload = {
	legal_name?: string | null;
	tax_identifier?: string | null;
	business_email?: string | null;
	business_phone?: string | null;
	website_url?: string | null;
	address_line?: string | null;
	city?: string | null;
	state?: string | null;
	country?: string | null;
	latitude?: number | null;
	longitude?: number | null;
};

export type UpdateTenantSettingsPayload = {
	default_currency: string;
	default_timezone: string;
	default_language: string;
};

export type CreateTenantNetworkPayload = {
	commercial_name: string;
};

export const TENANT_STATUS_CONFIG: Record<
	TenantStatus,
	StatusConfig<TenantStatus>
> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activo",
		description: "Tenant habilitado para operar.",
		tone: "success",
		order: 1,
	},
	INACTIVE: {
		value: "INACTIVE",
		label: "Inactivo",
		description: "Tenant deshabilitado temporalmente.",
		tone: "muted",
		order: 2,
	},
	BLOCKED: {
		value: "BLOCKED",
		label: "Bloqueado",
		description: "Tenant bloqueado por la plataforma.",
		tone: "destructive",
		order: 3,
	},
};

export const TENANT_KIND_LABELS: Record<TenantKind, string> = {
	WORKSHOP: "Taller",
	WORKSHOP_NETWORK: "Red de talleres",
	INDEPENDENT_TECHNICIAN: "Técnico independiente",
};

export function getTenantStatusConfig(status: TenantStatus) {
	return TENANT_STATUS_CONFIG[status];
}

export function getTenantKindLabel(kind: TenantKind): string {
	return TENANT_KIND_LABELS[kind];
}

export function formatTenantDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getTenantLocationLabel(profile: TenantProfile | null): string {
	if (!profile) {
		return "Sin ubicación configurada";
	}

	const parts = [
		profile.address_line,
		profile.city,
		profile.state,
		profile.country,
	].filter(Boolean);

	return parts.length ? parts.join(", ") : "Sin ubicación configurada";
}

export function getTenantContactLabel(profile: TenantProfile | null): string {
	if (!profile) {
		return "Sin contacto configurado";
	}

	const email = profile.business_email;
	const phone = profile.business_phone;

	if (email && phone) {
		return `${email} · ${phone}`;
	}

	return email || phone || "Sin contacto configurado";
}
