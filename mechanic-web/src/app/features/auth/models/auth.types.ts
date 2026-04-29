export type RoleCode =
	| "CLIENT"
	| "PROVIDER_ADMIN"
	| "PLATFORM_ADMIN"
	| "TECHNICIAN";

export type UserRole = {
	id: string;
	code: RoleCode;
	name: string;
	description: string | null;
};

export type AuthUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	isActive: boolean;
	isSuperuser: boolean;
	roleCodes: RoleCode[];
	roles: UserRole[];
	createdAt: string;
	updatedAt: string;
};

export type AuthSession = {
	accessToken: string;
	tokenType: string;
	expiresInMinutes: number;
	user: AuthUser;
};
