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

export function getUserFullName(user: User | null): string {
	if (!user) {
		return "";
	}

	return `${user.first_name} ${user.last_name}`.trim();
}
