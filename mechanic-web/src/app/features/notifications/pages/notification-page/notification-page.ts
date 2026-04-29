import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	DevicePlatform,
	NotificationDeliveryStatus,
	UserDeviceToken,
} from "../../models/notification.types";
import { NotificationsStore } from "../../store/notification.store";

@Component({
	selector: "app-notification-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./notification-page.html",
	styleUrl: "./notification-page.css",
})
export class NotificationPage implements OnInit {
	readonly store = inject(NotificationsStore);
	private readonly fb = inject(FormBuilder);

	readonly registerDeviceForm = this.fb.nonNullable.group({
		deviceToken: [
			"web-demo-device-token-00000000000000000001",
			[Validators.required, Validators.minLength(20), Validators.maxLength(512)],
		],
		devicePlatform: ["WEB" as DevicePlatform, [Validators.required]],
		deviceLabel: ["Navegador web demo"],
		appRole: ["PROVIDER_ADMIN"],
	});

	readonly testPushForm = this.fb.nonNullable.group({
		userId: ["", [Validators.required]],
		title: ["Prueba de notificación", [Validators.required, Validators.minLength(2)]],
		body: [
			"Esta es una notificación de prueba enviada desde el panel web.",
			[Validators.required, Validators.minLength(2)],
		],
		dataJsonText: ['{"source":"web-admin","demo":"true"}'],
		incidentId: [""],
	});

	readonly deliveriesForm = this.fb.nonNullable.group({
		incidentId: ["", [Validators.required]],
	});

	async ngOnInit(): Promise<void> {
		this.patchCurrentRole();
		await this.store.loadMyDeviceTokens();
	}

	async onRefreshDevices(): Promise<void> {
		this.store.clearDeviceTokensError();
		await this.store.loadMyDeviceTokens();
	}

	async onRegisterDevice(): Promise<void> {
		if (this.registerDeviceForm.invalid) {
			this.registerDeviceForm.markAllAsTouched();
			return;
		}

		const value = this.registerDeviceForm.getRawValue();

		const result = await this.store.registerDeviceToken({
			deviceToken: value.deviceToken,
			devicePlatform: value.devicePlatform,
			deviceLabel: value.deviceLabel || null,
			appRole: value.appRole || null,
		});

		if (!result) {
			toast("No se pudo registrar el dispositivo", {
				description:
					this.store.registeringDeviceTokenError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Dispositivo registrado correctamente");
	}

	async onDeactivateDevice(device: UserDeviceToken): Promise<void> {
		const result = await this.store.deactivateDeviceToken(device.id);

		if (!result) {
			toast("No se pudo desactivar el dispositivo", {
				description:
					this.store.deactivatingDeviceTokenError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Dispositivo desactivado correctamente");
	}

	async onSendTestPush(): Promise<void> {
		if (this.testPushForm.invalid) {
			this.testPushForm.markAllAsTouched();
			return;
		}

		const value = this.testPushForm.getRawValue();

		if (!this.isValidJsonObject(value.dataJsonText)) {
			toast("JSON inválido", {
				description:
					"El campo data debe ser un objeto JSON. Ejemplo: {\"demo\":\"true\"}",
			});
			return;
		}

		const result = await this.store.sendTestPush({
			userId: value.userId,
			title: value.title,
			body: value.body,
			dataJsonText: value.dataJsonText,
			incidentId: value.incidentId || null,
		});

		if (!result) {
			toast("No se pudo enviar la notificación", {
				description:
					this.store.sendingTestPushError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Notificación de prueba encolada correctamente");
	}

	async onLoadDeliveries(): Promise<void> {
		if (this.deliveriesForm.invalid) {
			this.deliveriesForm.markAllAsTouched();
			return;
		}

		const value = this.deliveriesForm.getRawValue();

		await this.store.loadIncidentDeliveries(value.incidentId);
	}

	getStatusLabel(status: NotificationDeliveryStatus | string): string {
		switch (status) {
			case "PENDING":
				return "Pendiente";
			case "SENT":
				return "Enviado";
			case "FAILED":
				return "Fallido";
			case "SKIPPED":
				return "Omitido";
			case "CANCELLED":
				return "Cancelado";
			default:
				return String(status);
		}
	}

	getStatusBadgeClass(status: NotificationDeliveryStatus | string): string {
		switch (status) {
			case "SENT":
				return "bg-emerald-100 text-emerald-700";
			case "PENDING":
				return "bg-orange-100 text-orange-700";
			case "FAILED":
				return "bg-red-100 text-red-700";
			case "SKIPPED":
			case "CANCELLED":
				return "bg-slate-200 text-slate-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getDeviceStatusBadgeClass(isActive: boolean): string {
		return isActive
			? "bg-emerald-100 text-emerald-700"
			: "bg-slate-200 text-slate-700";
	}

	formatDeviceToken(token: string): string {
		if (token.length <= 24) {
			return token;
		}

		return `${token.slice(0, 12)}...${token.slice(-8)}`;
	}

	private patchCurrentRole(): void {
		const firstRole = this.store.currentRoleCodes()[0];

		if (firstRole) {
			this.registerDeviceForm.patchValue({
				appRole: firstRole,
			});
		}
	}

	private isValidJsonObject(value: string): boolean {
		const cleanedValue = value.trim();

		if (!cleanedValue) {
			return true;
		}

		try {
			const parsedValue = JSON.parse(cleanedValue);

			return (
				typeof parsedValue === "object" &&
				parsedValue !== null &&
				!Array.isArray(parsedValue)
			);
		} catch {
			return false;
		}
	}
}
