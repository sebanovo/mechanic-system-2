import { Routes } from "@angular/router";

export const OPERATIONS_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "list",
		pathMatch: "full",
	},
	{
		path: "list",
		loadComponent: () =>
			import("./pages/operation-list-page/operation-list-page").then(
				m => m.OperationListPage
			),
	},
];
