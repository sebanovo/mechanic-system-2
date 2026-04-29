import { AppNavigationItem } from "../models/navigation.type";

export const APP_NAVIGATION: AppNavigationItem[] = [
	{
		type: "section",
		label: "Administración",
	},
	{
		label: "Dashboard",
		route: "/app/dashboard",
		exact: true,
		icon: {
			type: "remix",
			name: "ri-dashboard-line",
		},
		allowedRoles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN"],
	},
	{
		label: "Usuarios",
		route: "/app/users",
		icon: {
			type: "lucide",
			name: "users",
		},
		allowedRoles: ["PLATFORM_ADMIN"],
	},
	{
		label: "Proveedores",
		route: "/app/providers",
		icon: {
			type: "remix",
			name: "ri-building-line",
		},
		allowedRoles: ["PLATFORM_ADMIN"],
	},
	{
		label: "Catálogos",
		route: "/app/catalogs",
		icon: {
			type: "remix",
			name: "ri-price-tag-3-line",
		},
		allowedRoles: ["PLATFORM_ADMIN"],
	},

	{
		type: "section",
		label: "Taller",
	},
	{
		label: "Mi empresa",
		route: "/app/empresa/profile",
		exact: true,
		icon: {
			type: "remix",
			name: "ri-building2-line",
		},
		allowedRoles: ["PROVIDER_ADMIN"],
	},
	{
		label: "Mis técnicos",
		route: "/app/provider-me",
		exact: true,
		icon: {
			type: "remix",
			name: "ri-team-line",
		},
		allowedRoles: ["PROVIDER_ADMIN"],
	},
	{
		label: "Mis servicios",
		route: "/app/service-me",
		icon: {
			type: "remix",
			name: "ri-price-tag-3-line",
		},
		allowedRoles: ["PROVIDER_ADMIN"],
	},

	{
		type: "section",
		label: "Operación",
	},
	{
		label: "Solicitudes disponibles",
		route: "/app/candidates",
		icon: {
			type: "lucide",
			name: "target",
		},
		allowedRoles: ["PROVIDER_ADMIN"],
	},
	{
		label: "Trabajo aceptado",
		route: "/app/incidents-me",
		icon: {
			type: "lucide",
			name: "briefcase",
		},
		allowedRoles: ["PROVIDER_ADMIN"],
	},
	{
		label: "Incidentes",
		route: "/app/incidents",
		icon: {
			type: "remix",
			name: "ri-dashboard-line",
		},
		allowedRoles: ["PLATFORM_ADMIN"],
	},
];
