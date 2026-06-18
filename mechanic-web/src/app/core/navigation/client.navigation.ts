import { APP_ROUTES } from "../routing/app-routes.constants";
import { NavigationGroup } from "./navigation.types";

export const CLIENT_NAVIGATION: NavigationGroup[] = [
	{
		id: "client-main",
		items: [
			{
				id: "client-dashboard",
				label: "Dashboard",
				icon: "dashboard",
				route: APP_ROUTES.client.dashboard,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-incidents",
				label: "Mis incidentes",
				icon: "clipboard",
				route: APP_ROUTES.client.incidents,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-vehicles",
				label: "Mis vehículos",
				icon: "car",
				route: APP_ROUTES.client.vehicles,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-assignments",
				label: "Mis asignaciones",
				icon: "map",
				route: APP_ROUTES.client.assignments,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-tracking",
				label: "Tracking en vivo",
				icon: "satellite",
				route: APP_ROUTES.client.tracking,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-sessions",
				label: "Sesiones",
				icon: "clock",
				route: APP_ROUTES.client.sessions,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-notifications",
				label: "Notificaciones",
				icon: "bell",
				route: APP_ROUTES.client.notifications,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
			{
				id: "client-profile",
				label: "Perfil",
				icon: "users",
				route: APP_ROUTES.client.profile,
				context: ["CLIENT"],
				allowedUserTypes: ["CLIENT"],
				requiresAuth: true,
			},
		],
	},
];

