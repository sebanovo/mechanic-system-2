import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toEstimatePricingRequest,
	toFinalizePricingRequest,
	toIncidentBilling,
	toProviderIncidents,
} from "../adapters/billing.adapter";
import {
	CountMetaDto,
	IncidentBilling,
	ProviderEstimatePricingFormValue,
	ProviderFinalizePricingFormValue,
	ProviderIncident,
} from "../models/billing.types";
import { BillingApi } from "../services/billing.service";

@Injectable({
	providedIn: "root",
})
export class BillingStore {
	private readonly billingApi = inject(BillingApi);

	readonly incidents = signal<ProviderIncident[]>([]);
	readonly incidentsMeta = signal<CountMetaDto | null>(null);
	readonly incidentsLoading = signal(false);
	readonly incidentsHasLoaded = signal(false);
	readonly incidentsError = signal<AppHttpError | null>(null);
	readonly hasIncidentsError = computed(() => this.incidentsError() !== null);

	readonly incidentsCount = computed(
		() => this.incidentsMeta()?.count ?? this.incidents().length
	);

	readonly billableIncidents = computed(() =>
		this.incidents().filter(incident =>
			["ASSIGNED", "EN_ROUTE", "ON_SITE", "ARRIVED", "IN_PROGRESS", "COMPLETED"].includes(
				incident.status
			)
		)
	);

	readonly completedIncidentsCount = computed(
		() =>
			this.incidents().filter(incident => incident.status === "COMPLETED").length
	);

	readonly selectedIncidentId = signal<string | null>(null);

	readonly selectedIncident = computed(() => {
		const selectedId = this.selectedIncidentId();

		if (!selectedId) {
			return null;
		}

		return this.incidents().find(incident => incident.id === selectedId) ?? null;
	});

	readonly billing = signal<IncidentBilling | null>(null);
	readonly billingLoading = signal(false);
	readonly billingError = signal<AppHttpError | null>(null);
	readonly hasBillingError = computed(() => this.billingError() !== null);

	readonly estimating = signal(false);
	readonly estimateError = signal<AppHttpError | null>(null);
	readonly hasEstimateError = computed(() => this.estimateError() !== null);

	readonly finalizing = signal(false);
	readonly finalizeError = signal<AppHttpError | null>(null);
	readonly hasFinalizeError = computed(() => this.finalizeError() !== null);

	readonly commissionPreview = computed(() => {
		const currentBilling = this.billing();

		if (!currentBilling?.finalPriceAmount) {
			return null;
		}

		const finalPrice = currentBilling.finalPriceAmount;
		const commissionRate = currentBilling.platformCommissionRate;
		const commissionAmount = currentBilling.platformCommissionAmount ?? finalPrice * commissionRate;
		const providerNet = currentBilling.providerNetAmount ?? finalPrice - commissionAmount;

		return {
			finalPrice,
			commissionRate,
			commissionAmount,
			providerNet,
		};
	});

	readonly paidCount = computed(() =>
		this.billing()?.paymentStatus === "PAID" ? 1 : 0
	);

	async loadIncidents(): Promise<void> {
		this.incidentsLoading.set(true);
		this.incidentsError.set(null);

		try {
			const response = await firstValueFrom(
				this.billingApi.getMyProviderIncidents()
			);

			const incidents = toProviderIncidents(response.data);

			this.incidents.set(incidents);
			this.incidentsMeta.set(response.meta);
			this.incidentsHasLoaded.set(true);

			if (!this.selectedIncidentId() && incidents.length > 0) {
				const preferred =
					incidents.find(incident => incident.status === "COMPLETED") ??
					incidents[0];

				this.selectedIncidentId.set(preferred.id);
			}
		} catch (error) {
			this.incidentsError.set(error as AppHttpError);
			this.incidents.set([]);
			this.incidentsMeta.set(null);
			this.incidentsHasLoaded.set(true);
		} finally {
			this.incidentsLoading.set(false);
		}
	}

	async loadBilling(incidentId: string): Promise<IncidentBilling | null> {
		this.billingLoading.set(true);
		this.billingError.set(null);

		try {
			const dto = await firstValueFrom(
				this.billingApi.getProviderIncidentBilling(incidentId)
			);
			const billing = toIncidentBilling(dto);

			this.billing.set(billing);

			return billing;
		} catch (error) {
			this.billingError.set(error as AppHttpError);
			this.billing.set(null);
			return null;
		} finally {
			this.billingLoading.set(false);
		}
	}

	async loadWorkspace(): Promise<void> {
		await this.loadIncidents();

		const incidentId = this.selectedIncidentId();

		if (incidentId) {
			await this.loadBilling(incidentId);
		}
	}

	async selectIncident(incidentId: string): Promise<void> {
		this.selectedIncidentId.set(incidentId);
		this.billing.set(null);
		await this.loadBilling(incidentId);
	}

	async estimatePricing(
		formValue: ProviderEstimatePricingFormValue
	): Promise<IncidentBilling | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.estimating.set(true);
		this.estimateError.set(null);

		try {
			const payload = toEstimatePricingRequest(formValue);
			const dto = await firstValueFrom(
				this.billingApi.estimateProviderIncidentPricing(incidentId, payload)
			);
			const billing = toIncidentBilling(dto);

			this.billing.set(billing);

			return billing;
		} catch (error) {
			this.estimateError.set(error as AppHttpError);
			return null;
		} finally {
			this.estimating.set(false);
		}
	}

	async finalizePricing(
		formValue: ProviderFinalizePricingFormValue
	): Promise<IncidentBilling | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.finalizing.set(true);
		this.finalizeError.set(null);

		try {
			const payload = toFinalizePricingRequest(formValue);
			const dto = await firstValueFrom(
				this.billingApi.finalizeProviderIncidentPricing(incidentId, payload)
			);
			const billing = toIncidentBilling(dto);

			this.billing.set(billing);

			return billing;
		} catch (error) {
			this.finalizeError.set(error as AppHttpError);
			return null;
		} finally {
			this.finalizing.set(false);
		}
	}

	clearIncidentsError(): void {
		this.incidentsError.set(null);
	}

	clearBillingError(): void {
		this.billingError.set(null);
	}

	clearEstimateError(): void {
		this.estimateError.set(null);
	}

	clearFinalizeError(): void {
		this.finalizeError.set(null);
	}
}
