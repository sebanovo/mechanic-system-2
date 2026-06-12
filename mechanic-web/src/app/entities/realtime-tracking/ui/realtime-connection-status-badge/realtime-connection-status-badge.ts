import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getRealtimeTrackingConnectionStatusConfig,
	RealtimeTrackingConnectionStatus,
} from "../../model";

@Component({
	selector: "app-realtime-connection-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealtimeConnectionStatusBadge {
	readonly status = input.required<RealtimeTrackingConnectionStatus>();

	protected readonly config = computed(() =>
		getRealtimeTrackingConnectionStatusConfig(this.status())
	);
}
