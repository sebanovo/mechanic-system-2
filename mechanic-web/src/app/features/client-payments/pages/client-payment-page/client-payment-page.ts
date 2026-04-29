import { CommonModule } from "@angular/common";
import { Component, effect, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	CheckoutPaymentMethod,
	ClientIncident,
	ClientIncidentStatus,
	ClientPaymentMethod,
	ClientPaymentStatus,
} from "../../models/client-payment.types";
import { ClientPaymentStore } from "../../store/client-payment.store";

@Component({
	selector: "app-client-payment-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./client-payment-page.html",
	styleUrl: "./client-payment-page.css",
})
export class ClientPaymentPage implements OnInit {
	readonly store = inject(ClientPaymentStore);
	private readonly fb = inject(FormBuilder);

	readonly checkoutForm = this.fb.nonNullable.group({
		paymentMethod: ["QR" as CheckoutPaymentMethod, [Validators.required]],
		paymentProviderName: ["mock_checkout"],
		returnUrl: ["http://localhost:4200/payment/success"],
	});

	readonly simulateSuccessForm = this.fb.nonNullable.group({
		paymentReference: ["PAGO-DEMO-ANGULAR-001"],
	});

	readonly simulateFailureForm = this.fb.nonNullable.group({
		failureReason: [
			"Pago rechazado por el proveedor simulado.",
			[Validators.required, Validators.minLength(3)],
		],
	});

	readonly markPaidForm = this.fb.nonNullable.group({
		paymentMethod: ["QR" as ClientPaymentMethod, [Validators.required]],
		paymentProviderName: ["manual"],
		paymentReference: ["PAGO-MANUAL-ANGULAR-001"],
	});

	readonly ratingForm = this.fb.nonNullable.group({
		ratingScore: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
		punctualityScore: [5, [Validators.min(1), Validators.max(5)]],
		serviceQualityScore: [5, [Validators.min(1), Validators.max(5)]],
		communicationScore: [5, [Validators.min(1), Validators.max(5)]],
		comment: ["El taller respondió rápido y resolvió el problema."],
		wouldRecommend: [true],
	});

	constructor() {
		effect(() => {
			const rating = this.store.rating();

			if (!rating) {
				return;
			}

			this.ratingForm.patchValue({
				ratingScore: rating.ratingScore,
				punctualityScore: rating.punctualityScore ?? 5,
				serviceQualityScore: rating.serviceQualityScore ?? 5,
				communicationScore: rating.communicationScore ?? 5,
				comment: rating.comment ?? "",
				wouldRecommend: rating.wouldRecommend ?? true,
			});
		});

		effect(() => {
			const billing = this.store.billing();

			if (!billing) {
				return;
			}

			this.markPaidForm.patchValue({
				paymentMethod: billing.paymentMethod ?? "QR",
				paymentProviderName: billing.paymentProviderName ?? "manual",
				paymentReference:
					billing.paymentReference ?? "PAGO-MANUAL-ANGULAR-001",
			});
		});
	}

	async ngOnInit(): Promise<void> {
		await this.store.loadWorkspace();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadWorkspace();
	}

	async onRetry(): Promise<void> {
		this.store.clearIncidentsError();
		this.store.clearBillingError();
		await this.store.loadWorkspace();
	}

	async onSelectIncident(incident: ClientIncident): Promise<void> {
		await this.store.selectIncident(incident.id);
	}

