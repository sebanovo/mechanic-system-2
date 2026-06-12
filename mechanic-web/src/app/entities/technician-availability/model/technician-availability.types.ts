import { Technician } from "../../../entities/technician/model";
import { StatusConfig } from "../../../shared/types";

export type TechnicianAvailabilityStatus =
	| "AVAILABLE"
	| "BUSY"
	| "OFFLINE"
	| "ON_BREAK";

export type TechnicianAvailabilityFilter = "" | TechnicianAvailabilityStatus;

export type TechnicianAvailability = {
	id: string;
	technician_id: string;
	availability_status: TechnicianAvailabilityStatus;
	available_from: string | null;
	available_until: string | null;
	created_at: string;
	updated_at: string;
};

export type TechnicianAvailabilityUpsertPayload = {
	availability_status: TechnicianAvailabilityStatus;
	available_from?: string | null;
	available_until?: string | null;
};

export type TechnicianAvailabilityDetail = {
	technician: Technician;
	availability: TechnicianAvailability | null;
};

export const TECHNICIAN_AVAILABILITY_STATUS_OPTIONS: {
	value: TechnicianAvailabilityFilter;
	label: string;
}[] = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "AVAILABLE",
		label: "Disponibles",
	},
	{
		value: "BUSY",
		label: "Ocupados",
	},
	{
		value: "OFFLINE",
		label: "Offline",
	},
	{
		value: "ON_BREAK",
		label: "En descanso",
	},
];

export const TECHNICIAN_AVAILABILITY_UPSERT_STATUS_OPTIONS: {
	value: TechnicianAvailabilityStatus;
	label: string;
}[] = [
	{
		value: "AVAILABLE",
		label: "Disponible",
	},
	{
		value: "BUSY",
		label: "Ocupado",
	},
	{
		value: "OFFLINE",
		label: "Offline",
	},
	{
		value: "ON_BREAK",
		label: "En descanso",
	},
];

export const TECHNICIAN_AVAILABILITY_STATUS_CONFIG: Record<
	TechnicianAvailabilityStatus,
	StatusConfig<TechnicianAvailabilityStatus>
> = {
	AVAILABLE: {
		value: "AVAILABLE",
		label: "Disponible",
		description: "Puede recibir nuevas asignaciones.",
		tone: "success",
		order: 1,
	},
	BUSY: {
		value: "BUSY",
		label: "Ocupado",
		description: "Está ocupado y no debería recibir nuevas asignaciones.",
		tone: "warning",
		order: 2,
	},
	OFFLINE: {
		value: "OFFLINE",
		label: "Offline",
		description: "No está conectado o no está disponible.",
		tone: "muted",
		order: 3,
	},
	ON_BREAK: {
		value: "ON_BREAK",
		label: "En descanso",
		description: "Está temporalmente en pausa.",
		tone: "info",
		order: 4,
	},
};

export function getTechnicianAvailabilityStatusConfig(
	status: TechnicianAvailabilityStatus
) {
	return TECHNICIAN_AVAILABILITY_STATUS_CONFIG[status];
}

export function getTechnicianAvailabilityStatus(
	item: TechnicianAvailabilityDetail
): TechnicianAvailabilityStatus {
	return item.availability?.availability_status ?? "OFFLINE";
}

export function getTechnicianAvailabilityOperationalText(
	item: TechnicianAvailabilityDetail
): string {
	const status = getTechnicianAvailabilityStatus(item);

	if (!item.availability) {
		return "La disponibilidad aún no fue configurada.";
	}

	return TECHNICIAN_AVAILABILITY_STATUS_CONFIG[status].description ?? "";
}

export function technicianAvailabilityMatchesFilter(
	item: TechnicianAvailabilityDetail,
	filter: TechnicianAvailabilityFilter
): boolean {
	if (!filter) {
		return true;
	}

	return getTechnicianAvailabilityStatus(item) === filter;
}

export function formatTechnicianAvailabilityDate(value: string | null): string {
	if (!value) {
		return "Sin horario definido";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function formatDateTimeLocalValue(value: string | null): string {
	if (!value) {
		return "";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "";
	}

	const pad = (part: number): string => String(part).padStart(2, "0");

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hour = pad(date.getHours());
	const minute = pad(date.getMinutes());

	return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function dateTimeLocalToIso(value: string): string | null {
	const trimmed = value.trim();

	if (!trimmed) {
		return null;
	}

	const date = new Date(trimmed);

	if (Number.isNaN(date.getTime())) {
		return null;
	}

	return date.toISOString();
}

export function isTechnicianAvailableNow(
	item: TechnicianAvailabilityDetail,
	now: Date = new Date()
): boolean {
	const availability = item.availability;

	if (!availability) {
		return false;
	}

	if (availability.availability_status !== "AVAILABLE") {
		return false;
	}

	if (availability.available_from) {
		const from = new Date(availability.available_from);

		if (!Number.isNaN(from.getTime()) && from > now) {
			return false;
		}
	}

	if (availability.available_until) {
		const until = new Date(availability.available_until);

		if (!Number.isNaN(until.getTime()) && until < now) {
			return false;
		}
	}

	return true;
}

export function getAvailabilityWindowLabel(
	item: TechnicianAvailabilityDetail
): string {
	const availability = item.availability;

	if (!availability) {
		return "Sin ventana configurada";
	}

	const from = formatTechnicianAvailabilityDate(availability.available_from);
	const until = formatTechnicianAvailabilityDate(availability.available_until);

	if (!availability.available_from && !availability.available_until) {
		return "Sin límite horario";
	}

	if (availability.available_from && availability.available_until) {
		return `${from} → ${until}`;
	}

	if (availability.available_from) {
		return `Desde ${from}`;
	}

	return `Hasta ${until}`;
}
