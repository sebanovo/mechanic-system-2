import { Routes } from "@angular/router";

import { authGuard } from "../guards/auth.guard";
import { userTypeGuard } from "../guards/user-type.guard";
import { PrivateLayout } from "../layouts/private-layout/private-layout";

export const PLATFORM_ROUTES: Routes = [
	{
		path: "platform",
		component: PrivateLayout,
		canActivate: [authGuard, userTypeGuard(["SUPERADMIN"])],
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "dashboard",
			},
			{
				path: "dashboard",
				loadComponent: () =>
					import("../../pages/platform/dashboard/platform-dashboard.page").then(
						m => m.PlatformDashboardPage
					),
			},
			{
				path: "service-catalog",
				loadComponent: () =>
					import("../../pages/platform/service-catalog/platform-service-catalog.page").then(
						m => m.PlatformServiceCatalogPage
					),
			},
		],
	},
];
