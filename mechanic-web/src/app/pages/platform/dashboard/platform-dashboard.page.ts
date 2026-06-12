import { Component } from "@angular/core";

import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import { PlatformDashboard } from "../../../widgets/platform/platform-dashboard/platform-dashboard";

@Component({
	selector: "app-platform-dashboard-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, PlatformDashboard],
	template: `
		<app-admin-page-shell>
			<app-page-header
				title="Dashboard plataforma"
				description="Visión global de incidentes, talleres, técnicos y desempeño operativo de toda la plataforma."
				eyebrow="Panel global"
				[showRefresh]="false"
				[showPrimaryAction]="false"
			/>

			<app-platform-dashboard />
		</app-admin-page-shell>
	`,
})
export class PlatformDashboardPage {}
