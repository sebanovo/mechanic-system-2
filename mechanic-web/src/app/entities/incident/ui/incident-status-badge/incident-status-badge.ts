import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { StatusConfig } from "../../../../shared/types";
import { getIncidentStatusConfig, IncidentStatus } from "../../model";

@Component({
	selector: "app-incident-status-badge",
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
export class IncidentStatusBadge {
	readonly status = input.required<IncidentStatus | string>();

	protected readonly config = computed<StatusConfig<IncidentStatus>>(() => {
		return (
			getIncidentStatusConfig(this.status()) ?? {
				value: this.status() as IncidentStatus,
				label: this.status(),
				tone: "muted",
			}
		);
	});
}
