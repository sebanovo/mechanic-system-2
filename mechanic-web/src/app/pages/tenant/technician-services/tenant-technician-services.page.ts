import { Component, signal, viewChild } from "@angular/core";

import { TechnicianServiceDetail } from "../../../entities/technician-service/model";
import { CreateTechnicianServiceForm } from "../../../features/technician-service/create-technician-service/create-technician-service-form";
import { EditTechnicianServiceForm } from "../../../features/technician-service/edit-technician-service/edit-technician-service-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantTechnicianServicesList } from "../../../widgets/tenant/tenant-technician-services-list/tenant-technician-services-list";

@Component({
	selector: "app-tenant-technician-services-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		CreateTechnicianServiceForm,
		EditTechnicianServiceForm,
		TenantTechnicianServicesList,
	],
	templateUrl: "./tenant-technician-services.page.html",
})
export class TenantTechnicianServicesPage {
	protected readonly showCreateDrawer = signal(false);
	protected readonly editingItem = signal<TechnicianServiceDetail | null>(null);

	private readonly list = viewChild(TenantTechnicianServicesList);

	protected openCreateDrawer(): void {
		this.editingItem.set(null);
		this.showCreateDrawer.set(true);
	}

	protected closeCreateDrawer(): void {
		this.showCreateDrawer.set(false);
	}

	protected openEditDrawer(item: TechnicianServiceDetail): void {
		this.showCreateDrawer.set(false);
		this.editingItem.set(item);
	}

	protected closeEditDrawer(): void {
		this.editingItem.set(null);
	}

	protected onCreated(): void {
		this.showCreateDrawer.set(false);
		this.list()?.load();
		this.list()?.loadStats();
		this.list()?.loadServiceCatalogOptions();
	}

	protected onUpdated(item: TechnicianServiceDetail): void {
		this.editingItem.set(null);
		this.list()?.patchItem(item);
		this.list()?.loadStats();
		this.list()?.loadServiceCatalogOptions();
	}
}
