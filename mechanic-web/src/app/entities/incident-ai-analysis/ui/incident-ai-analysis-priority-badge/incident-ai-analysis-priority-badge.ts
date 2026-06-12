import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { StatusConfig } from "../../../../shared/types";
import {
	getIncidentAiAnalysisPriorityConfig,
	IncidentAiAnalysisPriority,
} from "../../model";

@Component({
	selector: "app-incident-ai-analysis-priority-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge
			[label]="config().label"
			[tone]="config().tone"
		/>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentAiAnalysisPriorityBadge {
	readonly priority = input<IncidentAiAnalysisPriority | string | null>(null);

	protected readonly config = computed<StatusConfig<IncidentAiAnalysisPriority>>(
		() =>
			getIncidentAiAnalysisPriorityConfig(this.priority()) ?? {
				value: "LOW",
				label: this.priority() ?? "Sin prioridad",
				tone: "muted",
			}
	);
}
