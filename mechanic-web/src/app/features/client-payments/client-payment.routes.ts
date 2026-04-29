import { Routes } from "@angular/router";

export const CLIENT_PAYMENT_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "list",
		pathMatch: "full",
	},
	{
		path: "list",
		loadComponent: () =>
			import("./pages/client-payment-page/client-payment-page").then(
				m => m.ClientPaymentPage
			),
	},
];
