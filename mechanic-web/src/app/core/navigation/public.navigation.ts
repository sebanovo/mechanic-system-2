import { APP_ROUTES } from "../routing/app-routes.constants";
import { NavigationGroup } from "./navigation.types";

export const PUBLIC_NAVIGATION: NavigationGroup[] = [
	{
		id: "public-main",
		items: [
			{
				id: "home",
				label: "Inicio",
				fragment: "home",
				context: ["PUBLIC"],
			},
			{
				id: "how-it-works",
				label: "Cómo funciona",
				fragment: "how-it-works",
				context: ["PUBLIC"],
			},
			{
				id: "services",
				label: "Servicios",
				fragment: "services",
				context: ["PUBLIC"],
			},
			{
				id: "for-workshops",
				label: "Para talleres",
				fragment: "for-workshops",
				context: ["PUBLIC"],
			},
			{
				id: "contact",
				label: "Contacto",
				fragment: "contact",
				context: ["PUBLIC"],
			},
			{
				id: "login",
				label: "Iniciar sesión",
				route: APP_ROUTES.auth.login,
				context: ["PUBLIC"],
			},
			{
				id: "register",
				label: "Crear cuenta",
				route: APP_ROUTES.auth.register,
				context: ["PUBLIC"],
			},
		],
	},
];
