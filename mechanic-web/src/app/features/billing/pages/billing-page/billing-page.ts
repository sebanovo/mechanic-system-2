import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	BillingIncidentStatus,
	BillingPaymentMethod,
	BillingPaymentStatus,
	BillingPriority,
	ProviderIncident,
} from "../../models/billing.types";
import { BillingStore } from "../../store/billing.store";

@Component({
	selector: "app-billing-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./billing-page.html",
	styleUrl: "./billing-page.css",
})
export class BillingPage implements OnInit {
	readonly store = inject(BillingStore);
	private readonly fb = inject(FormBuilder);

	readonly estimateForm = this.fb.nonNullable.group({
		estimatedPriceMin: [0, [Validators.min(0)]],
		estimatedPriceMax: [0, [Validators.min(0)]],
		note: ["Estimación de precio registrada desde panel web."],
	});

	readonly finalizeForm = this.fb.nonNullable.group({
		finalPriceAmount: [350, [Validators.required, Validators.min(1)]],
		paymentMethod: ["QR" as BillingPaymentMethod | null],
		markAsPaid: [false],
		paymentReference: [""],
		note: ["Precio final definido desde panel web."],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadWorkspace();
		this.patchFormsFromBilling();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadWorkspace();
		this.patchFormsFromBilling();
	}

	async onRetry(): Promise<void> {
		this.store.clearIncidentsError();
		this.store.clearBillingError();
		await this.store.loadWorkspace();
		this.patchFormsFromBilling();
	}

	async onSelectIncident(incident: ProviderIncident): Promise<void> {
		await this.store.selectIncident(incident.id);
		this.patchFormsFromBilling();
	}

	async onEstimatePricing(): Promise<void> {
		if (this.estimateForm.invalid) {
			this.estimateForm.markAllAsTouched();
			return;
		}

		const value = this.estimateForm.getRawValue();

		if (
			value.estimatedPriceMin > 0 &&
			value.estimatedPriceMax > 0 &&
			value.estimatedPriceMax < value.estimatedPriceMin
		) {
			toast("Rango de estimación inválido", {
				description: "El precio máximo no puede ser menor al precio mínimo.",
			});
			return;
		}

		const result = await this.store.estimatePricing({
			estimatedPriceMin: this.toNullableNumber(value.estimatedPriceMin),
			estimatedPriceMax: this.toNullableNumber(value.estimatedPriceMax),
			note: value.note || null,
		});

		if (!result) {
			toast("No se pudo registrar la estimación", {
				description:
					this.store.estimateError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		this.patchFormsFromBilling();
		toast.success("Estimación registrada correctamente");
	}

	async onFinalizePricing(): Promise<void> {
		if (this.finalizeForm.invalid) {
			this.finalizeForm.markAllAsTouched();
			return;
		}

		const value = this.finalizeForm.getRawValue();

		if (value.markAsPaid && !value.paymentMethod) {
			toast("Método de pago requerido", {
				description: "Selecciona método de pago cuando marcas como pagado.",
			});
			return;
		}

		const result = await this.store.finalizePricing({
			finalPriceAmount: Number(value.finalPriceAmount),
			paymentMethod: value.paymentMethod,
			markAsPaid: value.markAsPaid,
			paymentReference: value.paymentReference || null,
			note: value.note || null,
		});

		if (!result) {
			toast("No se pudo finalizar el precio", {
				description:
					this.store.finalizeError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		this.patchFormsFromBilling();
		toast.success("Precio finalizado correctamente", {
			description: result.paymentStatus === "PAID"
				? "El cobro fue marcado como pagado."
				: "El cliente ya puede realizar el pago.",
		});
	}

	isSelected(incident: ProviderIncident): boolean {
		return this.store.selectedIncidentId() === incident.id;
	}

	getStatusLabel(status: BillingIncidentStatus | string | null): string {
		switch (status) {
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
			case "PENDING":
				return "Pendiente";
			case "PUBLISHED":
				return "Publicado";
			default:
				return status ? String(status) : "Sin estado";
		}
	}

	getPriorityLabel(priority: BillingPriority | string | null): string {
		switch (priority) {
			case "LOW":
				return "Baja";
			case "MEDIUM":
				return "Media";
			case "HIGH":
				return "Alta";
			case "CRITICAL":
				return "Crítica";
			case "URGENT":
				return "Urgente";
			default:
				return priority ? String(priority) : "Sin prioridad";
		}
	}

	getPaymentStatusLabel(status: BillingPaymentStatus | string | null): string {
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

	getStatusBadgeClass(status: BillingIncidentStatus | string | null): string {
		switch (status) {
			case "COMPLETED":
				return "bg-emerald-100 text-emerald-700";
			case "IN_PROGRESS":
			case "ON_SITE":
			case "ARRIVED":
				return "bg-purple-100 text-purple-700";
			case "EN_ROUTE":
				return "bg-orange-100 text-orange-700";
			case "ASSIGNED":
				return "bg-blue-100 text-blue-700";
			case "CANCELLED":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getPaymentStatusBadgeClass(status: BillingPaymentStatus | string | null): string {
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

	private patchFormsFromBilling(): void {
		const billing = this.store.billing();

		if (!billing) {
			return;
		}

		this.estimateForm.patchValue({
			estimatedPriceMin: billing.estimatedPriceMin ?? 0,
			estimatedPriceMax: billing.estimatedPriceMax ?? 0,
			note: billing.pricingNote ?? "Estimación de precio registrada desde panel web.",
		});

		this.finalizeForm.patchValue({
			finalPriceAmount:
				billing.finalPriceAmount ??
				billing.estimatedPriceMax ??
				billing.estimatedPriceMin ??
				350,
			paymentMethod: billing.paymentMethod ?? "QR",
			markAsPaid: billing.paymentStatus === "PAID",
			paymentReference: billing.paymentReference ?? "",
			note: billing.pricingNote ?? "Precio final definido desde panel web.",
		});
	}

	private toNullableNumber(value: number): number | null {
		const normalized = Number(value);

		if (!Number.isFinite(normalized) || normalized === 0) {
			return null;
		}

		return normalized;
	}
}
