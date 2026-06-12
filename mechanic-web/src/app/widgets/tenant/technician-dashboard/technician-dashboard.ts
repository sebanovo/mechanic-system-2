import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import {
	NgIcon,
	provideIcons,
} from "@ng-icons/core";
import {
	lucideCalendarDays,
	lucideCircleCheckBig,
	lucideCircleX,
	lucideClock3,
	lucideRefreshCw,
	lucideShieldCheck,
	lucideTimer,
} from "@ng-icons/lucide";
import {
	BaseChartDirective,
	provideCharts,
	withDefaultRegisterables,
} from "ng2-charts";
import {
	finalize,
} from "rxjs";
import {
	toast,
} from "@spartan-ng/brain/sonner";

import {
	HlmButtonImports,
} from "@shared/ui/button";
import {
	HlmInputImports,
} from "@shared/ui/input";

import {
	TechnicianDashboardApi,
} from "../../../entities/technician-dashboard/api/technician-dashboard.api";
import {
	TechnicianDashboardDateFilters,
	TechnicianOperationalDashboard,
} from "../../../entities/technician-dashboard/model";
import {
	buildTechnicianComplianceKpi,
	buildTechnicianMetricKpis,
} from "../../../entities/technician-dashboard/lib/technician-dashboard.utils";
import {
	buildTechnicianCharts,
	TECHNICIAN_HORIZONTAL_BAR_OPTIONS,
	TECHNICIAN_LINE_OPTIONS,
	TECHNICIAN_PERCENTAGE_OPTIONS,
	TECHNICIAN_VERTICAL_BAR_OPTIONS,
	TechnicianDashboardChartView,
} from "../../../entities/technician-dashboard/lib/technician-dashboard-chart.utils";
import {
	CurrentAssignmentCard,
} from "../../../entities/technician-dashboard/ui";
import {
	createDefaultDashboardFilters,
	formatDashboardRange,
	toDashboardApiDate,
	validateDashboardDateRange,
} from "../../../entities/owner-dashboard/lib";
import {
	DashboardKpiCard,
} from "../../../entities/owner-dashboard/ui";
import {
	DashboardChartCard,
} from "../../../entities/owner-dashboard/ui";
import {
	getApiErrorMessage,
} from "../../../shared/api";
import {
	ErrorState,
	LoadingState,
	PageSection,
} from "../../../shared/custom-components";

@Component({
	selector:
		"app-technician-dashboard",
	standalone: true,
	imports: [
		NgIcon,
		BaseChartDirective,
		HlmButtonImports,
		HlmInputImports,
		CurrentAssignmentCard,
		DashboardKpiCard,
		DashboardChartCard,
		ErrorState,
		LoadingState,
		PageSection,
	],
	providers: [
		provideCharts(
			withDefaultRegisterables(),
		),
		provideIcons({
			lucideCalendarDays,
			lucideCircleCheckBig,
			lucideCircleX,
			lucideClock3,
			lucideRefreshCw,
			lucideShieldCheck,
			lucideTimer,
		}),
	],
	templateUrl:
		"./technician-dashboard.html",
	changeDetection:
		ChangeDetectionStrategy.OnPush,
})
export class TechnicianDashboard
	implements OnInit
{
	private readonly dashboardApi =
		inject(TechnicianDashboardApi);

	protected readonly dashboard =
		signal<
			TechnicianOperationalDashboard | null
		>(null);

	protected readonly filters =
		signal<TechnicianDashboardDateFilters>(
			createDefaultDashboardFilters(),
		);

	protected readonly appliedFilters =
		signal<TechnicianDashboardDateFilters>(
			createDefaultDashboardFilters(),
		);

	protected readonly isLoading =
		signal(false);

	protected readonly errorMessage =
		signal<string | null>(null);

	protected readonly metricKpis =
		computed(() => {
			const dashboard =
				this.dashboard();

			return dashboard
				? buildTechnicianMetricKpis(
						dashboard.kpis,
					)
				: [];
		});

	protected readonly complianceKpi =
		computed(() => {
			const dashboard =
				this.dashboard();

			return dashboard
				? buildTechnicianComplianceKpi(
						dashboard.kpis,
					)
				: null;
		});

	protected readonly charts =
		computed<
			TechnicianDashboardChartView | null
		>(() => {
			const dashboard =
				this.dashboard();

			return dashboard
				? buildTechnicianCharts(
						dashboard.charts,
					)
				: null;
		});

	protected readonly appliedRangeLabel =
		computed(() =>
			formatDashboardRange(
				this.appliedFilters(),
			),
		);

	protected readonly verticalBarOptions =
		TECHNICIAN_VERTICAL_BAR_OPTIONS;

	protected readonly horizontalBarOptions =
		TECHNICIAN_HORIZONTAL_BAR_OPTIONS;

	protected readonly percentageOptions =
		TECHNICIAN_PERCENTAGE_OPTIONS;

	protected readonly lineOptions =
		TECHNICIAN_LINE_OPTIONS;

	ngOnInit(): void {
		this.load();
	}

	protected load(): void {
		const filters =
			this.filters();

		const validationError =
			validateDashboardDateRange(
				filters,
			);

		if (validationError) {
			toast.error(
				"Rango de fechas inválido",
				{
					description:
						validationError,
				},
			);

			return;
		}

		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.dashboardApi
			.getOperationalDashboard({
				date_from:
					toDashboardApiDate(
						filters.date_from,
					),
				date_to:
					toDashboardApiDate(
						filters.date_to,
						true,
					),
			})
			.pipe(
				finalize(() =>
					this.isLoading.set(
						false,
					),
				),
			)
			.subscribe({
				next: dashboard => {
					this.dashboard.set(
						dashboard,
					);

					this.appliedFilters.set({
						...filters,
					});
				},
				error: error => {
					const message =
						getApiErrorMessage(
							error,
						);

					this.errorMessage.set(
						message,
					);

					toast.error(
						"No se pudo cargar el dashboard",
						{
							description:
								message,
						},
					);
				},
			});
	}

	protected updateFilter(
		key:
			keyof TechnicianDashboardDateFilters,
		value: string,
	): void {
		this.filters.update(
			current => ({
				...current,
				[key]: value,
			}),
		);
	}

	protected resetRange(): void {
		this.filters.set(
			createDefaultDashboardFilters(),
		);

		this.load();
	}

	protected hasData(): boolean {
		return this.dashboard() !== null;
	}

	protected hasServicesByType():
		boolean {
		return Boolean(
			this.dashboard()?.charts
				.services_by_type.length,
		);
	}

	protected hasCompletedTrend():
		boolean {
		return Boolean(
			this.dashboard()?.charts
				.completed_services_trend
				.length,
		);
	}

	protected hasCompliance():
		boolean {
		return Boolean(
			this.dashboard()?.charts
				.service_compliance.length,
		);
	}

	protected hasTopZones(): boolean {
		return Boolean(
			this.dashboard()?.charts
				.top_zones.length,
		);
	}
}
