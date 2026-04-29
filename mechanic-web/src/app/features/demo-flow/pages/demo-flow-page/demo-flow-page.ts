import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import {
	DemoModuleGroup,
	DemoRole,
	DemoRoleFlow,
	DemoStep,
	DemoStepStatus,
} from "../../models/demo-flow.types";

@Component({
	selector: "app-demo-flow-page",
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: "./demo-flow-page.html",
	styleUrl: "./demo-flow-page.css",
})
export class DemoFlowPage {
	readonly defenseFlow: DemoStep[] = [
		{
			order: 1,
			role: "CLIENT",
			title: "Registrar vehículo",
			description:
				"El cliente registra su vehículo para poder asociarlo a una emergencia.",
			route: "/app/client-portal",
			status: "READY",
			expectedResult: "Vehículo creado y visible en el selector de emergencias.",
		},
		{
			order: 2,
			role: "CLIENT",
			title: "Reportar emergencia",
			description:
				"El cliente reporta el problema, ubicación, prioridad y descripción inicial.",
			route: "/app/client-portal",
			status: "READY",
			expectedResult: "Incidente creado en estado inicial.",
		},
		{
			order: 3,
			role: "CLIENT",
			title: "Adjuntar evidencias",
			description:
				"El cliente agrega texto, imagen o audio para alimentar el diagnóstico.",
			route: "/app/client-portal",
			status: "READY",
			expectedResult: "Evidencias registradas y visibles en el incidente.",
		},
		{
			order: 4,
			role: "PLATFORM_ADMIN",
			title: "Procesar IA y revisar jobs",
			description:
				"El administrador técnico puede revisar o encolar procesamiento de audio, imagen y resumen IA.",
			route: "/app/platform-admin",
			status: "READY",
			expectedResult: "Jobs de procesamiento visibles y auditables.",
		},
		{
			order: 5,
			role: "PLATFORM_ADMIN",
			title: "Publicar incidente para asignación",
			description:
				"El sistema genera candidatos de talleres según disponibilidad, distancia, servicios, capacidad y score.",
			route: "/app/platform-assignment",
			status: "READY",
			expectedResult: "Lista de candidatos generada para el incidente.",
		},
		{
			order: 6,
			role: "PROVIDER_ADMIN",
			title: "Aceptar solicitud",
			description:
				"El taller revisa solicitudes disponibles y acepta una emergencia.",
			route: "/app/candidates",
			status: "READY",
			expectedResult: "Incidente asignado al taller.",
		},
		{
			order: 7,
			role: "PROVIDER_ADMIN",
			title: "Operar el servicio",
			description:
				"El taller despacha técnico, registra llegada, inicia trabajo y completa el servicio.",
			route: "/app/operations",
			status: "READY",
			expectedResult: "Incidente completado.",
		},
		{
			order: 8,
			role: "PROVIDER_ADMIN",
			title: "Finalizar cobro",
			description:
				"El taller define estimación, precio final, método de pago y comisión.",
			route: "/app/billing",
			status: "READY",
			expectedResult: "Cobro listo para pago del cliente.",
		},
		{
			order: 9,
			role: "CLIENT",
			title: "Pagar servicio",
			description:
				"El cliente crea checkout simulado, confirma pago o marca pago manual.",
			route: "/app/client-payments",
			status: "READY",
			expectedResult: "Pago en estado PAID.",
		},
		{
			order: 10,
			role: "CLIENT",
			title: "Calificar servicio",
			description:
				"El cliente califica al taller después de completarse el incidente.",
			route: "/app/client-payments",
			status: "READY",
			expectedResult: "Rating guardado y promedio del proveedor actualizado.",
		},
		{
			order: 11,
			role: "CLIENT",
			title: "Aplicar suscripción o cobertura",
			description:
				"El cliente puede contratar un plan y aplicar cobertura al cobro del incidente.",
			route: "/app/subscriptions",
			status: "OPTIONAL",
			expectedResult: "Cobertura aplicada y monto cliente actualizado.",
		},
		{
			order: 12,
			role: "PLATFORM_ADMIN",
			title: "Auditar plataforma",
			description:
				"El administrador revisa auditoría, snapshots, jobs, notificaciones y métricas.",
			route: "/app/platform-admin",
			status: "READY",
			expectedResult: "Trazabilidad completa del flujo.",
		},
	];

