import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-dashboard-chart-card",
	standalone: true,
	templateUrl: "./dashboard-chart-card.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartCard {
	readonly title = input.required<string>();
	readonly description = input.required<string>();
	readonly chartHeightClass = input("h-72");
}
