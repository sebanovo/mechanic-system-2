export type AppContext = "PUBLIC" | "AUTH" | "CLIENT" | "TENANT" | "PLATFORM";

export type UserType = "SUPERADMIN" | "TENANT_OWNER" | "TECHNICIAN" | "CLIENT";

export type NavigationIcon =
	| "home"
	| "dashboard"
	| "users"
	| "building"
	| "car"
	| "wrench"
	| "clipboard"
	| "bell"
	| "settings"
	| "shield"
	| "file-text"
	| "map"
	| "briefcase"
	| "list-checks"
	| "bot"
	| "database"
	| "clock"
	| "route";

export type NavigationUserContext = {
	isAuthenticated: boolean;
	userType: UserType | null;
	roles: string[];
	permissions: string[];
	tenantSelected: boolean;
};

export type NavigationItem = {
	id: string;
	label: string;
	route?: string;
	fragment?: string;
	icon?: NavigationIcon;
	exact?: boolean;

	context: AppContext[];

	allowedUserTypes?: UserType[];
	requiredRoles?: string[];
	requiredPermissions?: string[];

	requiresAuth?: boolean;
	requiresTenant?: boolean;

	children?: NavigationItem[];
};

export type NavigationGroup = {
	id: string;
	label?: string;
	items: NavigationItem[];
};