	readonly roleFlows: DemoRoleFlow[] = [
		{
			role: "CLIENT",
			title: "Flujo del cliente",
			description:
				"Permite reportar emergencias, adjuntar evidencias, pagar, calificar y gestionar suscripciones.",
			routes: [
				{
					label: "Portal cliente",
					route: "/app/client-portal",
					description: "Vehículos, emergencias y evidencias.",
				},
				{
					label: "Pagos y calificaciones",
					route: "/app/client-payments",
					description: "Checkout, pago simulado y rating del taller.",
				},
				{
					label: "Suscripciones",
					route: "/app/subscriptions",
					description: "Planes, coberturas y aplicación al incidente.",
				},
				{
					label: "Notificaciones",
					route: "/app/notifications",
					description: "Registro de token push del usuario.",
				},
			],
		},
		{
			role: "PLATFORM_ADMIN",
			title: "Flujo del administrador de plataforma",
			description:
				"Controla asignación, auditoría, procesamiento IA, métricas y supervisión general.",
			routes: [
				{
					label: "Dashboard",
					route: "/app/dashboard",
					description: "Métricas generales de plataforma.",
				},
				{
					label: "Asignación inteligente",
					route: "/app/platform-assignment",
					description: "Publicación de incidentes y candidatos.",
				},
				{
					label: "Admin técnico",
					route: "/app/platform-admin",
					description: "Jobs IA, auditoría y snapshots.",
				},
				{
					label: "Notificaciones",
					route: "/app/notifications",
					description: "Push de prueba y entregas por incidente.",
				},
				{
					label: "Suscripciones",
					route: "/app/subscriptions",
					description: "Auditoría de aplicaciones de cobertura.",
				},
			],
		},
		{
			role: "PROVIDER_ADMIN",
			title: "Flujo del taller",
			description:
				"Gestiona perfil, técnicos, servicios, solicitudes, operación y cobro.",
			routes: [
				{
					label: "Dashboard",
					route: "/app/dashboard",
					description: "Estado operativo del taller.",
				},
				{
					label: "Mi empresa",
					route: "/app/empresa/profile",
					description: "Perfil y disponibilidad del proveedor.",
				},
				{
					label: "Técnicos",
					route: "/app/provider-me",
					description: "Gestión de técnicos del taller.",
				},
				{
					label: "Servicios",
					route: "/app/service-me",
					description: "Servicios configurados por el taller.",
				},
				{
					label: "Solicitudes disponibles",
					route: "/app/candidates",
					description: "Candidatos publicados por plataforma.",
				},
				{
					label: "Operaciones",
					route: "/app/operations",
					description: "Despacho, llegada, inicio y finalización.",
				},
				{
					label: "Cobros",
					route: "/app/billing",
					description: "Estimación, precio final y comisión.",
				},
				{
					label: "Suscripciones",
					route: "/app/subscriptions",
					description: "Planes de auxilio ofrecidos por el taller.",
				},
			],
		},
	];

