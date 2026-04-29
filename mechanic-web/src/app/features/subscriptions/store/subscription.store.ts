import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import { SessionStore } from "../../../core/session/store/session.store";
import {
	jsonToText,
	toClientIncidents,
	toClientPlanSubscription,
	toClientPlanSubscriptions,
	toClientSubscribeToPlanRequest,
	toIncidentCoveragePreview,
	toIncidentSubscriptionApplication,
	toIncidentSubscriptionApplications,
	toProviderPlan,
	toProviderPlans,
	toProviderPlanCoverageUpsertRequest,
	toProviderPlanUpsertRequest,
} from "../adapters/subscription.adapter";
import {
	ClientIncident,
	ClientPlanSubscription,
	ClientSubscribeToPlanFormValue,
	CountMetaDto,
	IncidentCoveragePreview,
	IncidentSubscriptionApplication,
	ProviderPlan,
	ProviderPlanCoverageFormValue,
	ProviderPlanFormValue,
	SubscriptionMode,
} from "../models/subscription.types";
import { SubscriptionApi } from "../services/subscription.service";

@Injectable({
	providedIn: "root",
})
export class SubscriptionStore {
	private readonly subscriptionApi = inject(SubscriptionApi);
	private readonly sessionStore = inject(SessionStore);

	readonly mode = computed<SubscriptionMode>(() => {
		if (this.sessionStore.hasAnyRole(["PROVIDER_ADMIN"])) {
			return "provider";
		}

		if (this.sessionStore.hasAnyRole(["CLIENT"])) {
			return "client";
		}

		if (this.sessionStore.hasAnyRole(["PLATFORM_ADMIN"])) {
			return "platform";
		}

		return "basic";
	});

	readonly isProviderAdmin = computed(() =>
		this.sessionStore.hasAnyRole(["PROVIDER_ADMIN"])
	);

	readonly isClient = computed(() => this.sessionStore.hasAnyRole(["CLIENT"]));

	readonly isPlatformAdmin = computed(() =>
		this.sessionStore.hasAnyRole(["PLATFORM_ADMIN"])
	);

	readonly providerPlans = signal<ProviderPlan[]>([]);
	readonly providerPlansMeta = signal<CountMetaDto | null>(null);
	readonly providerPlansLoading = signal(false);
	readonly providerPlansHasLoaded = signal(false);
	readonly providerPlansError = signal<AppHttpError | null>(null);
	readonly hasProviderPlansError = computed(
		() => this.providerPlansError() !== null
	);

	readonly savingProviderPlan = signal(false);
	readonly saveProviderPlanError = signal<AppHttpError | null>(null);
	readonly hasSaveProviderPlanError = computed(
		() => this.saveProviderPlanError() !== null
	);

	readonly savingCoverage = signal(false);
	readonly saveCoverageError = signal<AppHttpError | null>(null);
	readonly hasSaveCoverageError = computed(() => this.saveCoverageError() !== null);

	readonly clientProviderPlans = signal<ProviderPlan[]>([]);
	readonly clientProviderPlansMeta = signal<CountMetaDto | null>(null);
	readonly clientProviderPlansLoading = signal(false);
	readonly clientProviderPlansHasLoaded = signal(false);
	readonly clientProviderPlansError = signal<AppHttpError | null>(null);
	readonly hasClientProviderPlansError = computed(
		() => this.clientProviderPlansError() !== null
	);

	readonly clientSubscriptions = signal<ClientPlanSubscription[]>([]);
	readonly clientSubscriptionsMeta = signal<CountMetaDto | null>(null);
	readonly clientSubscriptionsLoading = signal(false);
	readonly clientSubscriptionsHasLoaded = signal(false);
	readonly clientSubscriptionsError = signal<AppHttpError | null>(null);
	readonly hasClientSubscriptionsError = computed(
		() => this.clientSubscriptionsError() !== null
	);

	readonly subscribing = signal(false);
	readonly subscribeError = signal<AppHttpError | null>(null);
	readonly hasSubscribeError = computed(() => this.subscribeError() !== null);

	readonly clientIncidents = signal<ClientIncident[]>([]);
	readonly clientIncidentsLoading = signal(false);
	readonly clientIncidentsError = signal<AppHttpError | null>(null);
	readonly hasClientIncidentsError = computed(
		() => this.clientIncidentsError() !== null
	);

	readonly coveragePreview = signal<IncidentCoveragePreview | null>(null);
	readonly coveragePreviewLoading = signal(false);
	readonly coveragePreviewError = signal<AppHttpError | null>(null);
	readonly hasCoveragePreviewError = computed(
		() => this.coveragePreviewError() !== null
	);

