import {
	ChangeDetectionStrategy,
	Component,
} from "@angular/core";

import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import {
	TechnicianDashboard,
} from "../../../widgets/tenant/technician-dashboard/technician-dashboard";

@Component({
	selector:
		"app-technician-dashboard-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		TechnicianDashboard,
	],
	templateUrl:
		"./technician-dashboard.page.html",
	changeDetection:
		ChangeDetectionStrategy.OnPush,
})
export class TechnicianDashboardPage {}
