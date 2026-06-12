import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getTechnicianSkillLevelConfig,
	TechnicianSkillLevel,
} from "../../model";

@Component({
	selector: "app-technician-skill-level-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicianSkillLevelBadge {
	readonly skillLevel = input.required<TechnicianSkillLevel>();

	protected readonly config = computed(() =>
		getTechnicianSkillLevelConfig(this.skillLevel())
	);
}
