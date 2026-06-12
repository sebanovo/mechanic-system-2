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
	lucideCalendarDays,
	lucideCircleCheckBig,
	lucideCircleX,
	lucideClock3,
	lucideMapPinned,
	lucideRefreshCw,
	lucideShieldCheck,
	lucideTimer,
	lucideUsersRound,
	lucideWrench,
} from "@ng-icons/lucide";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from "ng2-charts";
import { finalize } from "rxjs";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";
import {
	ErrorState,
	LoadingState,
	PageSection,
} from "../../../shared/custom-components";
import { getApiErrorMessage } from "../../../shared/api";
import { DashboardChartCard, DashboardKpiCard } from "../../../entities/owner-dashboard/ui";
import {
	DashboardKpiView,
} from "../../../entities/owner-dashboard/model";
import {
	PlatformDashboardApi,
} from "../../../entities/platform-dashboard/api";
import {
	buildPlatformDashboardCharts,
	buildPlatformDashboardKpis,
	createDefaultDashboardFilters,
	formatDashboardRange,
	toDashboardApiDate,
	validateDashboardDateRange,
	PlatformDashboardChartView,
	PlatformDashboardDateFilters,
	PlatformOperationalDashboard,
} from "../../../entities/platform-dashboard";
import {
	DASHBOARD_BAR_OPTIONS,
	DASHBOARD_HORIZONTAL_BAR_OPTIONS,
	DASHBOARD_LINE_OPTIONS,
	DASHBOARD_PERCENTAGE_OPTIONS,
} from "../../../entities/owner-dashboard/lib";

@Component({
	selector: "app-platform-dashboard",
	standalone: true,
	imports: [
		NgIcon,
		BaseChartDirective,
		HlmButtonImports,
		HlmInputImports,
		DashboardKpiCard,
		DashboardChartCard,
		ErrorState,
		LoadingState,
		PageSection,
	],
	providers: [
		provideCharts(withDefaultRegisterables()),
		provideIcons({
			lucideCalendarDays,
			lucideCircleCheckBig,
			lucideCircleX,
			lucideClock3,
			lucideMapPinned,
			lucideRefreshCw,
			lucideShieldCheck,
			lucideTimer,
			lucideUsersRound,
			lucideWrench,
		}),
	],
	templateUrl: "./platform-dashboard.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformDashboard implements OnInit {
	private readonly platformDashboardApi = inject(PlatformDashboardApi);

	protected readonly dashboard = signal<PlatformOperationalDashboard | null>(null);
	protected readonly filters = signal<PlatformDashboardDateFilters>(
		createDefaultDashboardFilters()
	);
	protected readonly appliedFilters = signal<PlatformDashboardDateFilters>(
		createDefaultDashboardFilters()
	);
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly kpis = computed<DashboardKpiView[]>(() => {
		const dashboard = this.dashboard();
		return dashboard ? buildPlatformDashboardKpis(dashboard.kpis) : [];
	});

	protected readonly metricKpis = computed(() =>
		this.kpis().filter(kpi => kpi.type === "metric")
	);

	protected readonly listKpis = computed(() =>
		this.kpis().filter(kpi => kpi.type === "list")
	);

	protected readonly charts = computed<PlatformDashboardChartView | null>(() => {
		const dashboard = this.dashboard();
		return dashboard ? buildPlatformDashboardCharts(dashboard.charts) : null;
	});

	protected readonly appliedRangeLabel = computed(() =>
		formatDashboardRange(this.appliedFilters())
	);

	protected readonly barOptions = DASHBOARD_BAR_OPTIONS;
	protected readonly horizontalBarOptions = DASHBOARD_HORIZONTAL_BAR_OPTIONS;
	protected readonly percentageOptions = DASHBOARD_PERCENTAGE_OPTIONS;
	protected readonly lineOptions = DASHBOARD_LINE_OPTIONS;

	ngOnInit(): void {
		this.load();
	}

	protected load(): void {
		const filters = this.filters();
		const validationError = validateDashboardDateRange(filters);

		if (validationError) {
			toast.error("Rango de fechas inválido", {
				description: validationError,
			});

			return;
		}

		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.platformDashboardApi
			.getOperationalDashboard({
				date_from: toDashboardApiDate(filters.date_from),
				date_to: toDashboardApiDate(filters.date_to, true),
			})
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				})
			)
			.subscribe({
				next: dashboard => {
					this.dashboard.set(dashboard);
					this.appliedFilters.set({ ...filters });
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);

					toast.error("No se pudo cargar el dashboard", {
						description: message,
					});
				},
			});
	}

	protected updateFilter(
		key: keyof PlatformDashboardDateFilters,
		value: string
	): void {
		this.filters.update(current => ({
			...current,
			[key]: value,
		}));
	}

	protected resetRange(): void {
		this.filters.set(createDefaultDashboardFilters());
		this.load();
	}

	protected hasData(): boolean {
		return this.dashboard() !== null;
	}
}
