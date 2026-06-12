import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getNotificationStatusConfig, NotificationStatus } from "../../model";

@Component({
	selector: "app-notification-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationStatusBadge {
	readonly status = input.required<NotificationStatus>();

	protected readonly config = computed(() =>
		getNotificationStatusConfig(this.status())
	);
}
