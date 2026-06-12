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
			blue: "bg-[#FFF9C4] text-black border border-black",
			indigo: "bg-[#FFF176] text-black border border-black",
			red: "bg-red-50 text-red-700 border border-red-300 dark:bg-red-950/40 dark:text-red-300",
			green: "bg-green-50 text-green-700 border border-green-300 dark:bg-green-950/40 dark:text-green-300",
			amber: "bg-primary text-black border border-black",
			emerald: "bg-[#FFEB3B] text-black border border-black",
			rose: "bg-[#FFE082] text-black border border-black",
			violet: "bg-[#FFCA28] text-black border border-black",
		};

		return classes[tone];
	}
}
