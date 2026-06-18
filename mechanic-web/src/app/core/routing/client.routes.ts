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
			{
				path: "incidents",
				loadComponent: () =>
					import("../../pages/client/incidents/client-incidents.page").then(
						m => m.ClientIncidentsPage
					),
			},
			{
				path: "incidents/new",
				loadComponent: () =>
					import("../../pages/client/incidents/create-client-incident.page").then(
						m => m.CreateClientIncidentPage
					),
			},
			{
				path: "incidents/:incidentId",
				loadComponent: () =>
					import("../../pages/client/incidents/edit-client-incident.page").then(
						m => m.EditClientIncidentPage
					),
			},
			{
				path: "vehicles",
				loadComponent: () =>
					import("../../pages/client/vehicles/client-vehicles.page").then(
						m => m.ClientVehiclesPage
					),
			},
			{
				path: "vehicles/new",
				loadComponent: () =>
					import("../../pages/client/vehicles/create-client-vehicle.page").then(
						m => m.CreateClientVehiclePage
					),
			},
			{
				path: "vehicles/:vehicleId",
				loadComponent: () =>
					import("../../pages/client/vehicles/edit-client-vehicle.page").then(
						m => m.EditClientVehiclePage
					),
			},
			{
				path: "assignments",
				loadComponent: () =>
					import("../../pages/client/assignments/client-assignments.page").then(
						m => m.ClientAssignmentsPage
					),
			},
			{
				path: "sessions",
				loadComponent: () =>
					import("../../pages/client/sessions/client-sessions.page").then(
						m => m.ClientSessionsPage
					),
			},
			{
				path: "notifications",
				loadComponent: () =>
					import("../../pages/client/notifications/client-notifications.page").then(
						m => m.ClientNotificationsPage
					),
			},
			{
				path: "tracking",
				loadComponent: () =>
					import("../../pages/client/tracking/client-tracking.page").then(
						m => m.ClientTrackingPage
					),
			},
			{
				path: "profile",
				loadComponent: () =>
					import("../../pages/client/profile/client-profile.page").then(
						m => m.ClientProfilePage
					),
			},
		],
	},
];
