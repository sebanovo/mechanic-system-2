import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	computed,
	inject,
	input,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideChartSpline,
	lucideCode2,
	lucideHash,
	lucideList,
	lucideRefreshCw,
	lucideSearch,
	lucideShield,
	lucideSparkles,
	lucideTag,
	lucideTimerReset,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { finalize } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";
import { IncidentAiAnalysisApi } from "../../../entities/incident-ai-analysis/api";
import {
	createEmptyIncidentAiAnalysisPagination,
	formatIncidentAiAnalysisDate,
	formatIncidentAiAnalysisResult,
	formatIncidentAiAnalysisScore,
	getIncidentAiAnalysisPriorityLabel,
	INCIDENT_AI_ANALYSIS_PRIORITY_OPTIONS,
	IncidentAiAnalysis,
	IncidentAiAnalysisListQuery,
	IncidentAiAnalysisPriority,
} from "../../../entities/incident-ai-analysis/model";
import { IncidentAiAnalysisPriorityBadge } from "../../../entities/incident-ai-analysis/ui";
import { Incident } from "../../../entities/incident/model";
import { getApiErrorMessage } from "../../../shared/api";
import {
	ConfirmActionDialog,
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
import { CreateIncidentAiAnalysisForm } from "../../../features/incident-ai-analysis/create-incident-ai-analysis/create-incident-ai-analysis-form";

type AnalysisFilters = {
	incident_id: string;
	analysis_version: string;
	probable_service_code: string;
	recommended_priority: IncidentAiAnalysisPriority | "";
};

function createEmptyFilters(): AnalysisFilters {
	return {
		incident_id: "",
		analysis_version: "",
		probable_service_code: "",
		recommended_priority: "",
	};
}

@Component({
	selector: "app-incident-ai-analyses-panel",
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
		ConfirmActionDialog,
		StatCard,
		IncidentAiAnalysisPriorityBadge,
		CreateIncidentAiAnalysisForm,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideChartSpline,
			lucideCode2,
			lucideHash,
			lucideList,
			lucideRefreshCw,
			lucideSearch,
			lucideShield,
			lucideSparkles,
			lucideTag,
			lucideTimerReset,
		}),
	],
	templateUrl: "./incident-ai-analyses-panel.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentAiAnalysesPanel implements OnInit {
	private readonly analysisApi = inject(IncidentAiAnalysisApi);

	readonly scope = input<"platform" | "tenant">("platform");
	readonly incident = input<Incident | null>(null);
	readonly allowCreate = input(true);

	protected readonly items = signal<IncidentAiAnalysis[]>([]);
	protected readonly pagination = signal(
		createEmptyIncidentAiAnalysisPagination()
	);
	protected readonly filters = signal<AnalysisFilters>(createEmptyFilters());
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly selectedAnalysis = signal<IncidentAiAnalysis | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly isCreateOpen = signal(false);

	protected readonly priorityOptions =
		INCIDENT_AI_ANALYSIS_PRIORITY_OPTIONS;

	protected readonly showIncidentFilter = computed(
		() => this.scope() === "platform" && this.incident() === null
	);

	protected readonly canCreateAnalysis = computed(
		() => this.allowCreate() && this.incident() !== null
	);

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		const filters = this.filters();
		const query = this.buildQuery(filters);

		this.listRequest(query)
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
					toast.error("No se pudieron cargar los análisis IA", {
						description: message,
					});
				},
			});
	}

	protected onSearch(value: string): void {
		this.filters.update(current => ({
			...current,
			analysis_version: value,
		}));
		this.load();
	}

	protected onIncidentIdChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			incident_id: this.inputValue(event),
		}));
	}

	protected onServiceCodeChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			probable_service_code: this.inputValue(event),
		}));
	}

	protected onPriorityChange(event: Event): void {
		this.filters.update(current => ({
			...current,
			recommended_priority: this.inputValue(event) as
				| IncidentAiAnalysisPriority
				| "",
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
		this.filters.set(createEmptyFilters());
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

	protected actionsFor(item: IncidentAiAnalysis): ResourceActionItem[] {
		return [{ id: "view", label: "Ver detalle" }];
	}

	protected onAction(actionId: string, item: IncidentAiAnalysis): void {
		if (actionId === "view") {
			this.openDetail(item);
		}
	}

	protected openDetail(item: IncidentAiAnalysis): void {
		this.selectedAnalysis.set(item);
		this.isDetailOpen.set(true);
		this.isDetailLoading.set(true);

		this.detailRequest(item.id).subscribe({
			next: analysis => {
				this.selectedAnalysis.set(analysis);
				this.isDetailLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.isDetailLoading.set(false);

				toast.error("No se pudo cargar el análisis IA", {
					description: message,
				});
			},
		});
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedAnalysis.set(null);
	}

	protected openCreate(): void {
		if (!this.canCreateAnalysis()) {
			return;
		}

		this.isCreateOpen.set(true);
	}

	protected closeCreate(): void {
		this.isCreateOpen.set(false);
	}

	protected onCreated(_: IncidentAiAnalysis): void {
		this.isCreateOpen.set(false);
		this.load();
	}

	protected analysisPriorityLabel(
		value: IncidentAiAnalysisPriority | string | null
	): string {
		return getIncidentAiAnalysisPriorityLabel(value);
	}

	protected dateLabel(value: string | null): string {
		return formatIncidentAiAnalysisDate(value);
	}

	protected scoreLabel(value: number | null): string {
		return formatIncidentAiAnalysisScore(value);
	}

	protected resultLabel(value: Record<string, unknown> | null): string {
		return formatIncidentAiAnalysisResult(value);
	}

	protected trackAnalysis(_: number, item: IncidentAiAnalysis): string {
		return item.id;
	}

	private buildQuery(filters: AnalysisFilters): IncidentAiAnalysisListQuery {
		return {
			page: this.pagination().page,
			page_size: this.pagination().page_size,
			incident_id: this.incident()
				? this.incident()!.id
				: this.showIncidentFilter() && filters.incident_id.trim()
					? filters.incident_id.trim()
					: undefined,
			analysis_version: filters.analysis_version.trim() || undefined,
			probable_service_code: filters.probable_service_code.trim() || undefined,
			recommended_priority: filters.recommended_priority || undefined,
		};
	}

	private listRequest(query: IncidentAiAnalysisListQuery) {
		if (this.scope() === "tenant" && this.incident() !== null) {
			return this.analysisApi.listCurrentTenantIncidentAiAnalyses(
				this.incident()!.id,
				{
					page: query.page,
					page_size: query.page_size,
					analysis_version: query.analysis_version,
				}
			);
		}

		return this.analysisApi.listPlatformIncidentAiAnalyses(query);
	}

	private detailRequest(analysisId: string) {
		if (this.scope() === "tenant" && this.incident() !== null) {
			return this.analysisApi.getCurrentTenantIncidentAiAnalysis(
				this.incident()!.id,
				analysisId
			);
		}

		return this.analysisApi.getPlatformIncidentAiAnalysis(analysisId);
	}

	private inputValue(event: Event): string {
		return (event.target as HTMLInputElement).value;
	}
}
