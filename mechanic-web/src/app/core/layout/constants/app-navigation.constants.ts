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
  {
	label: "Operaciones",
	route: "/app/operations",
	icon: {
		type: "remix",
		name: "ri-tools-line",
	},
	allowedRoles: ["PROVIDER_ADMIN"],
},
{
	label: "Seguimiento",
	route: "/app/tracking",
	icon: {
		type: "remix",
		name: "ri-map-pin-line",
	},
	allowedRoles: ["PROVIDER_ADMIN"],
},

{
	label: "Cobros",
	route: "/app/billing",
	icon: {
		type: "remix",
		name: "ri-money-dollar-circle-line",
	},
	allowedRoles: ["PROVIDER_ADMIN"],
},

{
	type: "section",
	label: "Sistema",
},
{
	label: "Notificaciones",
	route: "/app/notifications",
	icon: {
		type: "remix",
		name: "ri-notification-3-line",
	},
	allowedRoles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "TECHNICIAN", "CLIENT"],
},


{
	type: "section",
	label: "Plataforma",
},

{
	label: "Asignación inteligente",
	route: "/app/platform-assignment",
	icon: {
		type: "remix",
		name: "ri-route-line",
	},
	allowedRoles: ["PLATFORM_ADMIN"],
},


{
	label: "Admin técnico",
	route: "/app/platform-admin",
	icon: {
		type: "remix",
		name: "ri-terminal-box-line",
	},
	allowedRoles: ["PLATFORM_ADMIN"],
},




{
	type: "section",
	label: "Cliente",
},
{
	label: "Portal cliente",
	route: "/app/client-portal",
	icon: {
		type: "remix",
		name: "ri-car-line",
	},
	allowedRoles: ["CLIENT"],
},


{
	label: "Pagos y calificaciones",
	route: "/app/client-payments",
	icon: {
		type: "remix",
		name: "ri-bank-card-line",
	},
	allowedRoles: ["CLIENT"],
},



];
