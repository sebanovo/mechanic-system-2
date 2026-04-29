import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	BillingPeriod,
	ClientIncident,
	CoverageType,
	IncidentCategory,
	ProviderPlan,
	SubscriptionStatus,
} from "../../models/subscription.types";
import { SubscriptionStore } from "../../store/subscription.store";

@Component({
	selector: "app-subscription-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./subscription-page.html",
	styleUrl: "./subscription-page.css",
})
export class SubscriptionPage implements OnInit {
	readonly store = inject(SubscriptionStore);
	private readonly fb = inject(FormBuilder);

	readonly includeInactive = signal(true);
	readonly selectedProviderPlanId = signal<string | null>(null);

	readonly providerPlanForm = this.fb.nonNullable.group({
		code: ["AUXILIO-BASICO", [Validators.required, Validators.minLength(2)]],
		name: ["Plan Auxilio Básico", [Validators.required, Validators.minLength(2)]],
		description: ["Cobertura básica para emergencias vehiculares frecuentes."],
		billingPeriod: ["MONTHLY" as BillingPeriod, [Validators.required]],
		priceAmount: [49, [Validators.required, Validators.min(1)]],
		currencyCode: ["BOB", [Validators.required, Validators.minLength(3)]],
		isActive: [true],
		autoRenews: [false],
	});

	readonly coverageForm = this.fb.nonNullable.group({
		planId: ["", [Validators.required]],
		coverageId: [""],
		serviceCatalogItemId: [""],
		incidentCategory: ["BATTERY" as IncidentCategory, [Validators.required]],
		coverageType: ["PERCENTAGE" as CoverageType, [Validators.required]],
		coverageValue: [50, [Validators.required, Validators.min(1)]],
		maxCoverageAmount: [100, [Validators.min(0)]],
		waitingPeriodDays: [0, [Validators.required, Validators.min(0)]],
		maxApplicationsPerSubscription: [3, [Validators.min(0)]],
		isActive: [true],
	});

	readonly providerLookupForm = this.fb.nonNullable.group({
		providerId: ["", [Validators.required]],
	});

	readonly subscribeForm = this.fb.nonNullable.group({
		externalReference: ["SUB-DEMO-ANGULAR-001"],
		note: ["Suscripción registrada desde panel web demo."],
	});

	readonly coverageClientForm = this.fb.nonNullable.group({
		incidentId: ["", [Validators.required]],
	});

	readonly platformApplicationsForm = this.fb.nonNullable.group({
		incidentId: ["", [Validators.required]],
	});

	async ngOnInit(): Promise<void> {
		if (this.store.isProviderAdmin()) {
			await this.store.loadProviderPlans(this.includeInactive());
		}

		if (this.store.isClient()) {
			await this.store.loadClientWorkspace();
			this.patchClientDefaults();
		}
	}

	async onRefresh(): Promise<void> {
		if (this.store.isProviderAdmin()) {
			await this.store.loadProviderPlans(this.includeInactive());
		}

		if (this.store.isClient()) {
			await this.store.loadClientWorkspace();
			this.patchClientDefaults();
		}
	}

	async onToggleInactive(): Promise<void> {
		this.includeInactive.update(value => !value);
		await this.store.loadProviderPlans(this.includeInactive());
	}

	onSelectProviderPlan(plan: ProviderPlan): void {
		this.selectedProviderPlanId.set(plan.id);

		this.providerPlanForm.patchValue({
			code: plan.code,
			name: plan.name,
			description: plan.description ?? "",
			billingPeriod: plan.billingPeriod === "ANNUAL" ? "ANNUAL" : "MONTHLY",
			priceAmount: plan.priceAmount,
			currencyCode: plan.currencyCode,
			isActive: plan.isActive,
			autoRenews: plan.autoRenews,
		});

		this.coverageForm.patchValue({
			planId: plan.id,
		});
	}

	onNewProviderPlan(): void {
		this.selectedProviderPlanId.set(null);
		this.providerPlanForm.patchValue({
			code: "AUXILIO-BASICO",
			name: "Plan Auxilio Básico",
			description: "Cobertura básica para emergencias vehiculares frecuentes.",
			billingPeriod: "MONTHLY",
			priceAmount: 49,
			currencyCode: "BOB",
			isActive: true,
			autoRenews: false,
		});
	}

