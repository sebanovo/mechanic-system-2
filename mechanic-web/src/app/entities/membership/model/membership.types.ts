import { User } from "../../../entities/user/model";
import { StatusConfig } from "../../../shared/types";

export type MembershipStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type TenantMembership = {
	id: string;
	tenant_id: string;
	user_id: string;
	status: MembershipStatus;
	joined_at: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type TenantMembershipDetail = {
	membership: TenantMembership;
	user: User;
};

export type TenantMembershipPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type TenantMembershipListData = {
	items: TenantMembershipDetail[];
	pagination: TenantMembershipPagination;
};

export type TenantMembershipListQuery = {
	page?: number;
	page_size?: number;
	status?: MembershipStatus | "";
};

export type TenantMembershipStatusChangePayload = {
	status: MembershipStatus;
};

export const MEMBERSHIP_STATUS_OPTIONS: {
	value: MembershipStatus | "";
	label: string;
}[] = [
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
		value: "SUSPENDED",
		label: "Suspendidos",
	},
];

export const MEMBERSHIP_STATUS_CONFIG: Record<
	MembershipStatus,
	StatusConfig<MembershipStatus>
> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activo",
		description: "El usuario puede operar dentro del tenant.",
		tone: "success",
		order: 1,
	},
	INACTIVE: {
		value: "INACTIVE",
		label: "Inactivo",
		description: "El usuario está deshabilitado dentro del tenant.",
		tone: "muted",
		order: 2,
	},
	SUSPENDED: {
		value: "SUSPENDED",
		label: "Suspendido",
		description: "El acceso del usuario al tenant está suspendido.",
		tone: "destructive",
		order: 3,
	},
};

export function createEmptyTenantMembershipPagination(): TenantMembershipPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getMembershipStatusConfig(status: MembershipStatus) {
	return MEMBERSHIP_STATUS_CONFIG[status];
}

export function getMembershipFullName(item: TenantMembershipDetail): string {
	return `${item.user.first_name} ${item.user.last_name}`.trim();
}

export function getMembershipOperationalText(
	item: TenantMembershipDetail
): string {
	return MEMBERSHIP_STATUS_CONFIG[item.membership.status].description ?? "";
}

export function getUserTypeLabel(userType: string): string {
	if (userType === "TENANT_OWNER") {
		return "Owner";
	}

	if (userType === "TECHNICIAN") {
		return "Técnico";
	}

	if (userType === "SUPERADMIN") {
		return "Superadmin";
	}

	if (userType === "CLIENT") {
		return "Cliente";
	}

	return userType;
}

export function formatMembershipDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getMembershipEmailVerifiedLabel(
	item: TenantMembershipDetail
): string {
	return item.user.email_verified ? "Verificado" : "No verificado";
}

export function getMembershipPhoneLabel(item: TenantMembershipDetail): string {
	return item.user.phone || "Sin teléfono";
}
