import { Routes } from "@angular/router";

import { authGuard } from "../guards/auth.guard";
import { tenantSelectedGuard } from "../guards/tenant-selected.guard";
import { userTypeGuard } from "../guards/user-type.guard";
import { PrivateLayout } from "../layouts/private-layout/private-layout";

export const TENANT_ROUTES: Routes = [
	{
		path: "tenant",
		component: PrivateLayout,
		canActivate: [
			authGuard,
			userTypeGuard(["TENANT_OWNER", "TECHNICIAN"]),
			tenantSelectedGuard,
		],
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "dashboard",
			},
			{
				path: "dashboard",
				loadComponent: () =>
					import("../../pages/tenant/dashboard/tenant-dashboard.page").then(
						m => m.TenantDashboardPage
					),
			},
			{
				path: "candidates",
				canActivate: [userTypeGuard(["TENANT_OWNER", "TECHNICIAN"])],
				loadComponent: () =>
					import("../../pages/tenant/candidates/tenant-candidates.page").then(
						m => m.TenantCandidatesPage
					),
			},
			{
				path: "offers",
				canActivate: [userTypeGuard(["TENANT_OWNER", "TECHNICIAN"])],
				loadComponent: () =>
					import("../../pages/tenant/offers/tenant-offers.page").then(
						m => m.TenantOffersPage
					),
			},
			{
				path: "assignments",
				canActivate: [userTypeGuard(["TENANT_OWNER", "TECHNICIAN"])],
				loadComponent: () =>
					import("../../pages/tenant/assignments/tenant-assignments.page").then(
						m => m.TenantAssignmentsPage
					),
			},
			{
				path: "tracking-events",
				canActivate: [userTypeGuard(["TENANT_OWNER", "TECHNICIAN"])],
				loadComponent: () =>
					import("../../pages/tenant/tracking-events/tenant-tracking-events.page").then(
						m => m.TenantTrackingEventsPage
					),
			},
			{
				path: "technicians",
				canActivate: [userTypeGuard(["TENANT_OWNER"])],
				loadComponent: () =>
					import("../../pages/tenant/technicians/tenant-technicians.page").then(
						m => m.TenantTechniciansPage
					),
			},
			{
				path: "members",
				canActivate: [userTypeGuard(["TENANT_OWNER"])],
				loadComponent: () =>
					import("../../pages/tenant/members/tenant-members.page").then(
						m => m.TenantMembersPage
					),
			},
			{
				path: "services",
				canActivate: [userTypeGuard(["TENANT_OWNER"])],
				loadComponent: () =>
					import("../../pages/tenant/services/tenant-services.page").then(
						m => m.TenantServicesPage
					),
			},
			{
				path: "technician-services",
				canActivate: [userTypeGuard(["TENANT_OWNER"])],
				loadComponent: () =>
					import("../../pages/tenant/technician-services/tenant-technician-services.page").then(
						m => m.TenantTechnicianServicesPage
					),
			},
			{
				path: "availability",
				canActivate: [userTypeGuard(["TENANT_OWNER"])],
				loadComponent: () =>
					import("../../pages/tenant/availability/tenant-availability.page").then(
						m => m.TenantAvailabilityPage
					),
			},
			{
				path: "catalog",
				canActivate: [userTypeGuard(["TENANT_OWNER", "TECHNICIAN"])],
				loadComponent: () =>
					import("../../pages/tenant/catalog/tenant-catalog.page").then(
						m => m.TenantCatalogPage
					),
			},
			{
				path: "settings",
				canActivate: [userTypeGuard(["TENANT_OWNER"])],
				loadComponent: () =>
					import("../../pages/tenant/settings/tenant-settings.page").then(
						m => m.TenantSettingsPage
					),
			},
		],
	},
];
