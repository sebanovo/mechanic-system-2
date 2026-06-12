import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	output,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBot,
	lucideCalendar,
	lucideClock,
	lucideHash,
	lucideInfo,
	lucideMapPin,
	lucideMessageSquare,
	lucideTimer,
	lucideWrench,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { IncidentOfferApi } from "../../../entities/incident-offer/api/incident-offer.api";
import {
	createEmptyIncidentOfferPagination,
	getIncidentOfferId,
	formatIncidentOfferExpiration,
	formatIncidentOfferResponseTime,
	getIncidentOfferAiSummary,
	getIncidentOfferCreatedAtLabel,
	getIncidentOfferDescription,
	getIncidentOfferIncidentCode,
	getIncidentOfferLocation,
	getIncidentOfferOperationalText,
	getIncidentOfferRespondedAtLabel,
	getIncidentOfferSentAtLabel,
	getIncidentOfferServiceCategory,
	getIncidentOfferServiceName,
	getIncidentOfferStatusFromEntry,
	getIncidentOfferStatusLabel,
	getIncidentOfferVehicleLabel,
	INCIDENT_OFFER_STATUS_OPTIONS,
	IncidentOfferEntry,
	IncidentOfferDetail,
	IncidentOfferListItem,
	IncidentOfferPagination,
	IncidentOfferResponseMode,
	IncidentOfferStatus,
	isIncidentOfferExpiredLocally,
	isIncidentOfferPending,
	toIncidentOfferListItem,
} from "../../../entities/incident-offer/model";
import { IncidentOfferStatusBadge } from "../../../entities/incident-offer/ui/incident-offer-status-badge/incident-offer-status-badge";
import { getIncidentPriorityLabel } from "../../../entities/incident/model";
import { getApiErrorMessage } from "../../../shared/api";
import {
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	ResourceActionItem,
	ResourceActionsMenu,
	SideDrawer,
	StatCard,
} from "../../../shared/custom-components";

export type IncidentOfferRespondAction = {
	item: IncidentOfferEntry;
	mode: IncidentOfferResponseMode;
};

