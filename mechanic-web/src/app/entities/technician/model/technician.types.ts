import { ListQuery } from "../../../shared/api";
import { StatusConfig } from "../../../shared/types";

export type TechnicianStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface TechnicianUser {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	phone: string | null;
	avatar_url: string | null;
	user_type: "TECHNICIAN";
	status: string;
	email_verified: boolean;
	email_verified_at: string | null;
	last_login_at: string | null;
	password_changed_at: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface TechnicianRecord {
	id: string;
	provider_profile_id: string;
	user_id: string;
	technician_code: string;
	status: TechnicianStatus;
	average_rating: number;
	total_reviews: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface Technician {
	technician: TechnicianRecord;
	user: TechnicianUser;
}

export interface TechnicianPagination {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
}

export interface TechnicianListData {
	items: Technician[];
	pagination: TechnicianPagination;
}

export type TechnicianListQuery = ListQuery & {
	page?: number;
	page_size?: number;
	status?: TechnicianStatus | "";
};

export interface CreateTechnicianPayload {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

export interface ChangeTechnicianStatusPayload {
	status: TechnicianStatus;
}

export const TECHNICIAN_STATUS_OPTIONS: Array<{
	value: TechnicianStatus | "";
	label: string;
}> = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "ACTIVE",
		label: "Activos",
	},
	{
		value: "INACTIVE",
		label: "Inactivos",
	},
	{
		value: "BLOCKED",
		label: "Bloqueados",
	},
];

export const TECHNICIAN_STATUS_CONFIG: Record<
	TechnicianStatus,
	StatusConfig<TechnicianStatus>
> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activo",
		description: "Puede operar dentro del taller.",
		tone: "success",
		order: 1,
	},
	INACTIVE: {
		value: "INACTIVE",
		label: "Inactivo",
		description: "No está disponible para operar.",
		tone: "muted",
		order: 2,
	},
	BLOCKED: {
		value: "BLOCKED",
		label: "Bloqueado",
		description: "No puede acceder ni operar.",
		tone: "destructive",
		order: 3,
	},
};

export function getTechnicianFullName(item: Technician): string {
	return `${item.user.first_name} ${item.user.last_name}`.trim();
}

export function getTechnicianStatusConfig(status: TechnicianStatus) {
	return TECHNICIAN_STATUS_CONFIG[status];
}

export function getTechnicianOperationalText(status: TechnicianStatus): string {
	return TECHNICIAN_STATUS_CONFIG[status].description ?? "";
}

export function createEmptyTechnicianPagination(): TechnicianPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
	};
}

export function formatTechnicianDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}
