import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideClock,
	lucideHash,
	lucideMapPin,
	lucideShield,
	lucideUsers,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";
import { IncidentApi } from "../../../entities/incident/api";
import {
	createEmptyIncidentPagination,
	formatIncidentDate,
	getIncidentLocationLabel,
	getIncidentPriorityLabel,
	getIncidentStatusLabel,
	INCIDENT_PRIORITY_OPTIONS,
	INCIDENT_STATUS_OPTIONS,
	Incident,
	IncidentListQuery,
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
	ResourceActionItem,
	ResourceActionsMenu,
	SideDrawer,
} from "../../../shared/custom-components";
import { IncidentAiAnalysesPanel } from "../../../widgets/incident-ai-analysis/incident-ai-analyses-panel/incident-ai-analyses-panel";

@Component({
	selector: "app-tenant-incidents-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		HlmInputImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		IncidentStatusBadge,
		IncidentAiAnalysesPanel,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideHash,
			lucideMapPin,
			lucideShield,
			lucideUsers,
		}),
	],
	templateUrl: "./tenant-incidents-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantIncidentsList implements OnInit {
	private readonly incidentApi = inject(IncidentApi);

	protected readonly items = signal<Incident[]>([]);
	protected readonly pagination = signal(createEmptyIncidentPagination());
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly statusFilter = signal<IncidentStatus | "">("");
	protected readonly priorityFilter = signal<IncidentPriority | "">("");
	protected readonly reportedFromFilter = signal("");
	protected readonly reportedToFilter = signal("");

	protected readonly statusOptions = INCIDENT_STATUS_OPTIONS;
	protected readonly priorityOptions = INCIDENT_PRIORITY_OPTIONS;

	protected readonly selectedIncident = signal<Incident | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly selectedAnalysisIncident = signal<Incident | null>(null);
	protected readonly isAnalysisOpen = signal(false);

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.incidentApi.listCurrentTenantIncidents(this.buildQuery()).subscribe({
			next: response => {
				this.items.set(response.items);
				this.pagination.set(response.pagination);
				this.isLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isLoading.set(false);

				toast.error("No se pudieron cargar los incidentes", {
					description: message,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
		this.resetToFirstPage();
		this.load();
	}

	protected onStatusChange(event: Event): void {
		this.statusFilter.set(this.inputValue(event) as IncidentStatus | "");
		this.resetToFirstPage();
		this.load();
	}

	protected onPriorityChange(event: Event): void {
		this.priorityFilter.set(this.inputValue(event) as IncidentPriority | "");
		this.resetToFirstPage();
		this.load();
	}

	protected onReportedFromChange(event: Event): void {
		this.reportedFromFilter.set(this.inputValue(event));
		this.resetToFirstPage();
		this.load();
	}

	protected onReportedToChange(event: Event): void {
		this.reportedToFilter.set(this.inputValue(event));
		this.resetToFirstPage();
		this.load();
	}

	protected clearFilters(): void {
		this.search.set("");
		this.statusFilter.set("");
		this.priorityFilter.set("");
		this.reportedFromFilter.set("");
		this.reportedToFilter.set("");
		this.resetToFirstPage();
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

	protected actionsFor(_: Incident): ResourceActionItem[] {
		return [{ id: "view", label: "Ver detalle" }];
	}

	protected onAction(actionId: string, item: Incident): void {
		if (actionId === "view") {
			this.openDetail(item);
		}
	}

	protected openDetail(item: Incident): void {
		this.selectedIncident.set(item);
		this.isDetailOpen.set(true);
		this.isDetailLoading.set(true);

		this.incidentApi.getCurrentTenantIncident(item.id).subscribe({
			next: incident => {
				this.selectedIncident.set(incident);
				this.isDetailLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.isDetailLoading.set(false);

				toast.error("No se pudo cargar el incidente", {
					description: message,
				});
			},
		});
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

	protected incidentTitle(item: Incident): string {
		return item.title?.trim() || item.incident_code;
	}

	protected incidentStatusLabel(item: Incident): string {
		return getIncidentStatusLabel(item.status);
	}

	protected incidentPriorityLabel(item: Incident): string {
		return getIncidentPriorityLabel(item.priority);
	}

	protected incidentDate(value: string | null): string {
		return formatIncidentDate(value);
	}

	protected incidentLocation(item: Incident): string {
		return getIncidentLocationLabel(item);
	}

	protected trackIncident(_: number, item: Incident): string {
		return item.id;
	}

	private buildQuery(): IncidentListQuery {
		return {
			page: this.pagination().page,
			page_size: this.pagination().page_size,
			search: this.search().trim() || undefined,
			status: this.statusFilter() || undefined,
			priority: this.priorityFilter() || undefined,
			reported_from: this.reportedFromFilter() || undefined,
			reported_to: this.reportedToFilter() || undefined,
		};
	}

	private resetToFirstPage(): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));
	}

	private inputValue(event: Event): string {
		return (event.target as HTMLInputElement).value;
	}
}
