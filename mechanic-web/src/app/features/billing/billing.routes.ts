import { Routes } from "@angular/router";

export const BILLING_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "list",
		pathMatch: "full",
	},
	{
		path: "list",
		loadComponent: () =>
			import("./pages/billing-page/billing-page").then(m => m.BillingPage),
	},
];
