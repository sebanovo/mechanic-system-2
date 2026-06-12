import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCircleDot,
	lucideSatellite,
	lucideSparkles,
	lucideWorkflow,
} from "@ng-icons/lucide";

type StepItem = {
	icon: string;
	number: string;
	title: string;
	description: string;
};

@Component({
	selector: "app-public-how-it-works",
	standalone: true,
	imports: [NgIcon],
	providers: [
		provideIcons({
			lucideCircleDot,
			lucideSatellite,
			lucideSparkles,
			lucideWorkflow,
		}),
	],
	templateUrl: "./public-how-it-works.html",
})
export class PublicHowItWorks {
	protected readonly steps: StepItem[] = [
		{
			icon: "circle-dot",
			number: "01",
			title: "Se registra el incidente",
			description: "Cliente, QR o panel interno capturan síntoma, ubicación y contexto del caso.",
		},
		{
			icon: "sparkles",
			number: "02",
			title: "La IA sugiere prioridad y diagnóstico",
			description: "El sistema propone servicio probable, prioridad y notas de análisis.",
		},
		{
			icon: "workflow",
			number: "03",
			title: "Se asigna taller y técnico",
			description: "La operación confirma disponibilidad, oferta y seguimiento operativo.",
		},
		{
			icon: "satellite",
			number: "04",
			title: "Se monitorea hasta el cierre",
			description: "Queda trazabilidad de ruta, tiempos, auditoría y resultado final.",
		},
	];
}