	readonly applyingCoverage = signal(false);
	readonly applyCoverageError = signal<AppHttpError | null>(null);
	readonly hasApplyCoverageError = computed(
		() => this.applyCoverageError() !== null
	);

	readonly lastCoverageApplication = signal<IncidentSubscriptionApplication | null>(
		null
	);

	readonly platformApplications = signal<IncidentSubscriptionApplication[]>([]);
	readonly platformApplicationsMeta = signal<CountMetaDto | null>(null);
	readonly platformApplicationsLoading = signal(false);
	readonly platformApplicationsHasLoaded = signal(false);
	readonly platformApplicationsError = signal<AppHttpError | null>(null);
	readonly hasPlatformApplicationsError = computed(
		() => this.platformApplicationsError() !== null
	);

	readonly providerPlansCount = computed(
		() => this.providerPlansMeta()?.count ?? this.providerPlans().length
	);

	readonly activeProviderPlansCount = computed(
		() => this.providerPlans().filter(plan => plan.isActive).length
	);

	readonly clientSubscriptionsCount = computed(
		() =>
			this.clientSubscriptionsMeta()?.count ?? this.clientSubscriptions().length
	);

	readonly activeClientSubscriptionsCount = computed(
		() =>
			this.clientSubscriptions().filter(subscription => subscription.status === "ACTIVE")
				.length
	);

	readonly clientProviderPlansCount = computed(
		() =>
			this.clientProviderPlansMeta()?.count ?? this.clientProviderPlans().length
	);

	readonly platformApplicationsCount = computed(
		() =>
			this.platformApplicationsMeta()?.count ?? this.platformApplications().length
	);

	async loadProviderPlans(includeInactive: boolean): Promise<void> {
		this.providerPlansLoading.set(true);
		this.providerPlansError.set(null);

		try {
			const response = await firstValueFrom(
				this.subscriptionApi.listMyProviderPlans(includeInactive)
			);

			this.providerPlans.set(toProviderPlans(response.data));
			this.providerPlansMeta.set(response.meta);
			this.providerPlansHasLoaded.set(true);
		} catch (error) {
			this.providerPlansError.set(error as AppHttpError);
			this.providerPlans.set([]);
			this.providerPlansMeta.set(null);
			this.providerPlansHasLoaded.set(true);
		} finally {
			this.providerPlansLoading.set(false);
		}
	}

	async saveProviderPlan(
		formValue: ProviderPlanFormValue,
		planId: string | null
	): Promise<ProviderPlan | null> {
		this.savingProviderPlan.set(true);
		this.saveProviderPlanError.set(null);

		try {
			const payload = toProviderPlanUpsertRequest(formValue);
			const dto = planId
				? await firstValueFrom(
						this.subscriptionApi.updateMyProviderPlan(planId, payload)
					)
				: await firstValueFrom(
						this.subscriptionApi.createMyProviderPlan(payload)
					);

			const plan = toProviderPlan(dto);

			this.upsertProviderPlan(plan);

			return plan;
		} catch (error) {
			this.saveProviderPlanError.set(error as AppHttpError);
			return null;
		} finally {
			this.savingProviderPlan.set(false);
		}
	}

	async savePlanCoverage(
		formValue: ProviderPlanCoverageFormValue
	): Promise<boolean> {
		this.savingCoverage.set(true);
		this.saveCoverageError.set(null);

		try {
			const payload = toProviderPlanCoverageUpsertRequest(formValue);

			await firstValueFrom(
				this.subscriptionApi.upsertMyProviderPlanCoverage(
					formValue.planId,
					payload
				)
			);

			await this.loadProviderPlans(true);

			return true;
		} catch (error) {
			this.saveCoverageError.set(error as AppHttpError);
			return false;
		} finally {
			this.savingCoverage.set(false);
		}
	}

	async loadClientWorkspace(): Promise<void> {
		await Promise.all([
			this.loadClientSubscriptions(),
			this.loadClientIncidents(),
		]);
	}

	async loadClientProviderPlans(providerId: string): Promise<void> {
		this.clientProviderPlansLoading.set(true);
		this.clientProviderPlansError.set(null);

		try {
			const response = await firstValueFrom(
				this.subscriptionApi.listProviderPlansForClient(providerId)
			);

			this.clientProviderPlans.set(toProviderPlans(response.data));
			this.clientProviderPlansMeta.set(response.meta);
			this.clientProviderPlansHasLoaded.set(true);
		} catch (error) {
			this.clientProviderPlansError.set(error as AppHttpError);
			this.clientProviderPlans.set([]);
			this.clientProviderPlansMeta.set(null);
			this.clientProviderPlansHasLoaded.set(true);
		} finally {
			this.clientProviderPlansLoading.set(false);
		}
	}