@Component({
	selector: "app-tenant-incident-offers-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		StatCard,
		IncidentOfferStatusBadge,
	],
	providers: [
		provideIcons({
			lucideBot,
			lucideCalendar,
			lucideClock,
			lucideHash,
			lucideInfo,
			lucideMapPin,
			lucideMessageSquare,
			lucideTimer,
			lucideWrench,
		}),
	],
	templateUrl: "./tenant-incident-offers-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantIncidentOffersList implements OnInit {
	private readonly incidentOfferApi = inject(IncidentOfferApi);

	readonly respondClicked = output<IncidentOfferRespondAction>();

	protected readonly items = signal<IncidentOfferListItem[]>([]);
	protected readonly pagination = signal<IncidentOfferPagination>(
		createEmptyIncidentOfferPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly status = signal<IncidentOfferStatus | "">("");
	protected readonly statusOptions = INCIDENT_OFFER_STATUS_OPTIONS;

	protected readonly selectedItem = signal<IncidentOfferDetail | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly stats = signal({
		total: 0,
		pending: 0,
		accepted: 0,
		rejected: 0,
		expired: 0,
		cancelled: 0,
	});

	protected readonly filteredItems = computed<IncidentOfferListItem[]>(() => {
		const search = this.search().trim().toLowerCase();

		if (!search) {
			return this.items();
		}

		return this.items().filter(item => {
			const incidentCode = getIncidentOfferIncidentCode(item).toLowerCase();
			const description = getIncidentOfferDescription(item).toLowerCase();
			const location = getIncidentOfferLocation(item).toLowerCase();
			const serviceName = getIncidentOfferServiceName(item).toLowerCase();
			const status = getIncidentOfferStatusLabel(
				getIncidentOfferStatusFromEntry(item)
			).toLowerCase();

			return (
				incidentCode.includes(search) ||
				description.includes(search) ||
				location.includes(search) ||
				serviceName.includes(search) ||
				status.includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStats();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.incidentOfferApi
			.listCurrentTenantOffers({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				offer_status: this.status(),
			})
			.subscribe({
				next: response => {
					this.items.set(response.items);
					this.pagination.set(response.pagination);
					this.isLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoading.set(false);

					toast.error("No se pudieron cargar las ofertas", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 1,
				offer_status: "",
			}),
			pending: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 1,
				offer_status: "PENDING",
			}),
			accepted: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 1,
				offer_status: "ACCEPTED",
			}),
			rejected: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 1,
				offer_status: "REJECTED",
			}),
			expired: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 1,
				offer_status: "EXPIRED",
			}),
			cancelled: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 1,
				offer_status: "CANCELLED",
			}),
		}).subscribe({
			next: response => {
				this.stats.set({
					total: response.all.pagination.total,
					pending: response.pending.pagination.total,
					accepted: response.accepted.pagination.total,
					rejected: response.rejected.pagination.total,
					expired: response.expired.pagination.total,
					cancelled: response.cancelled.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					pending: 0,
					accepted: 0,
					rejected: 0,
					expired: 0,
					cancelled: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onStatusFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as IncidentOfferStatus | "");
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onPageChange(page: number): void {
		this.pagination.update(current => ({
			...current,
			page,
		}));

		this.load();
	}

	protected onPageSizeChange(pageSize: number): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
			page_size: pageSize,
		}));

		this.load();
	}

	protected openDetail(item: IncidentOfferEntry): void {
		const offerId = getIncidentOfferId(item);

		if (!offerId) {
			this.detailErrorMessage.set("La oferta no tiene un identificador válido.");
			this.isDetailDrawerOpen.set(true);
			this.isDetailLoading.set(false);
			this.selectedItem.set(null);

			toast.error("No se pudo abrir la oferta", {
				description: "La oferta no tiene un identificador válido.",
			});

			return;
		}

		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedItem.set(null);

		this.incidentOfferApi.getCurrentTenantOfferById(offerId).subscribe({
			next: detail => {
				this.selectedItem.set(detail);
				this.isDetailLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.detailErrorMessage.set(message);
				this.isDetailLoading.set(false);

				toast.error("No se pudo cargar el detalle de la oferta", {
					description: message,
				});
			},
		});
	}

	protected closeDetail(): void {
		this.isDetailDrawerOpen.set(false);
		this.selectedItem.set(null);
		this.detailErrorMessage.set(null);
	}

	protected actionsFor(item: IncidentOfferEntry): ResourceActionItem[] {
		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (isIncidentOfferPending(item) && !isIncidentOfferExpiredLocally(item)) {
			actions.push(
				{
					id: "accept",
					label: "Aceptar",
				},
				{
					id: "reject",
					label: "Rechazar",
					destructive: true,
				}
			);
		}

		return actions;
	}

	protected onAction(actionId: string, item: IncidentOfferEntry): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "accept") {
			this.respondClicked.emit({
				item,
				mode: "ACCEPT",
			});
			return;
		}

		if (actionId === "reject") {
			this.respondClicked.emit({
				item,
				mode: "REJECT",
			});
		}
	}

	patchItem(updated: IncidentOfferEntry): void {
		const updatedItem = toIncidentOfferListItem(updated);

		this.items.update(items =>
			items.map(item =>
				this.offerIdOrNull(item) === this.offerIdOrNull(updatedItem)
					? updatedItem
					: item
			)
		);

		if (this.offerIdOrNull(this.selectedItem()) === this.offerIdOrNull(updatedItem)) {
			this.selectedItem.set(
				"offer" in updated ? updated : this.selectedItem()
			);
		}
	}

	protected offerStatus(item: IncidentOfferEntry): IncidentOfferStatus {
		return getIncidentOfferStatusFromEntry(item);
	}

	protected incidentCode(item: IncidentOfferEntry): string {
		return getIncidentOfferIncidentCode(item);
	}

	protected description(item: IncidentOfferEntry): string {
		return getIncidentOfferDescription(item);
	}

	protected location(item: IncidentOfferEntry): string {
		return getIncidentOfferLocation(item);
	}

	protected serviceName(item: IncidentOfferEntry): string {
		return getIncidentOfferServiceName(item);
	}

	protected serviceCategory(item: IncidentOfferEntry): string {
		return getIncidentOfferServiceCategory(item);
	}

	protected vehicleLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferVehicleLabel(item);
	}

	protected aiSummary(item: IncidentOfferDetail): string {
		return getIncidentOfferAiSummary(item);
	}

	protected operationalText(item: IncidentOfferEntry): string {
		return getIncidentOfferOperationalText(item);
	}

	protected priorityLabel(item: IncidentOfferEntry): string {
		if ("incident_priority" in item) {
			return item.incident_priority || "Sin prioridad";
		}

		return item.incident
			? getIncidentPriorityLabel(item.incident)
			: "Sin prioridad";
	}

	protected sentAtLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferSentAtLabel(item);
	}

	protected expiresAtLabel(item: IncidentOfferEntry): string {
		return formatIncidentOfferExpiration(item);
	}

	protected respondedAtLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferRespondedAtLabel(item);
	}

	protected responseTimeLabel(item: IncidentOfferEntry): string {
		return formatIncidentOfferResponseTime(item);
	}

	protected incidentCreatedAtLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferCreatedAtLabel(item);
	}

	protected isPending(item: IncidentOfferEntry): boolean {
		return isIncidentOfferPending(item) && !isIncidentOfferExpiredLocally(item);
	}

	protected detailOfferMessage(item: IncidentOfferEntry): string | null {
		if ("offer_status" in item) {
			return null;
		}

		return item.offer?.message ?? null;
	}

	protected detailOfferResponseMessage(
		item: IncidentOfferEntry
	): string | null {
		if ("offer_status" in item) {
			return null;
		}

		return item.offer?.response_message ?? null;
	}

	private offerIdOrNull(item: IncidentOfferEntry | null): string | null {
		return getIncidentOfferId(item);
	}
}
