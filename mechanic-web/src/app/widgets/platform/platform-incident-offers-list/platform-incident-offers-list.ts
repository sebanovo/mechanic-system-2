import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBot,
	lucideCalendar,
	lucideClock,
	lucideHash,
	lucideInfo,
	lucideMapPinned,
	lucideRefreshCw,
	lucideSearch,
	lucideTag,
	lucideUser,
	lucideWrench,
} from "@ng-icons/lucide";
import { finalize } from "rxjs";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { IncidentOfferApi } from "../../../entities/incident-offer/api";
import {
	createEmptyIncidentOfferPagination,
	formatIncidentOfferDate,
	formatIncidentOfferExpiration,
	formatIncidentOfferResponseTime,
	IncidentOfferEntry,
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
	INCIDENT_OFFER_STATUS_OPTIONS,
	IncidentOfferDetail,
	IncidentOfferListItem,
	IncidentOfferPagination,
	IncidentOfferStatus,
} from "../../../entities/incident-offer/model";
import { IncidentOfferStatusBadge } from "../../../entities/incident-offer/ui/incident-offer-status-badge/incident-offer-status-badge";
import {
	IncidentStatusBadge,
} from "../../../entities/incident/ui";
import { getIncidentPriorityLabel } from "../../../entities/incident/model";
import { getApiErrorMessage } from "../../../shared/api";
import {
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	SideDrawer,
} from "../../../shared/custom-components";

type IncidentOfferFilters = {
	offer_status: IncidentOfferStatus | "";
};

function createEmptyIncidentOfferFilters(): IncidentOfferFilters {
	return {
		offer_status: "",
	};
}

@Component({
	selector: "app-platform-incident-offers-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		SideDrawer,
		IncidentOfferStatusBadge,
		IncidentStatusBadge,
	],
	providers: [
		provideIcons({
			lucideBot,
			lucideCalendar,
			lucideClock,
			lucideHash,
			lucideInfo,
			lucideMapPinned,
			lucideRefreshCw,
			lucideSearch,
			lucideTag,
			lucideUser,
			lucideWrench,
		}),
	],
	templateUrl: "./platform-incident-offers-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformIncidentOffersList implements OnInit {
	private readonly incidentOfferApi = inject(IncidentOfferApi);

	protected readonly items = signal<IncidentOfferListItem[]>([]);
	protected readonly pagination = signal<IncidentOfferPagination>(
		createEmptyIncidentOfferPagination()
	);
	protected readonly filters = signal<IncidentOfferFilters>(
		createEmptyIncidentOfferFilters()
	);
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly selectedOffer = signal<IncidentOfferDetail | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly statusOptions = INCIDENT_OFFER_STATUS_OPTIONS;

	protected readonly filteredItems = computed(() => this.items());

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		const filters = this.filters();

		this.incidentOfferApi
			.listPlatformIncidentOffers({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				offer_status: filters.offer_status || undefined,
			})
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				})
			)
			.subscribe({
				next: response => {
					this.items.set(response.items);
					this.pagination.set(response.pagination);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					toast.error("No se pudieron cargar las ofertas", {
						description: message,
					});
				},
			});
	}

	protected onStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.filters.update(current => ({
			...current,
			offer_status: target.value as IncidentOfferStatus | "",
		}));
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));
		this.load();
	}

	protected refresh(): void {
		this.load();
	}

	protected clearFilters(): void {
		this.filters.set(createEmptyIncidentOfferFilters());
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

	protected openDetail(item: IncidentOfferListItem): void {
		this.selectedOffer.set(null);
		this.detailErrorMessage.set(null);
		this.isDetailOpen.set(true);
		this.loadDetail(item.id);
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedOffer.set(null);
		this.detailErrorMessage.set(null);
	}

	protected offerStatus(item: IncidentOfferListItem | IncidentOfferDetail): IncidentOfferStatus {
		return getIncidentOfferStatusFromEntry(item);
	}

	protected incidentPriorityLabel(item: IncidentOfferListItem): string {
		return getIncidentPriorityLabel(item.incident_priority);
	}

	protected incidentPriority(detail: IncidentOfferDetail): string {
		return getIncidentPriorityLabel(detail.incident.priority);
	}

	protected incidentCode(item: IncidentOfferEntry): string {
		return getIncidentOfferIncidentCode(item);
	}

	protected incidentDescription(item: IncidentOfferEntry): string {
		return getIncidentOfferDescription(item);
	}

	protected locationLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferLocation(item);
	}

	protected serviceName(item: IncidentOfferEntry): string {
		return getIncidentOfferServiceName(item);
	}

	protected serviceCategory(item: IncidentOfferEntry): string {
		return getIncidentOfferServiceCategory(item);
	}

	protected createdAtLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferCreatedAtLabel(item);
	}

	protected sentAtLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferSentAtLabel(item);
	}

	protected respondedAtLabel(item: IncidentOfferEntry): string {
		return getIncidentOfferRespondedAtLabel(item);
	}

	protected expirationLabel(item: IncidentOfferEntry): string {
		return formatIncidentOfferExpiration(item);
	}

	protected responseTimeLabel(item: IncidentOfferEntry): string {
		return formatIncidentOfferResponseTime(item);
	}

	protected operationalText(item: IncidentOfferEntry): string {
		return getIncidentOfferOperationalText(item);
	}

	protected aiSummary(detail: IncidentOfferDetail): string {
		return getIncidentOfferAiSummary(detail);
	}

	protected formatDate(value: string | null): string {
		return formatIncidentOfferDate(value);
	}

	private loadDetail(offerId: string): void {
		this.isDetailLoading.set(true);

		this.incidentOfferApi
			.getPlatformIncidentOfferById(offerId)
			.pipe(
				finalize(() => {
					this.isDetailLoading.set(false);
				})
			)
			.subscribe({
				next: offer => {
					this.selectedOffer.set(offer);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.detailErrorMessage.set(message);
					toast.error("No se pudo cargar la oferta", {
						description: message,
					});
				},
			});
	}
}