	async loadClientSubscriptions(): Promise<void> {
		this.clientSubscriptionsLoading.set(true);
		this.clientSubscriptionsError.set(null);

		try {
			const response = await firstValueFrom(
				this.subscriptionApi.listMyClientSubscriptions()
			);

			this.clientSubscriptions.set(toClientPlanSubscriptions(response.data));
			this.clientSubscriptionsMeta.set(response.meta);
			this.clientSubscriptionsHasLoaded.set(true);
		} catch (error) {
			this.clientSubscriptionsError.set(error as AppHttpError);
			this.clientSubscriptions.set([]);
			this.clientSubscriptionsMeta.set(null);
			this.clientSubscriptionsHasLoaded.set(true);
		} finally {
			this.clientSubscriptionsLoading.set(false);
		}
	}

	async loadClientIncidents(): Promise<void> {
		this.clientIncidentsLoading.set(true);
		this.clientIncidentsError.set(null);

		try {
			const response = await firstValueFrom(
				this.subscriptionApi.listMyClientIncidents()
			);

			this.clientIncidents.set(toClientIncidents(response.data));
		} catch (error) {
			this.clientIncidentsError.set(error as AppHttpError);
			this.clientIncidents.set([]);
		} finally {
			this.clientIncidentsLoading.set(false);
		}
	}

	async subscribeToPlan(
		planId: string,
		formValue: ClientSubscribeToPlanFormValue
	): Promise<ClientPlanSubscription | null> {
		this.subscribing.set(true);
		this.subscribeError.set(null);

		try {
			const payload = toClientSubscribeToPlanRequest(formValue);
			const dto = await firstValueFrom(
				this.subscriptionApi.subscribeClientToPlan(planId, payload)
			);
			const subscription = toClientPlanSubscription(dto);

			this.clientSubscriptions.update(current => [subscription, ...current]);
			this.clientSubscriptionsMeta.set({
				count: this.clientSubscriptions().length,
			});

			return subscription;
		} catch (error) {
			this.subscribeError.set(error as AppHttpError);
			return null;
		} finally {
			this.subscribing.set(false);
		}
	}

	async previewCoverage(incidentId: string): Promise<IncidentCoveragePreview | null> {
		this.coveragePreviewLoading.set(true);
		this.coveragePreviewError.set(null);
		this.coveragePreview.set(null);
		this.lastCoverageApplication.set(null);

		try {
			const dto = await firstValueFrom(
				this.subscriptionApi.previewIncidentCoverage(incidentId)
			);
			const preview = toIncidentCoveragePreview(dto);

			this.coveragePreview.set(preview);

			return preview;
		} catch (error) {
			this.coveragePreviewError.set(error as AppHttpError);
			return null;
		} finally {
			this.coveragePreviewLoading.set(false);
		}
	}

	async applyCoverage(incidentId: string): Promise<IncidentSubscriptionApplication | null> {
		this.applyingCoverage.set(true);
		this.applyCoverageError.set(null);

		try {
			const dto = await firstValueFrom(
				this.subscriptionApi.applyIncidentCoverage(incidentId)
			);
			const application = toIncidentSubscriptionApplication(dto);

			this.lastCoverageApplication.set(application);
			await this.previewCoverage(incidentId);

			return application;
		} catch (error) {
			this.applyCoverageError.set(error as AppHttpError);
			return null;
		} finally {
			this.applyingCoverage.set(false);
		}
	}

	async loadPlatformApplications(incidentId: string): Promise<void> {
		this.platformApplicationsLoading.set(true);
		this.platformApplicationsError.set(null);

		try {
			const response = await firstValueFrom(
				this.subscriptionApi.listPlatformIncidentApplications(incidentId)
			);

			this.platformApplications.set(
				toIncidentSubscriptionApplications(response.data)
			);
			this.platformApplicationsMeta.set(response.meta);
			this.platformApplicationsHasLoaded.set(true);
		} catch (error) {
			this.platformApplicationsError.set(error as AppHttpError);
			this.platformApplications.set([]);
			this.platformApplicationsMeta.set(null);
			this.platformApplicationsHasLoaded.set(true);
		} finally {
			this.platformApplicationsLoading.set(false);
		}
	}

	jsonText(value: Record<string, unknown>): string {
		return jsonToText(value);
	}

	private upsertProviderPlan(plan: ProviderPlan): void {
		this.providerPlans.update(current => {
			const exists = current.some(item => item.id === plan.id);

			if (exists) {
				return current.map(item => (item.id === plan.id ? plan : item));
			}

			return [plan, ...current];
		});

		this.providerPlansMeta.set({
			count: this.providerPlans().length,
			include_inactive: true,
		});
	}
}
