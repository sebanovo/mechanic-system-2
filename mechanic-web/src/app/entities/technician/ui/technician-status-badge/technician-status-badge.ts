import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getTechnicianStatusConfig, TechnicianStatus } from "../../model";

@Component({
	selector: "app-technician-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicianStatusBadge {
	readonly status = input.required<TechnicianStatus>();

	protected readonly config = computed(() =>
		getTechnicianStatusConfig(this.status())
	);
}
