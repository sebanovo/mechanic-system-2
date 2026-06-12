import { StatusConfig } from "../../../shared/types";

export type ProviderType =
	| "WORKSHOP"
	| "WORKSHOP_NETWORK"
	| "INDEPENDENT_TECHNICIAN";

export type ProviderOperationalStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type ProviderProfile = {
	id: string;
	tenant_id: string;
	provider_type: ProviderType;
	operational_status: ProviderOperationalStatus;
	accepts_emergency_requests: boolean;
	average_rating: number;
	total_reviews: number;
	response_score: number;
	created_at: string;
	updated_at: string;
};

export type UpdateProviderProfilePayload = {
	accepts_emergency_requests?: boolean | null;
	operational_status?: ProviderOperationalStatus | null;
};

export const PROVIDER_OPERATIONAL_STATUS_OPTIONS: {
	value: ProviderOperationalStatus;
	label: string;
}[] = [
	{
		value: "ACTIVE",
		label: "Activo",
	},
	{
		value: "INACTIVE",
		label: "Inactivo",
	},
	{
		value: "SUSPENDED",
		label: "Suspendido",
	},
];

export const PROVIDER_OPERATIONAL_STATUS_CONFIG: Record<
	ProviderOperationalStatus,
	StatusConfig<ProviderOperationalStatus>
> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activo",
		description: "El proveedor puede recibir solicitudes.",
		tone: "success",
		order: 1,
	},
	INACTIVE: {
		value: "INACTIVE",
		label: "Inactivo",
		description: "El proveedor no recibe solicitudes.",
		tone: "muted",
		order: 2,
	},
	SUSPENDED: {
		value: "SUSPENDED",
		label: "Suspendido",
		description: "El proveedor está suspendido operacionalmente.",
		tone: "destructive",
		order: 3,
	},
};

export const PROVIDER_TYPE_LABELS: Record<ProviderType, string> = {
	WORKSHOP: "Taller",
	WORKSHOP_NETWORK: "Red de talleres",
	INDEPENDENT_TECHNICIAN: "Técnico independiente",
};

export function getProviderOperationalStatusConfig(
	status: ProviderOperationalStatus
) {
	return PROVIDER_OPERATIONAL_STATUS_CONFIG[status];
}

export function getProviderTypeLabel(type: ProviderType): string {
	return PROVIDER_TYPE_LABELS[type];
}

export function getProviderEmergencyLabel(
	provider: ProviderProfile | null
): string {
	if (!provider) {
		return "Sin configuración";
	}

	return provider.accepts_emergency_requests
		? "Acepta emergencias"
		: "No acepta emergencias";
}

export function getProviderOperationalText(
	provider: ProviderProfile | null
): string {
	if (!provider) {
		return "Sin perfil operativo configurado.";
	}

	const config = getProviderOperationalStatusConfig(
		provider.operational_status
	);

	return config.description ?? "";
}

export function formatProviderRating(provider: ProviderProfile | null): string {
	if (!provider) {
		return "0 / 5";
	}

	return `${provider.average_rating} / 5 · ${provider.total_reviews} reseñas`;
}

export function formatProviderResponseScore(
	provider: ProviderProfile | null
): string {
	if (!provider) {
		return "0";
	}

	return `${provider.response_score}`;
}
