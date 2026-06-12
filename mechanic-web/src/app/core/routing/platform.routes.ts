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
				path: "users",
				loadComponent: () =>
					import("../../pages/platform/users/platform-users.page").then(
						m => m.PlatformUsersPage
					),
			},
			{
				path: "service-catalog",
				loadComponent: () =>
					import("../../pages/platform/service-catalog/platform-service-catalog.page").then(
						m => m.PlatformServiceCatalogPage
					),
			},
			{
				path: "incident-ai-analyses",
				loadComponent: () =>
					import("../../pages/platform/incident-ai-analyses/platform-incident-ai-analyses.page").then(
						m => m.PlatformIncidentAiAnalysesPage
					),
			},
			{
				path: "incidents",
				loadComponent: () =>
					import("../../pages/platform/incidents/platform-incidents.page").then(
						m => m.PlatformIncidentsPage
					),
			},
			{
				path: "incident-offers",
				loadComponent: () =>
					import("../../pages/platform/incident-offers/platform-incident-offers.page").then(
						m => m.PlatformIncidentOffersPage
					),
			},
			{
				path: "audit",
				loadComponent: () =>
					import("../../pages/platform/audit/platform-audit.page").then(
						m => m.PlatformAuditPage
					),
			},
		],
	},
];
