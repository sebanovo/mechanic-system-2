import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getTechnicianAvailabilityStatusConfig,
	TechnicianAvailabilityStatus,
} from "../../model";

@Component({
	selector: "app-technician-availability-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicianAvailabilityStatusBadge {
	readonly status = input.required<TechnicianAvailabilityStatus>();

	protected readonly config = computed(() =>
		getTechnicianAvailabilityStatusConfig(this.status())
	);
}