	async onSaveProviderPlan(): Promise<void> {
		if (this.providerPlanForm.invalid) {
			this.providerPlanForm.markAllAsTouched();
			return;
		}

		const value = this.providerPlanForm.getRawValue();
		const result = await this.store.saveProviderPlan(
			{
				code: value.code,
				name: value.name,
				description: value.description || null,
				billingPeriod: value.billingPeriod,
				priceAmount: Number(value.priceAmount),
				currencyCode: value.currencyCode,
				isActive: value.isActive,
				autoRenews: value.autoRenews,
			},
			this.selectedProviderPlanId()
		);

		if (!result) {
			toast("No se pudo guardar el plan", {
				description:
					this.store.saveProviderPlanError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.selectedProviderPlanId.set(result.id);
		this.coverageForm.patchValue({ planId: result.id });

		toast.success("Plan guardado correctamente");
	}

	async onSaveCoverage(): Promise<void> {
		if (this.coverageForm.invalid) {
			this.coverageForm.markAllAsTouched();
			return;
		}

		const value = this.coverageForm.getRawValue();

		const success = await this.store.savePlanCoverage({
			planId: value.planId,
			coverageId: value.coverageId || null,
			serviceCatalogItemId: value.serviceCatalogItemId || null,
			incidentCategory: value.incidentCategory,
			coverageType: value.coverageType,
			coverageValue: Number(value.coverageValue),
			maxCoverageAmount: this.toNullableNumber(value.maxCoverageAmount),
			waitingPeriodDays: Number(value.waitingPeriodDays),
			maxApplicationsPerSubscription: this.toNullableNumber(
				value.maxApplicationsPerSubscription
			),
			isActive: value.isActive,
		});

		if (!success) {
			toast("No se pudo guardar la cobertura", {
				description:
					this.store.saveCoverageError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Cobertura guardada correctamente");
	}

	async onLoadClientProviderPlans(): Promise<void> {
		if (this.providerLookupForm.invalid) {
			this.providerLookupForm.markAllAsTouched();
			return;
		}

		const providerId = this.providerLookupForm.controls.providerId.value;
		await this.store.loadClientProviderPlans(providerId);
	}

	async onUseProviderFromIncident(incident: ClientIncident): Promise<void> {
		if (!incident.providerId) {
			toast("Este incidente no tiene taller asignado");
			return;
		}

		this.providerLookupForm.patchValue({
			providerId: incident.providerId,
		});

		await this.store.loadClientProviderPlans(incident.providerId);
	}

	async onSubscribeToPlan(plan: ProviderPlan): Promise<void> {
		const value = this.subscribeForm.getRawValue();

		const result = await this.store.subscribeToPlan(plan.id, {
			externalReference: value.externalReference || null,
			note: value.note || null,
		});

		if (!result) {
			toast("No se pudo crear la suscripción", {
				description:
					this.store.subscribeError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Suscripción creada correctamente");
	}

	async onPreviewCoverage(): Promise<void> {
		if (this.coverageClientForm.invalid) {
			this.coverageClientForm.markAllAsTouched();
			return;
		}

		const incidentId = this.coverageClientForm.controls.incidentId.value;
		const preview = await this.store.previewCoverage(incidentId);

		if (!preview) {
			toast("No se pudo previsualizar cobertura", {
				description:
					this.store.coveragePreviewError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Cobertura consultada correctamente");
	}

	async onApplyCoverage(): Promise<void> {
		if (this.coverageClientForm.invalid) {
			this.coverageClientForm.markAllAsTouched();
			return;
		}

		const incidentId = this.coverageClientForm.controls.incidentId.value;
		const application = await this.store.applyCoverage(incidentId);

		if (!application) {
			toast("No se pudo aplicar cobertura", {
				description:
					this.store.applyCoverageError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Cobertura aplicada correctamente");
	}

	async onLoadPlatformApplications(): Promise<void> {
		if (this.platformApplicationsForm.invalid) {
			this.platformApplicationsForm.markAllAsTouched();
			return;
		}

		const incidentId = this.platformApplicationsForm.controls.incidentId.value;
		await this.store.loadPlatformApplications(incidentId);
	}

	getBillingPeriodLabel(period: string): string {
		switch (period) {
			case "MONTHLY":
				return "Mensual";
			case "ANNUAL":
				return "Anual";
			default:
				return period;
		}
	}

	getCoverageTypeLabel(type: string | null): string {
		switch (type) {
			case "FULL":
				return "Cobertura total";
			case "PERCENTAGE":
				return "Porcentaje";
			case "FIXED_AMOUNT":
				return "Monto fijo";
			default:
				return type || "Sin cobertura";
		}
	}

	getCategoryLabel(category: string | null): string {
		switch (category) {
			case "BATTERY":
				return "Batería";
			case "TIRE":
				return "Llanta";
			case "ACCIDENT":
				return "Accidente";
			case "ENGINE":
				return "Motor";
			case "LOCKOUT":
				return "Llave/Bloqueo";
			case "OVERHEATING":
				return "Sobrecalentamiento";
			case "UNCERTAIN":
				return "Incierto";
			case "OTHER":
				return "Otro";
			default:
				return category || "Todas";
		}
	}

	getSubscriptionStatusLabel(status: SubscriptionStatus): string {
		switch (status) {
			case "ACTIVE":
				return "Activa";
			case "CANCELLED":
				return "Cancelada";
			case "EXPIRED":
				return "Expirada";
			default:
				return status;
		}
	}

	getStatusBadgeClass(status: string): string {
		switch (status) {
			case "ACTIVE":
			case "APPLIED":
				return "bg-emerald-100 text-emerald-700";
			case "CANCELLED":
			case "EXPIRED":
			case "VOIDED":
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

	formatCoverageValue(type: string | null, value: number | null): string {
		if (value === null || value === undefined) {
			return "Sin valor";
		}

		if (type === "PERCENTAGE") {
			return `${value}%`;
		}

		if (type === "FULL") {
			return "100%";
		}

		return `BOB ${value.toFixed(2)}`;
	}

	private patchClientDefaults(): void {
		const firstIncidentWithProvider = this.store
			.clientIncidents()
			.find(incident => incident.providerId);

		if (firstIncidentWithProvider?.providerId) {
			this.providerLookupForm.patchValue({
				providerId: firstIncidentWithProvider.providerId,
			});
		}

		const firstIncident = this.store.clientIncidents()[0];

		if (firstIncident) {
			this.coverageClientForm.patchValue({
				incidentId: firstIncident.id,
			});
		}
	}

	private toNullableNumber(value: number): number | null {
		const normalized = Number(value);

		if (!Number.isFinite(normalized) || normalized <= 0) {
			return null;
		}

		return normalized;
	}
}
