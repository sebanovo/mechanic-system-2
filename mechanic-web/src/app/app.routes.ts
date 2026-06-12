import { Routes } from "@angular/router";

import {
	AUTH_ROUTES,
	CLIENT_ROUTES,
	PLATFORM_ROUTES,
	PUBLIC_ROUTES,
	TENANT_ROUTES,
} from "./core/routing";

export const routes: Routes = [
	...PUBLIC_ROUTES,
	...AUTH_ROUTES,
	...CLIENT_ROUTES,
	...TENANT_ROUTES,
	...PLATFORM_ROUTES,

	{
		path: "**",
		redirectTo: "",
	},
];

// import { Routes } from "@angular/router";

// import { AdminAuthLayout } from "./core-last/layout/layouts/admin-auth-layout/admin-auth-layout";
// import { AppLayout } from "./core-last/layout/layouts/app-layout/app-layout";
// import { AuthLayout } from "./core-last/layout/layouts/auth-layout/auth-layout";
// import { PublicLayout } from "./core-last/layout/layouts/public-layout/public-layout";
// import { roleGuard } from "./core-last/session/guards/role.guard";

// export const routes: Routes = [
// 	{
// 		path: "",
// 		component: PublicLayout,
// 		children: [
// 			{
// 				path: "",
// 				loadChildren: () =>
// 					import("./features-last/public/public.routes").then(
// 						m => m.PUBLIC_ROUTES
// 					),
// 			},
// 		],
// 	},

// 	{
// 		path: "auth",
// 		component: AuthLayout,
// 		children: [
// 			{
// 				path: "",
// 				loadChildren: () =>
// 					import("./features-last/auth/auth.routes").then(m => m.AUTH_ROUTES),
// 			},
// 		],
// 	},

// 	{
// 		path: "",
// 		component: AdminAuthLayout,
// 		children: [
// 			{
// 				path: "platform/auth",
// 				loadChildren: () =>
// 					import("./features-last/auth/auth.routes").then(m => m.ADMIN_ROUTES),
// 			},
// 		],
// 	},

// 	{
// 		path: "app",
// 		// canActivate: [authGuard],
// 		component: AppLayout,
// 		children: [
// 			{
// 				path: "",
// 				redirectTo: "dashboard",
// 				pathMatch: "full",
// 			},

// 			{
// 				path: "dashboard",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "CLIENT", "TECHNICIAN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/dashboard/dashboard.routes").then(
// 						m => m.DASHBOARD_ROUTES
// 					),
// 			},

// 			{
// 				path: "empresa",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/mi-empresa/mi-empresa.routes").then(
// 						m => m.MI_EMPRESA_ROUTES
// 					),
// 			},

// 			{
// 				path: "provider-me",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/provider-me/provider-me.routes").then(
// 						m => m.PROVIDER_ME_ROUTES
// 					),
// 			},

// 			{
// 				path: "service-me",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/services/service.routes").then(
// 						m => m.SERVICE_ROUTES
// 					),
// 			},

// 			{
// 				path: "candidates",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/candidates/candidate.routes").then(
// 						m => m.CANDIDATE_ROUTES
// 					),
// 			},

// 			{
// 				path: "incidents-me",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/provider-incidents/incident.routes").then(
// 						m => m.INCIDENT_ROUTES
// 					),
// 			},

// 			{
// 				path: "providers",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/providers/provider.routes").then(
// 						m => m.PROVIDERS_ROUTES
// 					),
// 			},

// 			{
// 				path: "catalogs",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/catalog-services/catalog-service.routes").then(
// 						m => m.CATALOG_ROUTES
// 					),
// 			},

// 			{
// 				path: "users",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/users/users.routes").then(
// 						m => m.USERS_ROUTES
// 					),
// 			},

// 			{
// 				path: "incidents",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/provider-incidents/incident.routes").then(
// 						m => m.INCIDENT_ROUTES
// 					),
// 			},
// 			{
// 				path: "operations",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/operations/operations.routes").then(
// 						m => m.OPERATIONS_ROUTES
// 					),
// 			},
// 			{
// 				path: "tracking",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/tracking/tracking.routes").then(
// 						m => m.TRACKING_ROUTES
// 					),
// 			},

// 			{
// 				path: "billing",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/billing/billing.routes").then(
// 						m => m.BILLING_ROUTES
// 					),
// 			},
// 			{
// 				path: "payments",
// 				redirectTo: "billing",
// 				pathMatch: "full",
// 			},

// 			{
// 				path: "notifications",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "TECHNICIAN", "CLIENT"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/notifications/notification.routes").then(
// 						m => m.NOTIFICATION_ROUTES
// 					),
// 			},

// 			{
// 				path: "platform-admin",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/platform-admin/platform-admin.routes").then(
// 						m => m.PLATFORM_ADMIN_ROUTES
// 					),
// 			},

// 			{
// 				path: "client-portal",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["CLIENT"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/client-portal/client-portal.routes").then(
// 						m => m.CLIENT_PORTAL_ROUTES
// 					),
// 			},

// 			{
// 				path: "client-payments",
// 				// canActivate: [roleGuard],
// 				data: {
// 					roles: ["CLIENT"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/client-payments/client-payment.routes").then(
// 						m => m.CLIENT_PAYMENT_ROUTES
// 					),
// 			},

// 			{
// 				path: "platform-assignment",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/platform-assignment/platform-assignment.routes").then(
// 						m => m.PLATFORM_ASSIGNMENT_ROUTES
// 					),
// 			},

// 			{
// 				path: "subscriptions",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PROVIDER_ADMIN", "CLIENT", "PLATFORM_ADMIN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/subscriptions/subscription.routes").then(
// 						m => m.SUBSCRIPTION_ROUTES
// 					),
// 			},

// 			{
// 				path: "demo-flow",
// 				canActivate: [roleGuard],
// 				data: {
// 					roles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "CLIENT", "TECHNICIAN"],
// 				},
// 				loadChildren: () =>
// 					import("./features-last/demo-flow/demo-flow.routes").then(
// 						m => m.DEMO_FLOW_ROUTES
// 					),
// 			},

// 			{
// 				path: "forbidden",
// 				loadComponent: () =>
// 					import("./features-last/not-found/pages/private-not-found-page/private-not-found-page").then(
// 						m => m.PrivateNotFoundPage
// 					),
// 			},

// 			{
// 				path: "**",
// 				loadComponent: () =>
// 					import("./features-last/not-found/pages/private-not-found-page/private-not-found-page").then(
// 						m => m.PrivateNotFoundPage
// 					),
// 			},
// 		],
// 	},

// 	{
// 		path: "**",
// 		loadComponent: () =>
// 			import("./features-last/not-found/pages/public-not-found-page/public-not-found-page").then(
// 				m => m.PublicNotFoundPage
// 			),
// 	},
// ];
