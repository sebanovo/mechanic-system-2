import { Routes } from "@angular/router";

import { authGuard } from "./core/session/guards/auth.guard";
import { roleGuard } from "./core/session/guards/role.guard";
import { AdminAuthLayout } from "./core/layout/layouts/admin-auth-layout/admin-auth-layout";
import { AppLayout } from "./core/layout/layouts/app-layout/app-layout";
import { AuthLayout } from "./core/layout/layouts/auth-layout/auth-layout";
import { PublicLayout } from "./core/layout/layouts/public-layout/public-layout";

export const routes: Routes = [
	{
		path: "",
		component: PublicLayout,
		children: [
			{
				path: "",
				loadChildren: () =>
					import("./features/public/public.routes").then(m => m.PUBLIC_ROUTES),
			},
		],
	},

	{
		path: "auth",
		component: AuthLayout,
		children: [
			{
				path: "",
				loadChildren: () =>
					import("./features/auth/auth.routes").then(m => m.AUTH_ROUTES),
			},
		],
	},

	{
		path: "",
		component: AdminAuthLayout,
		children: [
			{
				path: "platform/auth",
				loadChildren: () =>
					import("./features/auth/auth.routes").then(m => m.ADMIN_ROUTES),
			},
		],
	},

	{
		path: "app",
		canActivate: [authGuard],
		component: AppLayout,
		children: [
			{
				path: "",
				redirectTo: "dashboard",
				pathMatch: "full",
			},

			{
				path: "dashboard",
				canActivate: [roleGuard],
				data: {
					roles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "CLIENT", "TECHNICIAN"],
				},
				loadChildren: () =>
					import("./features/dashboard/dashboard.routes").then(
						m => m.DASHBOARD_ROUTES
					),
			},

			{
				path: "empresa",
				canActivate: [roleGuard],
				data: {
					roles: ["PROVIDER_ADMIN"],
				},
				loadChildren: () =>
					import("./features/mi-empresa/mi-empresa.routes").then(
						m => m.MI_EMPRESA_ROUTES
					),
			},

			{
				path: "provider-me",
				canActivate: [roleGuard],
				data: {
					roles: ["PROVIDER_ADMIN"],
				},
				loadChildren: () =>
					import("./features/provider-me/provider-me.routes").then(
						m => m.PROVIDER_ME_ROUTES
					),
			},

			{
				path: "service-me",
				canActivate: [roleGuard],
				data: {
					roles: ["PROVIDER_ADMIN"],
				},
				loadChildren: () =>
					import("./features/services/service.routes").then(
						m => m.SERVICE_ROUTES
					),
			},

			{
				path: "candidates",
				canActivate: [roleGuard],
				data: {
					roles: ["PROVIDER_ADMIN"],
				},
				loadChildren: () =>
					import("./features/candidates/candidate.routes").then(
						m => m.CANDIDATE_ROUTES
					),
			},

			{
				path: "incidents-me",
				canActivate: [roleGuard],
				data: {
					roles: ["PROVIDER_ADMIN"],
				},
				loadChildren: () =>
					import("./features/provider-incidents/incident.routes").then(
						m => m.INCIDENT_ROUTES
					),
			},

			{
				path: "providers",
				canActivate: [roleGuard],
				data: {
					roles: ["PLATFORM_ADMIN"],
				},
				loadChildren: () =>
					import("./features/providers/provider.routes").then(
						m => m.PROVIDERS_ROUTES
					),
			},

			{
				path: "catalogs",
				canActivate: [roleGuard],
				data: {
					roles: ["PLATFORM_ADMIN"],
				},
				loadChildren: () =>
					import("./features/catalog-services/catalog-service.routes").then(
						m => m.CATALOG_ROUTES
					),
			},

			{
				path: "users",
				canActivate: [roleGuard],
				data: {
					roles: ["PLATFORM_ADMIN"],
				},
				loadChildren: () =>
					import("./features/users/users.routes").then(m => m.USERS_ROUTES),
			},

			{
				path: "incidents",
				canActivate: [roleGuard],
				data: {
					roles: ["PLATFORM_ADMIN"],
				},
				loadChildren: () =>
					import("./features/provider-incidents/incident.routes").then(
						m => m.INCIDENT_ROUTES
					),
			},
      {
	      path: "operations",
	      canActivate: [roleGuard],
	      data: {
		      roles: ["PROVIDER_ADMIN"],
	      },
	      loadChildren: () =>
		      import("./features/operations/operations.routes").then(
			      m => m.OPERATIONS_ROUTES
		  ),
      },
      {
	path: "tracking",
	canActivate: [roleGuard],
	data: {
		roles: ["PROVIDER_ADMIN"],
	},
	loadChildren: () =>
		import("./features/tracking/tracking.routes").then(
			m => m.TRACKING_ROUTES
		),
},

{
	path: "billing",
	canActivate: [roleGuard],
	data: {
		roles: ["PROVIDER_ADMIN"],
	},
	loadChildren: () =>
		import("./features/billing/billing.routes").then(m => m.BILLING_ROUTES),
},
{
	path: "payments",
	redirectTo: "billing",
	pathMatch: "full",
},




			{
				path: "forbidden",
				loadComponent: () =>
					import(
						"./features/not-found/pages/private-not-found-page/private-not-found-page"
					).then(m => m.PrivateNotFoundPage),
			},

			{
				path: "**",
				loadComponent: () =>
					import(
						"./features/not-found/pages/private-not-found-page/private-not-found-page"
					).then(m => m.PrivateNotFoundPage),
			},
		],
	},

	{
		path: "**",
		loadComponent: () =>
			import(
				"./features/not-found/pages/public-not-found-page/public-not-found-page"
			).then(m => m.PublicNotFoundPage),
	},
];
