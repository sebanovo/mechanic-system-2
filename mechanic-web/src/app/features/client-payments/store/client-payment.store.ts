import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toBillingCheckoutPreview,
	toClientIncidents,
	toCreateCheckoutRequest,
	toIncidentBilling,
	toMarkIncidentPaidRequest,
	toProviderRating,
	toRatingRequest,
	toSimulatePaymentFailureRequest,
	toSimulatePaymentSuccessRequest,
} from "../adapters/client-payment.adapter";
import {
	BillingCheckoutPreview,
	ClientCreateCheckoutFormValue,
	ClientIncident,
	ClientMarkIncidentPaidFormValue,
	CountMetaDto,
	IncidentBilling,
	ProviderRating,
	RatingFormValue,
} from "../models/client-payment.types";
import { ClientPaymentApi } from "../services/client-payment.service";

@Injectable({
	providedIn: "root",
})
export class ClientPaymentStore {
	private readonly clientPaymentApi = inject(ClientPaymentApi);

	readonly incidents = signal<ClientIncident[]>([]);
	readonly incidentsMeta = signal<CountMetaDto | null>(null);
	readonly incidentsLoading = signal(false);
	readonly incidentsHasLoaded = signal(false);
	readonly incidentsError = signal<AppHttpError | null>(null);
	readonly hasIncidentsError = computed(() => this.incidentsError() !== null);

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

	readonly checkoutPreview = signal<BillingCheckoutPreview | null>(null);
	readonly creatingCheckout = signal(false);
	readonly checkoutError = signal<AppHttpError | null>(null);
	readonly hasCheckoutError = computed(() => this.checkoutError() !== null);

	readonly simulatingPayment = signal(false);
	readonly simulatePaymentError = signal<AppHttpError | null>(null);
	readonly hasSimulatePaymentError = computed(
		() => this.simulatePaymentError() !== null
	);

	readonly markingPaid = signal(false);
	readonly markPaidError = signal<AppHttpError | null>(null);
	readonly hasMarkPaidError = computed(() => this.markPaidError() !== null);

	readonly rating = signal<ProviderRating | null>(null);
	readonly ratingLoading = signal(false);
	readonly ratingError = signal<AppHttpError | null>(null);
	readonly hasRatingError = computed(() => this.ratingError() !== null);

	readonly savingRating = signal(false);
	readonly saveRatingError = signal<AppHttpError | null>(null);
	readonly hasSaveRatingError = computed(() => this.saveRatingError() !== null);

	readonly incidentsCount = computed(
		() => this.incidentsMeta()?.count ?? this.incidents().length
	);

	readonly completedIncidentsCount = computed(
		() =>
			this.incidents().filter(incident => incident.status === "COMPLETED").length
	);

	readonly paidBillingCount = computed(() =>
		this.billing()?.paymentStatus === "PAID" ? 1 : 0
	);

	readonly payableAmount = computed(() => {
		const currentBilling = this.billing();

		if (!currentBilling) {
			return null;
		}

		return (
			currentBilling.clientPayableAmount ??
			currentBilling.finalPriceAmount ??
			null
		);
	});

	readonly canPaySelectedIncident = computed(() => {
		const currentBilling = this.billing();

		if (!currentBilling) {
			return false;
		}

		return (
			currentBilling.paymentStatus !== "PAID" &&
			currentBilling.paymentStatus !== "CANCELLED" &&
			currentBilling.finalPriceAmount !== null
		);
	});

	readonly canRateSelectedIncident = computed(() => {
		const selected = this.selectedIncident();

		return selected?.status === "COMPLETED" && selected.providerId !== null;
	});

