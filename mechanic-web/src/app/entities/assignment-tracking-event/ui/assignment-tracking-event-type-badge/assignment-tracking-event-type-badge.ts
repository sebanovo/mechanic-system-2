import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	AssignmentTrackingEventType,
	getAssignmentTrackingEventTypeConfig,
} from "../../model";

@Component({
	selector: "app-assignment-tracking-event-type-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentTrackingEventTypeBadge {
	readonly eventType = input.required<AssignmentTrackingEventType>();

	protected readonly config = computed(() =>
		getAssignmentTrackingEventTypeConfig(this.eventType())
	);
}
