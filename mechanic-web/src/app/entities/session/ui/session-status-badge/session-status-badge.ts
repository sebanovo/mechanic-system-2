import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { StatusConfig } from "../../../../shared/types";
import { getSessionStatusConfig, SessionStatus } from "../../model";

@Component({
	selector: "app-session-status-badge",
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
export class SessionStatusBadge {
	readonly status = input.required<SessionStatus | string>();

	protected readonly config = computed<StatusConfig<SessionStatus>>(() => {
		return (
			getSessionStatusConfig(this.status()) ?? {
				value: this.status() as SessionStatus,
				label: this.status(),
				tone: "muted",
			}
		);
	});
}
