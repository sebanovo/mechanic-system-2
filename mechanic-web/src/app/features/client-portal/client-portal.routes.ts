import { Routes } from "@angular/router";

export const CLIENT_PORTAL_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "home",
		loadComponent: () =>
			import("./pages/client-portal-page/client-portal-page").then(
				m => m.ClientPortalPage
			),
	},
];
