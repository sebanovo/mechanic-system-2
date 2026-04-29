import { Routes } from "@angular/router";

export const NOTIFICATION_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "list",
		pathMatch: "full",
	},
	{
		path: "list",
		loadComponent: () =>
			import("./pages/notification-page/notification-page").then(
				m => m.NotificationPage
			),
	},
];
