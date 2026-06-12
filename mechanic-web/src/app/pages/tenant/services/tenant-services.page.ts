import { Component, signal, viewChild } from "@angular/core";

import { ProviderServiceDetail } from "../../../entities/provider-service/model";
import { CreateProviderServiceForm } from "../../../features/provider-service/create-provider-service/create-provider-service-form";
import { EditProviderServiceForm } from "../../../features/provider-service/edit-provider-service/edit-provider-service-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantProviderServicesList } from "../../../widgets/tenant/tenant-provider-services-list/tenant-provider-services-list";

@Component({
	selector: "app-tenant-services-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		CreateProviderServiceForm,
		EditProviderServiceForm,
		TenantProviderServicesList,
	],
	templateUrl: "./tenant-services.page.html",
})
export class TenantServicesPage {
	protected readonly showCreateDrawer = signal(false);
	protected readonly editingItem = signal<ProviderServiceDetail | null>(null);

	private readonly list = viewChild(TenantProviderServicesList);

	protected openCreateDrawer(): void {
		this.editingItem.set(null);
		this.showCreateDrawer.set(true);
	}

	protected closeCreateDrawer(): void {
		this.showCreateDrawer.set(false);
	}

	protected openEditDrawer(item: ProviderServiceDetail): void {
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
		this.list()?.loadCategoryOptions();
	}

	protected onUpdated(item: ProviderServiceDetail): void {
		this.editingItem.set(null);
		this.list()?.patchItem(item);
		this.list()?.loadStats();
		this.list()?.loadCategoryOptions();
	}
}
