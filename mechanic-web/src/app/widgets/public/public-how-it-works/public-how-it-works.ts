import { Component } from "@angular/core";

type StepItem = {
	number: string;
	title: string;
	description: string;
};

@Component({
	selector: "app-public-how-it-works",
	standalone: true,
	templateUrl: "./public-how-it-works.html",
})
export class PublicHowItWorks {
	protected readonly steps: StepItem[] = [
		{
			number: "01",
			title: "El cliente reporta un incidente",
			description:
				"Indica el problema, vehículo y ubicación desde la aplicación.",
		},
		{
			number: "02",
			title: "El sistema busca talleres disponibles",
			description:
				"Se generan candidatos según servicio, disponibilidad y cercanía.",
		},
		{
			number: "03",
			title: "El taller acepta la solicitud",
			description: "El taller revisa el caso y confirma si puede atenderlo.",
		},
		{
			number: "04",
			title: "Se asigna un técnico",
			description:
				"El cliente recibe información del técnico y seguimiento de la atención.",
		},
	];
}
