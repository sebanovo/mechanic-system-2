import { Routes } from "@angular/router";

import { authGuard } from "../guards/auth.guard";
import { userTypeGuard } from "../guards/user-type.guard";
import { PrivateLayout } from "../layouts/private-layout/private-layout";

export const CLIENT_ROUTES: Routes = [
	{
		path: "client",
		component: PrivateLayout,
		canActivate: [authGuard, userTypeGuard(["CLIENT"])],
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "dashboard",
			},
			{
				path: "dashboard",
				loadComponent: () =>
					import("../../pages/client/dashboard/client-dashboard.page").then(
						m => m.ClientDashboardPage
					),
			},
		],
	},
];
