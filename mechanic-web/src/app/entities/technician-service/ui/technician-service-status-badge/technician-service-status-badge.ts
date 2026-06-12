import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getTechnicianServiceStatus,
	getTechnicianServiceStatusConfig,
	TechnicianServiceDetail,
} from "../../model";

@Component({
	selector: "app-technician-service-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicianServiceStatusBadge {
	readonly item = input.required<TechnicianServiceDetail>();

	protected readonly config = computed(() =>
		getTechnicianServiceStatusConfig(getTechnicianServiceStatus(this.item()))
	);
}
