import { Routes } from "@angular/router";

export const PLATFORM_ADMIN_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "tools",
		pathMatch: "full",
	},
	{
		path: "tools",
		loadComponent: () =>
			import("./pages/platform-admin-page/platform-admin-page").then(
				m => m.PlatformAdminPage
			),
	},
];