	readonly moduleGroups: DemoModuleGroup[] = [
		{
			title: "Cliente",
			description: "Módulos usados por el cliente final.",
			modules: [
				{
					name: "Portal cliente",
					route: "/app/client-portal",
					roles: ["CLIENT"],
					purpose: "Crear vehículos, emergencias y evidencias.",
				},
				{
					name: "Pagos y calificaciones",
					route: "/app/client-payments",
					roles: ["CLIENT"],
					purpose: "Pagar y calificar servicios completados.",
				},
				{
					name: "Suscripciones",
					route: "/app/subscriptions",
					roles: ["CLIENT", "PROVIDER_ADMIN", "PLATFORM_ADMIN"],
					purpose: "Planes de auxilio y aplicación de coberturas.",
				},
			],
		},
		{
			title: "Plataforma",
			description: "Módulos de control y administración central.",
			modules: [
				{
					name: "Dashboard",
					route: "/app/dashboard",
					roles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "CLIENT", "TECHNICIAN"],
					purpose: "Resumen por rol.",
				},
				{
					name: "Asignación inteligente",
					route: "/app/platform-assignment",
					roles: ["PLATFORM_ADMIN"],
					purpose: "Publicar incidentes y generar candidatos.",
				},
				{
					name: "Admin técnico",
					route: "/app/platform-admin",
					roles: ["PLATFORM_ADMIN"],
					purpose: "Jobs IA, auditoría y snapshots.",
				},
				{
					name: "Notificaciones",
					route: "/app/notifications",
					roles: ["PLATFORM_ADMIN", "PROVIDER_ADMIN", "CLIENT", "TECHNICIAN"],
					purpose: "Dispositivos push y entregas.",
				},
			],
		},
		{
			title: "Taller",
			description: "Módulos para proveedor/taller.",
			modules: [
				{
					name: "Mi empresa",
					route: "/app/empresa/profile",
					roles: ["PROVIDER_ADMIN"],
					purpose: "Perfil del taller y datos operativos.",
				},
				{
					name: "Técnicos",
					route: "/app/provider-me",
					roles: ["PROVIDER_ADMIN"],
					purpose: "Gestión de técnicos.",
				},
				{
					name: "Servicios",
					route: "/app/service-me",
					roles: ["PROVIDER_ADMIN"],
					purpose: "Servicios ofrecidos por el taller.",
				},
				{
					name: "Solicitudes disponibles",
					route: "/app/candidates",
					roles: ["PROVIDER_ADMIN"],
					purpose: "Solicitudes publicadas por plataforma.",
				},
				{
					name: "Operaciones",
					route: "/app/operations",
					roles: ["PROVIDER_ADMIN"],
					purpose: "Despacho y seguimiento del servicio.",
				},
				{
					name: "Cobros",
					route: "/app/billing",
					roles: ["PROVIDER_ADMIN"],
					purpose: "Precio final, comisión y pago.",
				},
			],
		},
	];

	getRoleLabel(role: DemoRole): string {
		switch (role) {
			case "CLIENT":
				return "Cliente";
			case "PLATFORM_ADMIN":
				return "Admin plataforma";
			case "PROVIDER_ADMIN":
				return "Admin taller";
			case "TECHNICIAN":
				return "Técnico";
			default:
				return role;
		}
	}

	getRoleBadgeClass(role: DemoRole): string {
		switch (role) {
			case "CLIENT":
				return "bg-blue-100 text-blue-700";
			case "PLATFORM_ADMIN":
				return "bg-slate-900 text-white";
			case "PROVIDER_ADMIN":
				return "bg-emerald-100 text-emerald-700";
			case "TECHNICIAN":
				return "bg-orange-100 text-orange-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getStatusLabel(status: DemoStepStatus): string {
		switch (status) {
			case "READY":
				return "Listo";
			case "OPTIONAL":
				return "Opcional";
			case "POSTMAN":
				return "Postman";
			case "DONE":
				return "Hecho";
			default:
				return status;
		}
	}

	getStatusBadgeClass(status: DemoStepStatus): string {
		switch (status) {
			case "READY":
				return "bg-emerald-100 text-emerald-700";
			case "OPTIONAL":
				return "bg-blue-100 text-blue-700";
			case "POSTMAN":
				return "bg-orange-100 text-orange-700";
			case "DONE":
				return "bg-slate-900 text-white";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getReadyStepsCount(): number {
		return this.defenseFlow.filter(step => step.status === "READY").length;
	}

	getOptionalStepsCount(): number {
		return this.defenseFlow.filter(step => step.status === "OPTIONAL").length;
	}

	getPostmanStepsCount(): number {
		return this.defenseFlow.filter(step => step.status === "POSTMAN").length;
	}
}
