export type DemoRole =
	| "CLIENT"
	| "PLATFORM_ADMIN"
	| "PROVIDER_ADMIN"
	| "TECHNICIAN";

export type DemoStepStatus = "READY" | "OPTIONAL" | "POSTMAN" | "DONE";

export type DemoStep = {
	order: number;
	title: string;
	description: string;
	role: DemoRole;
	route: string | null;
	status: DemoStepStatus;
	expectedResult: string;
};

export type DemoRoleFlow = {
	role: DemoRole;
	title: string;
	description: string;
	routes: DemoRouteLink[];
};

export type DemoRouteLink = {
	label: string;
	route: string;
	description: string;
};

export type DemoModuleGroup = {
	title: string;
	description: string;
	modules: DemoModule[];
};

export type DemoModule = {
	name: string;
	route: string;
	roles: DemoRole[];
	purpose: string;
};
