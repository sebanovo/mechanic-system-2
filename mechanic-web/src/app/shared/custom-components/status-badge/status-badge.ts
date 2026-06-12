import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { HlmBadgeImports } from "@shared/ui/badge";
import { StatusTone } from "../../types";

@Component({
	selector: "app-status-badge",
	standalone: true,
	imports: [HlmBadgeImports],
	templateUrl: "./status-badge.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
	readonly label = input.required<string>();
	readonly tone = input<StatusTone>("default");

	protected readonly toneClass = computed(() => {
		switch (this.tone()) {
			case "success":
				return "bg-success text-success-foreground border-transparent";
			case "warning":
				return "bg-warning text-warning-foreground border-transparent";
			case "info":
				return "bg-info text-info-foreground border-transparent";
			case "destructive":
				return "bg-destructive text-destructive-foreground border-transparent";
			case "muted":
				return "bg-muted text-muted-foreground border-transparent";
			default:
				return "bg-primary text-primary-foreground border-transparent";
		}
	});
}
