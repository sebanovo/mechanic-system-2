import { Component, signal, viewChild } from "@angular/core";

import { ServiceCatalog } from "../../../entities/service-catalog/model";
import { CreateServiceCatalogForm } from "../../../features/service-catalog/create-service-catalog/create-service-catalog-form";
import { EditServiceCatalogForm } from "../../../features/service-catalog/edit-service-catalog/edit-service-catalog-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { PlatformServiceCatalogList } from "../../../widgets/platform/platform-service-catalog-list/platform-service-catalog-list";

@Component({
	selector: "app-platform-service-catalog-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		CreateServiceCatalogForm,
		EditServiceCatalogForm,
		PlatformServiceCatalogList,
	],
	templateUrl: "./platform-service-catalog.page.html",
})
export class PlatformServiceCatalogPage {
	protected readonly showCreateDrawer = signal(false);
	protected readonly editingItem = signal<ServiceCatalog | null>(null);

	private readonly list = viewChild(PlatformServiceCatalogList);

	protected openCreateDrawer(): void {
		this.editingItem.set(null);
		this.showCreateDrawer.set(true);
	}

	protected closeCreateDrawer(): void {
		this.showCreateDrawer.set(false);
	}

	protected openEditDrawer(item: ServiceCatalog): void {
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

	protected onUpdated(): void {
		this.editingItem.set(null);
		this.list()?.load();
		this.list()?.loadStats();
		this.list()?.loadCategoryOptions();
	}
}
