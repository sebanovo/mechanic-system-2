import { Routes } from "@angular/router";

export const TRACKING_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "list",
		pathMatch: "full",
	},
	{
		path: "list",
		loadComponent: () =>
			import("./pages/tracking-page/tracking-page").then(
				m => m.TrackingPage
			),
	},
];
