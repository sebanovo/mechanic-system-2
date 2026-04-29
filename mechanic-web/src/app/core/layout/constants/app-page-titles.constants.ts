export type AppPageTitleItem = {
	route: string;
	title: string;
	subtitle: string;
};

export const APP_PAGE_TITLE: AppPageTitleItem[] = [
	{
		route: "/app/dashboard",
		title: "Dashboard",
		subtitle: "Vista general de la plataforma",
	},
	{
		route: "/app/users",
		title: "Usuarios",
		subtitle: "Gestión de usuarios del sistema",
	},
	{
		route: "/app/providers",
		title: "Proveedores",
		subtitle: "Gestión de talleres y mecánicos independientes",
	},
	{
		route: "/app/catalogs",
		title: "Catálogos",
		subtitle: "Servicios maestros de auxilio mecánico",
	},
	{
		route: "/app/empresa/profile",
		title: "Mi empresa",
		subtitle: "Perfil operativo del taller",
	},
	{
		route: "/app/provider-me",
		title: "Mis técnicos",
		subtitle: "Gestión de técnicos disponibles",
	},
	{
		route: "/app/service-me",
		title: "Mis servicios",
		subtitle: "Servicios ofrecidos por el taller",
	},
	{
		route: "/app/candidates",
		title: "Solicitudes disponibles",
		subtitle: "Incidentes recomendados para aceptar o rechazar",
	},
	{
		route: "/app/incidents-me",
		title: "Trabajo aceptado",
		subtitle: "Incidentes asignados al taller",
	},
	{
		route: "/app/incidents",
		title: "Incidentes",
		subtitle: "Monitoreo administrativo de incidentes",
	},
  {
	route: "/app/operations",
	title: "Operaciones",
	subtitle: "Gestión operativa de servicios aceptados",
},
  {
	route: "/app/tracking",
	title: "Seguimiento",
	subtitle: "Tracking de técnico, incidente, distancia y ETA",
},
{
	route: "/app/billing",
	title: "Cobros",
	subtitle: "Gestión de precios, pagos y comisión de plataforma",
},

{
	route: "/app/notifications",
	title: "Notificaciones",
	subtitle: "Dispositivos, tokens push y entregas de notificaciones",
},

{
	route: "/app/platform-admin",
	title: "Admin técnico",
	subtitle: "Jobs IA, auditoría y snapshots de métricas",
},


{
	route: "/app/client-portal",
	title: "Portal cliente",
	subtitle: "Vehículos, emergencias y evidencias del cliente",
},

{
	route: "/app/client-payments",
	title: "Pagos y calificaciones",
	subtitle: "Checkout simulado, pago y rating del servicio",
},

{
	route: "/app/platform-assignment",
	title: "Asignación inteligente",
	subtitle: "Publicación de incidentes y ranking de talleres candidatos",
},

{
	route: "/app/subscriptions",
	title: "Suscripciones",
	subtitle: "Planes de auxilio, coberturas y aplicaciones por incidente",
},

{
	route: "/app/demo-flow",
	title: "Flujo completo",
	subtitle: "Centro de defensa, checklist funcional y mapa de módulos",
},






];
