import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";
import {
	RouterLink,
} from "@angular/router";
import {
	NgIcon,
	provideIcons,
} from "@ng-icons/core";
import {
	lucideArrowRight,
	lucideBriefcase,
	lucideCircleCheck,
	lucideMapPin,
	lucideWrench,
} from "@ng-icons/lucide";

import {
	StatusBadge,
} from "../../../../shared/custom-components";
import {
	TechnicianCurrentAssignmentKpi,
} from "../../model";
import {
	formatAssignmentStatus,
	getAssignmentStatusTone,
} from "../../lib/technician-dashboard.utils";

@Component({
	selector:
		"app-current-assignment-card",
	standalone: true,
	imports: [
		RouterLink,
		NgIcon,
		StatusBadge,
	],
	providers: [
		provideIcons({
			lucideArrowRight,
			lucideBriefcase,
			lucideCircleCheck,
			lucideMapPin,
			lucideWrench,
		}),
	],
	templateUrl:
		"./current-assignment-card.html",
	changeDetection:
		ChangeDetectionStrategy.OnPush,
})
export class CurrentAssignmentCard {
	readonly assignment =
		input.required<
			TechnicianCurrentAssignmentKpi
		>();

	protected readonly statusLabel =
		computed(() =>
			formatAssignmentStatus(
				this.assignment()
					.assignment_status,
			),
		);

	protected readonly statusTone =
		computed(() =>
			getAssignmentStatusTone(
				this.assignment()
					.assignment_status,
			),
		);
}
