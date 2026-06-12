import { Component } from "@angular/core";

import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import { TenantOwnerDashboard } from "../../../widgets/tenant/tenant-owner-dashboard/tenant-owner-dashboard";

@Component({
	selector: "app-tenant-dashboard-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantOwnerDashboard],
	template: `
		<app-admin-page-shell>
			<app-page-header
				title="Dashboard taller"
				description="Resumen operativo del taller, incidentes y desempeño del equipo."
				eyebrow="Panel privado"
				[showRefresh]="false"
				[showPrimaryAction]="false"
			/>

			<app-tenant-owner-dashboard />
		</app-admin-page-shell>
	`,
})
export class TenantDashboardPage {
}
