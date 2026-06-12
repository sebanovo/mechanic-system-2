import { Component } from "@angular/core";

import {
	AdminPageShell,
	DataToolbar,
	PageHeader,
	PageSection,
	StatusBadge,
} from "../../../shared/custom-components";

@Component({
	selector: "app-tenant-dashboard-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, DataToolbar, PageSection, StatusBadge],
	template: `
		<app-admin-page-shell>
			<app-page-header
				title="Dashboard taller"
				description="Resumen operativo del taller, incidentes recientes y asignaciones activas."
				eyebrow="Panel privado"
				[showRefresh]="true"
				[showPrimaryAction]="true"
				primaryActionLabel="Nuevo incidente"
			/>

			<app-data-toolbar
				searchPlaceholder="Buscar incidente, cliente o técnico..."
				[showFilters]="true"
				(searchChanged)="onSearch($event)"
			/>

			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<app-page-section title="Incidentes activos">
					<div class="flex items-end justify-between gap-3">
						<div>
							<p class="text-3xl font-bold">12</p>
							<p class="text-muted-foreground mt-1 text-sm">
								En atención o búsqueda
							</p>
						</div>

						<app-status-badge label="Activo" tone="info" />
					</div>
				</app-page-section>

				<app-page-section title="Asignaciones">
					<div class="flex items-end justify-between gap-3">
						<div>
							<p class="text-3xl font-bold">5</p>
							<p class="text-muted-foreground mt-1 text-sm">Técnicos en ruta</p>
						</div>

						<app-status-badge label="En ruta" tone="warning" />
					</div>
				</app-page-section>

				<app-page-section title="Completados">
					<div class="flex items-end justify-between gap-3">
						<div>
							<p class="text-3xl font-bold">38</p>
							<p class="text-muted-foreground mt-1 text-sm">
								Atenciones finalizadas
							</p>
						</div>

						<app-status-badge label="OK" tone="success" />
					</div>
				</app-page-section>

				<app-page-section title="Cancelados">
					<div class="flex items-end justify-between gap-3">
						<div>
							<p class="text-3xl font-bold">2</p>
							<p class="text-muted-foreground mt-1 text-sm">
								Incidentes cancelados
							</p>
						</div>

						<app-status-badge label="Revisar" tone="destructive" />
					</div>
				</app-page-section>
			</div>
		</app-admin-page-shell>
	`,
})
export class TenantDashboardPage {
	protected onSearch(value: string): void {
		console.log("Buscar:", value);
	}
}
