import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { AssignmentStatus, getAssignmentStatusConfig } from "../../model";

@Component({
	selector: "app-assignment-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentStatusBadge {
	readonly status = input.required<AssignmentStatus>();

	protected readonly config = computed(() =>
		getAssignmentStatusConfig(this.status())
	);
}
