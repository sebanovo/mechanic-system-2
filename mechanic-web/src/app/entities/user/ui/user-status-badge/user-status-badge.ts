import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getUserStatusConfig, UserStatus } from "../../model";
import { StatusConfig } from "../../../../shared/types";

@Component({
	selector: "app-user-status-badge",
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
export class UserStatusBadge {
	readonly status = input.required<UserStatus>();

	protected readonly config = computed<StatusConfig<UserStatus>>(() => {
		return (
			getUserStatusConfig(this.status()) ?? {
				value: this.status(),
				label: this.status(),
				tone: "muted",
			}
		);
	});
}
