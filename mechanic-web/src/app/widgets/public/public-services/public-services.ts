import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBot,
	lucideClipboard,
	lucideDatabase,
	lucideRoute,
	lucideShield,
	lucideSparkles,
} from "@ng-icons/lucide";

type ServiceItem = {
	icon: string;
	title: string;
	description: string;
};

@Component({
	selector: "app-public-services",
	standalone: true,
	imports: [NgIcon],
	providers: [
		provideIcons({
			lucideBot,
			lucideClipboard,
			lucideDatabase,
			lucideRoute,
			lucideShield,
			lucideSparkles,
		}),
	],
	templateUrl: "./public-services.html",
})
export class PublicServices {
	protected readonly services: ServiceItem[] = [
		{
			icon: "lucideClipboard",
			title: "Recepción de incidentes",
			description: "Captura casos desde web, QR o panel interno con contexto desde el primer minuto.",
		},
		{
			icon: "lucideSparkles",
			title: "Análisis IA",
			description: "Genera prioridad sugerida, hipótesis y siguiente acción a partir del síntoma.",
		},
		{
			icon: "lucideRoute",
			title: "Asignación y tracking",
			description: "Coordina talleres, técnicos y tiempos de llegada con visibilidad completa.",
		},
		{
			icon: "lucideShield",
			title: "Auditoría y control",
			description: "Cada cambio queda registrado para superadmin, taller y operación.",
		},
		{
			icon: "lucideBot",
			title: "Operación multirol",
			description: "Clientes, talleres, técnicos y superadmin trabajan sobre la misma fuente de verdad.",
		},
		{
			icon: "lucideDatabase",
			title: "Historial unificado",
			description: "Incidentes, ofertas, sesiones y análisis viven bajo un mismo ecosistema.",
		},
	];
}