	async loadIncidents(): Promise<void> {
		this.incidentsLoading.set(true);
		this.incidentsError.set(null);

		try {
			const response = await firstValueFrom(
				this.clientPaymentApi.listMyIncidents()
			);

			const incidents = toClientIncidents(response.data);

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
				this.clientPaymentApi.getClientIncidentBilling(incidentId)
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

	async loadRating(incidentId: string): Promise<ProviderRating | null> {
		this.ratingLoading.set(true);
		this.ratingError.set(null);

		try {
			const dto = await firstValueFrom(
				this.clientPaymentApi.getMyIncidentRating(incidentId)
			);
			const rating = toProviderRating(dto);

			this.rating.set(rating);

			return rating;
		} catch (error) {
			this.ratingError.set(error as AppHttpError);
			this.rating.set(null);
			return null;
		} finally {
			this.ratingLoading.set(false);
		}
	}

	async loadWorkspace(): Promise<void> {
		await this.loadIncidents();

		const selectedId = this.selectedIncidentId();

		if (selectedId) {
			await Promise.all([this.loadBilling(selectedId), this.loadRating(selectedId)]);
		}
	}

	async selectIncident(incidentId: string): Promise<void> {
		this.selectedIncidentId.set(incidentId);
		this.billing.set(null);
		this.checkoutPreview.set(null);
		this.rating.set(null);

		await Promise.all([this.loadBilling(incidentId), this.loadRating(incidentId)]);
	}

	async createCheckout(
		formValue: ClientCreateCheckoutFormValue
	): Promise<BillingCheckoutPreview | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.creatingCheckout.set(true);
		this.checkoutError.set(null);

		try {
			const payload = toCreateCheckoutRequest(formValue);
			const dto = await firstValueFrom(
				this.clientPaymentApi.createCheckout(incidentId, payload)
			);
			const checkout = toBillingCheckoutPreview(dto);

			this.checkoutPreview.set(checkout);
			await this.loadBilling(incidentId);

			return checkout;
		} catch (error) {
			this.checkoutError.set(error as AppHttpError);
			return null;
		} finally {
			this.creatingCheckout.set(false);
		}
	}

	async simulatePaymentSuccess(
		paymentReference: string | null
	): Promise<IncidentBilling | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.simulatingPayment.set(true);
		this.simulatePaymentError.set(null);

		try {
			const payload = toSimulatePaymentSuccessRequest(paymentReference);
			const dto = await firstValueFrom(
				this.clientPaymentApi.simulatePaymentSuccess(incidentId, payload)
			);
			const billing = toIncidentBilling(dto);

			this.billing.set(billing);

			return billing;
		} catch (error) {
			this.simulatePaymentError.set(error as AppHttpError);
			return null;
		} finally {
			this.simulatingPayment.set(false);
		}
	}

	async simulatePaymentFailure(
		failureReason: string
	): Promise<IncidentBilling | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.simulatingPayment.set(true);
		this.simulatePaymentError.set(null);

		try {
			const payload = toSimulatePaymentFailureRequest(failureReason);
			const dto = await firstValueFrom(
				this.clientPaymentApi.simulatePaymentFailure(incidentId, payload)
			);
			const billing = toIncidentBilling(dto);

			this.billing.set(billing);

			return billing;
		} catch (error) {
			this.simulatePaymentError.set(error as AppHttpError);
			return null;
		} finally {
			this.simulatingPayment.set(false);
		}
	}

	async markIncidentAsPaid(
		formValue: ClientMarkIncidentPaidFormValue
	): Promise<IncidentBilling | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.markingPaid.set(true);
		this.markPaidError.set(null);

		try {
			const payload = toMarkIncidentPaidRequest(formValue);
			const dto = await firstValueFrom(
				this.clientPaymentApi.markIncidentAsPaid(incidentId, payload)
			);
			const billing = toIncidentBilling(dto);

			this.billing.set(billing);

			return billing;
		} catch (error) {
			this.markPaidError.set(error as AppHttpError);
			return null;
		} finally {
			this.markingPaid.set(false);
		}
	}

	async saveRating(formValue: RatingFormValue): Promise<ProviderRating | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.savingRating.set(true);
		this.saveRatingError.set(null);

		try {
			const payload = toRatingRequest(formValue);
			const dto = await firstValueFrom(
				this.clientPaymentApi.createOrUpdateRating(incidentId, payload)
			);
			const rating = toProviderRating(dto);

			this.rating.set(rating);

			return rating;
		} catch (error) {
			this.saveRatingError.set(error as AppHttpError);
			return null;
		} finally {
			this.savingRating.set(false);
		}
	}

	clearIncidentsError(): void {
		this.incidentsError.set(null);
	}

	clearBillingError(): void {
		this.billingError.set(null);
	}

	clearCheckoutError(): void {
		this.checkoutError.set(null);
	}

	clearSimulatePaymentError(): void {
		this.simulatePaymentError.set(null);
	}

	clearMarkPaidError(): void {
		this.markPaidError.set(null);
	}

	clearRatingError(): void {
		this.ratingError.set(null);
	}

	clearSaveRatingError(): void {
		this.saveRatingError.set(null);
	}
}
