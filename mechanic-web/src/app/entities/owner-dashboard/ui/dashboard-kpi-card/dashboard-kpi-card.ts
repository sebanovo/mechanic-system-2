import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { NgIcon } from "@ng-icons/core";

import { DashboardKpiView, DashboardListKpiView, DashboardMetricKpiView } from "../../model";

@Component({
	selector: "app-dashboard-kpi-card",
	standalone: true,
	imports: [NgIcon],
	templateUrl: "./dashboard-kpi-card.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardKpiCard {
	readonly kpi = input.required<DashboardKpiView>();

	protected readonly metricKpi = computed<DashboardMetricKpiView | null>(() =>
		this.kpi().type === "metric" ? (this.kpi() as DashboardMetricKpiView) : null
	);

	protected readonly listKpi = computed<DashboardListKpiView | null>(() =>
		this.kpi().type === "list" ? (this.kpi() as DashboardListKpiView) : null
	);

	protected readonly iconClasses = computed(() =>
		this.resolveIconClasses(this.kpi().tone)
	);

	private resolveIconClasses(tone: DashboardKpiView["tone"]): string {
		const classes: Record<DashboardKpiView["tone"], string> = {
			blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
			indigo:
				"bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
			red: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
			green:
				"bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
			amber:
				"bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
			emerald:
				"bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
			rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
			violet:
				"bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
		};

		return classes[tone];
	}
}
