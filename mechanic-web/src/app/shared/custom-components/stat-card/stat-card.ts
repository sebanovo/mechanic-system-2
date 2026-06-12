import { ChangeDetectionStrategy, Component, input } from "@angular/core";

import { StatusTone } from "../../types";

@Component({
	selector: "app-stat-card",
	standalone: true,
	templateUrl: "./stat-card.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
	readonly label = input.required<string>();
	readonly value = input.required<number | string>();
	readonly description = input<string | null>(null);
	readonly tone = input<StatusTone>("default");
}
