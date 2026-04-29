import { Routes } from "@angular/router";

export const SUBSCRIPTION_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "center",
		pathMatch: "full",
	},
	{
		path: "center",
		loadComponent: () =>
			import("./pages/subscription-page/subscription-page").then(
				m => m.SubscriptionPage
			),
	},
];
