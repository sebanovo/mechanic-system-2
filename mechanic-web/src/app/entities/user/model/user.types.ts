import { StatusConfig } from "../../../shared/types";

export type UserType = "SUPERADMIN" | "TENANT_OWNER" | "TECHNICIAN" | "CLIENT";

export type UserStatus =
	| "ACTIVE"
	| "INACTIVE"
	| "BLOCKED"
	| "PENDING_VERIFICATION";

export type User = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	phone: string | null;
	avatar_url: string | null;
	user_type: UserType;
	status: UserStatus;
	email_verified: boolean;
	email_verified_at: string | null;
	last_login_at: string | null;
	password_changed_at: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type UserStatusChange = UserStatus;

export type UserPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type UserListData = {
	items: User[];
	pagination: UserPagination;
};

export type UserListQuery = {
	page?: number;
	page_size?: number;
	email?: string;
	user_type?: UserType | "";
	status?: UserStatus | "";
	created_from?: string;
	created_to?: string;
};

export type UserCreatePayload = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	user_type?: UserType;
};

export type UserUpdatePayload = {
	first_name?: string | null;
	last_name?: string | null;
	phone?: string | null;
	avatar_url?: string | null;
};

export type UserTypeChangePayload = {
	user_type: UserType;
};

export type UserStatusChangePayload = {
	status: UserStatus;
};

export type UserPasswordChangePayload = {
	new_password: string;
};

export const USER_TYPE_OPTIONS: {
	value: UserType | "";
	label: string;
}[] = [
	{ value: "", label: "Todos los tipos" },
	{ value: "SUPERADMIN", label: "Superadmin" },
	{ value: "TENANT_OWNER", label: "Owner" },
	{ value: "TECHNICIAN", label: "Técnico" },
	{ value: "CLIENT", label: "Cliente" },
];

export const USER_STATUS_OPTIONS: {
	value: UserStatus | "";
	label: string;
}[] = [
	{ value: "", label: "Todos los estados" },
	{ value: "ACTIVE", label: "Activo" },
	{ value: "INACTIVE", label: "Inactivo" },
	{ value: "BLOCKED", label: "Bloqueado" },
	{ value: "PENDING_VERIFICATION", label: "Pendiente" },
];

export const USER_STATUS_CONFIG: Record<UserStatus, StatusConfig<UserStatus>> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activo",
		description: "El usuario puede iniciar sesión y operar normalmente.",
		tone: "success",
		order: 1,
	},
	INACTIVE: {
		value: "INACTIVE",
		label: "Inactivo",
		description: "El usuario no está habilitado para operar.",
		tone: "muted",
		order: 2,
	},
	BLOCKED: {
		value: "BLOCKED",
		label: "Bloqueado",
		description: "El usuario fue bloqueado por el sistema o un superadmin.",
		tone: "destructive",
		order: 3,
	},
	PENDING_VERIFICATION: {
		value: "PENDING_VERIFICATION",
		label: "Pendiente",
		description: "El usuario todavía debe verificar su correo.",
		tone: "warning",
		order: 4,
	},
};

export function createEmptyUserPagination(): UserPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getUserFullName(user: User | null): string {
	if (!user) {
		return "";
	}

	return `${user.first_name} ${user.last_name}`.trim();
}

export function getUserTypeLabel(userType: UserType | string | null): string {
	if (!userType) {
		return "Sin tipo";
	}

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

export function getUserStatusConfig(
	status: UserStatus | string | null
): StatusConfig<UserStatus> | undefined {
	if (!status) {
		return undefined;
	}

	return USER_STATUS_CONFIG[status as UserStatus];
}

export function getUserStatusLabel(status: UserStatus | string | null): string {
	if (!status) {
		return "Sin estado";
	}

	if (status === "PENDING_VERIFICATION") {
		return "Pendiente";
	}

	return getUserStatusConfig(status)?.label ?? status;
}

export function formatUserDate(value: string | null | undefined): string {
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