	async onCreateCheckout(): Promise<void> {
		if (this.checkoutForm.invalid) {
			this.checkoutForm.markAllAsTouched();
			return;
		}

		const value = this.checkoutForm.getRawValue();

		const result = await this.store.createCheckout({
			paymentMethod: value.paymentMethod,
			paymentProviderName: value.paymentProviderName || null,
			returnUrl: value.returnUrl || null,
		});

		if (!result) {
			toast("No se pudo crear checkout", {
				description:
					this.store.checkoutError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Checkout simulado creado", {
			description: `Referencia: ${result.checkoutReference}`,
		});
	}

	async onSimulateSuccess(): Promise<void> {
		const value = this.simulateSuccessForm.getRawValue();

		const result = await this.store.simulatePaymentSuccess(
			value.paymentReference || null
		);

		if (!result) {
			toast("No se pudo simular pago exitoso", {
				description:
					this.store.simulatePaymentError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Pago aprobado correctamente");
	}

	async onSimulateFailure(): Promise<void> {
		if (this.simulateFailureForm.invalid) {
			this.simulateFailureForm.markAllAsTouched();
			return;
		}

		const value = this.simulateFailureForm.getRawValue();

		const result = await this.store.simulatePaymentFailure(value.failureReason);

		if (!result) {
			toast("No se pudo simular pago fallido", {
				description:
					this.store.simulatePaymentError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Pago fallido simulado correctamente");
	}

	async onMarkPaid(): Promise<void> {
		if (this.markPaidForm.invalid) {
			this.markPaidForm.markAllAsTouched();
			return;
		}

		const value = this.markPaidForm.getRawValue();

		const result = await this.store.markIncidentAsPaid({
			paymentMethod: value.paymentMethod,
			paymentProviderName: value.paymentProviderName || null,
			paymentReference: value.paymentReference || null,
		});

		if (!result) {
			toast("No se pudo marcar como pagado", {
				description:
					this.store.markPaidError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Pago marcado como pagado correctamente");
	}

	async onSaveRating(): Promise<void> {
		if (this.ratingForm.invalid) {
			this.ratingForm.markAllAsTouched();
			return;
		}

		if (!this.store.canRateSelectedIncident()) {
			toast("Este incidente aún no puede calificarse", {
				description:
					"Solo puedes calificar incidentes completados y con taller asignado.",
			});
			return;
		}

		const value = this.ratingForm.getRawValue();

		const result = await this.store.saveRating({
			ratingScore: Number(value.ratingScore),
			punctualityScore: this.toNullableScore(value.punctualityScore),
			serviceQualityScore: this.toNullableScore(value.serviceQualityScore),
			communicationScore: this.toNullableScore(value.communicationScore),
			comment: value.comment || null,
			wouldRecommend: value.wouldRecommend,
		});

		if (!result) {
			toast("No se pudo guardar la calificación", {
				description:
					this.store.saveRatingError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Calificación guardada correctamente");
	}

	isSelected(incident: ClientIncident): boolean {
		return this.store.selectedIncidentId() === incident.id;
	}

	getIncidentStatusLabel(status: ClientIncidentStatus): string {
		switch (status) {
			case "PENDING":
				return "Pendiente";
			case "IN_REVIEW":
				return "En revisión";
			case "PUBLISHED":
				return "Publicado";
			case "ASSIGNED":
				return "Asignado";
			case "EN_ROUTE":
				return "En camino";
			case "ON_SITE":
			case "ARRIVED":
				return "En sitio";
			case "IN_PROGRESS":
				return "En proceso";
			case "COMPLETED":
				return "Completado";
			case "CANCELLED":
				return "Cancelado";
			default:
				return status;
		}
	}

	getPaymentStatusLabel(status: ClientPaymentStatus | string | null): string {
		switch (status) {
			case "PENDING_PRICING":
				return "Pendiente de precio";
			case "ESTIMATED":
				return "Estimado";
			case "PENDING_PAYMENT":
				return "Pendiente de pago";
			case "PAID":
				return "Pagado";
			case "CANCELLED":
				return "Cancelado";
			default:
				return status ? String(status) : "Sin estado";
		}
	}

	getIncidentStatusBadgeClass(status: ClientIncidentStatus): string {
		switch (status) {
			case "COMPLETED":
				return "bg-emerald-100 text-emerald-700";
			case "ASSIGNED":
			case "PUBLISHED":
				return "bg-blue-100 text-blue-700";
			case "PENDING":
			case "IN_REVIEW":
			case "EN_ROUTE":
				return "bg-orange-100 text-orange-700";
			case "ON_SITE":
			case "ARRIVED":
			case "IN_PROGRESS":
				return "bg-purple-100 text-purple-700";
			case "CANCELLED":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getPaymentStatusBadgeClass(status: ClientPaymentStatus | string | null): string {
		switch (status) {
			case "PAID":
				return "bg-emerald-100 text-emerald-700";
			case "PENDING_PAYMENT":
				return "bg-orange-100 text-orange-700";
			case "ESTIMATED":
				return "bg-blue-100 text-blue-700";
			case "PENDING_PRICING":
				return "bg-slate-100 text-slate-700";
			case "CANCELLED":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	formatMoney(value: number | null | undefined, currencyCode = "BOB"): string {
		if (value === null || value === undefined) {
			return "Sin definir";
		}

		return `${currencyCode} ${value.toFixed(2)}`;
	}

	formatPercent(value: number | null | undefined): string {
		if (value === null || value === undefined) {
			return "0%";
		}

		return `${(value * 100).toFixed(2)}%`;
	}

	formatRating(value: number | null | undefined): string {
		if (value === null || value === undefined) {
			return "Sin rating";
		}

		return `${value.toFixed(2)} / 5`;
	}

	private toNullableScore(value: number): number | null {
		const normalized = Number(value);

		if (!Number.isFinite(normalized) || normalized <= 0) {
			return null;
		}

		return normalized;
	}
}
