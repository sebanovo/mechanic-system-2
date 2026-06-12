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
	lucideCalendar,
	lucideHash,
	lucideInfo,
	lucideMapPinned,
	lucideRefreshCw,
	lucideSearch,
	lucideTag,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { finalize } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";
import { IncidentApi } from "../../../entities/incident/api";
import {
	createEmptyIncidentPagination,
	formatIncidentDate,
	getIncidentLocationLabel,
	getIncidentPriorityLabel,
	INCIDENT_PRIORITY_OPTIONS,
	INCIDENT_STATUS_OPTIONS,
	Incident,
	IncidentListQuery,
	IncidentPagination,
	IncidentPriority,
	IncidentStatus,
} from "../../../entities/incident/model";
import { IncidentStatusBadge } from "../../../entities/incident/ui";
import { getApiErrorMessage } from "../../../shared/api";
import {
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	SideDrawer,
} from "../../../shared/custom-components";
import { IncidentAiAnalysesPanel } from "../../../widgets/incident-ai-analysis/incident-ai-analyses-panel/incident-ai-analyses-panel";

type IncidentFilters = {
	search: string;
	status: IncidentStatus | "";
	priority: IncidentPriority | "";
	service_catalog_id: string;
	customer_id: string;
	vehicle_id: string;
	reported_from: string;
	reported_to: string;
};

function createEmptyIncidentFilters(): IncidentFilters {
	return {
		search: "",
		status: "",
		priority: "",
		service_catalog_id: "",
		customer_id: "",
		vehicle_id: "",
		reported_from: "",
		reported_to: "",
	};
}

@Component({
	selector: "app-platform-incidents-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		HlmInputImports,
		DataToolbar,
		PageSection,
		ErrorState,
		LoadingState,
		Pagination,
		SideDrawer,
		IncidentStatusBadge,
		IncidentAiAnalysesPanel,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideHash,
			lucideInfo,
			lucideMapPinned,
			lucideRefreshCw,
			lucideSearch,
			lucideTag,
		}),
	],
	templateUrl: "./platform-incidents-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformIncidentsList implements OnInit {
	private readonly incidentApi = inject(IncidentApi);

	protected readonly items = signal<Incident[]>([]);
	protected readonly pagination = signal<IncidentPagination>(
		createEmptyIncidentPagination()
	);
	protected readonly filters = signal<IncidentFilters>(createEmptyIncidentFilters());
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly selectedIncident = signal<Incident | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly selectedAnalysisIncident = signal<Incident | null>(null);
	protected readonly isAnalysisOpen = signal(false);

	protected readonly statusOptions = INCIDENT_STATUS_OPTIONS;
	protected readonly priorityOptions = INCIDENT_PRIORITY_OPTIONS;

	protected readonly filteredItems = computed(() => this.items());

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		const filters = this.filters();
		const query: IncidentListQuery = {
			page: this.pagination().page,
			page_size: this.pagination().page_size,
			search: filters.search.trim() || undefined,
			status: filters.status || undefined,
			priority: filters.priority || undefined,
			service_catalog_id: filters.service_catalog_id.trim() || undefined,
			customer_id: filters.customer_id.trim() || undefined,
			vehicle_id: filters.vehicle_id.trim() || undefined,
			reported_from: filters.reported_from
				? new Date(`${filters.reported_from}T00:00:00`).toISOString()
				: undefined,
			reported_to: filters.reported_to
				? new Date(`${filters.reported_to}T23:59:59.999`).toISOString()
				: undefined,
		};

		this.incidentApi
			.listPlatformIncidents(query)
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

					toast.error("No se pudieron cargar los incidentes", {
						description: message,
					});
				},
			});
	}

	protected onSearch(value: string): void {
		this.filters.update(current => ({
			...current,
			search: value,
		}));
	}

	protected onStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.filters.update(current => ({
			...current,
			status: target.value as IncidentStatus | "",
		}));
	}

	protected onPriorityChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.filters.update(current => ({
			...current,
			priority: target.value as IncidentPriority | "",
		}));
	}

	protected onReportedFromChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			reported_from: this.inputValue(event),
		}));
	}

	protected onReportedToChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			reported_to: this.inputValue(event),
		}));
	}

	protected onCustomerChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			customer_id: this.inputValue(event),
		}));
	}

	protected onVehicleChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			vehicle_id: this.inputValue(event),
		}));
	}

	protected onServiceCatalogChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			service_catalog_id: this.inputValue(event),
		}));
	}

	protected applyFilters(): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected clearFilters(): void {
		this.filters.set(createEmptyIncidentFilters());
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

	protected openDetail(item: Incident): void {
		this.selectedIncident.set(item);
		this.isDetailOpen.set(true);
		this.loadDetail(item.id);
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedIncident.set(null);
	}

	protected openAnalysis(item: Incident): void {
		this.selectedAnalysisIncident.set(item);
		this.isAnalysisOpen.set(true);
	}

	protected closeAnalysis(): void {
		this.isAnalysisOpen.set(false);
		this.selectedAnalysisIncident.set(null);
	}

	protected priorityLabel(item: Incident): string {
		return getIncidentPriorityLabel(item.priority);
	}

	protected dateLabel(value: string | null): string {
		return formatIncidentDate(value);
	}

	protected locationLabel(item: Incident): string {
		return getIncidentLocationLabel(item);
	}

	private loadDetail(incidentId: string): void {
		this.isDetailLoading.set(true);

		this.incidentApi
			.getPlatformIncidentById(incidentId)
			.pipe(
				finalize(() => {
					this.isDetailLoading.set(false);
				})
			)
			.subscribe({
				next: incident => {
					this.selectedIncident.set(incident);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					toast.error("No se pudo cargar el incidente", {
						description: message,
					});
				},
			});
	}

	private inputValue(event: Event): string {
		return (event.target as HTMLInputElement).value;
	}
}
