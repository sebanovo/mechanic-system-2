import { Component } from "@angular/core";

type ServiceItem = {
	title: string;
	description: string;
};

@Component({
	selector: "app-public-services",
	standalone: true,
	templateUrl: "./public-services.html",
})
export class PublicServices {
	protected readonly services: ServiceItem[] = [
		{
			title: "Batería descargada",
			description: "Paso de corriente, revisión inicial o cambio de batería.",
		},
		{
			title: "Cambio de llanta",
			description: "Asistencia para neumáticos dañados o desinflados.",
		},
		{
			title: "Remolque",
			description: "Traslado del vehículo a taller, domicilio o concesionario.",
		},
		{
			title: "Sobrecalentamiento",
			description:
				"Atención por temperatura alta, fuga o falta de refrigerante.",
		},
		{
			title: "Apertura de vehículo",
			description: "Ayuda cuando las llaves quedan dentro o hay bloqueo.",
		},
		{
			title: "Fallas menores",
			description:
				"Revisión rápida de fusibles, luces o terminales de batería.",
		},
	];
}
