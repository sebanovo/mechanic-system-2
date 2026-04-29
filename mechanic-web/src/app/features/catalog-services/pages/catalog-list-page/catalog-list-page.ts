import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";

import {
	CatalogService,
	CreateCatalogServiceFormValue,
	UpdateCatalogServiceFormValue,
} from "../../models/catalog-service.types";
import { CatalogServicesStore } from "../../store/catalog-service.store";

@Component({
	selector: "app-catalog-list-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./catalog-list-page.html",
	styleUrl: "./catalog-list-page.css",
})
export class CatalogListPage implements OnInit {
	readonly store = inject(CatalogServicesStore);
	private readonly fb = inject(FormBuilder);

	readonly createFormOpen = signal(false);
	readonly editFormOpen = signal(false);
	readonly selectedService = signal<CatalogService | null>(null);

	readonly createForm = this.fb.nonNullable.group({
		code: ["", [Validators.required, Validators.minLength(2)]],
		category: ["", [Validators.required, Validators.minLength(2)]],
		title: ["", [Validators.required, Validators.minLength(2)]],
		description: [""],
		supportsMobileService: [true],
		supportsEmergencyService: [true],
		isActive: [true],
		sortOrder: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
	});

	readonly editForm = this.fb.nonNullable.group({
		category: ["", [Validators.required, Validators.minLength(2)]],
		title: ["", [Validators.required, Validators.minLength(2)]],
		description: [""],
		supportsMobileService: [true],
		supportsEmergencyService: [true],
		isActive: [true],
		sortOrder: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadCatalogServices();
	}

	onRetry(): void {
		this.store.clearError();
		void this.store.loadCatalogServices();
	}

	async onToggleIncludeInactive(event: Event): Promise<void> {
		const input = event.target as HTMLInputElement;
		this.store.setIncludeInactive(input.checked);
		await this.store.loadCatalogServices();
	}

	onOpenCreateForm(): void {
		this.store.clearCreateError();
		this.createForm.reset({
			code: "",
			category: "",
			title: "",
			description: "",
			supportsMobileService: true,
			supportsEmergencyService: true,
			isActive: true,
			sortOrder: this.store.count() + 10,
		});
		this.createFormOpen.set(true);
	}

	onCancelCreateForm(): void {
		this.createFormOpen.set(false);
		this.store.clearCreateError();
	}

	async onCreateCatalogService(): Promise<void> {
		if (this.createForm.invalid) {
			this.createForm.markAllAsTouched();
			return;
		}

		const value = this.createForm.getRawValue();

		const payload: CreateCatalogServiceFormValue = {
			code: value.code,
			category: value.category,
			title: value.title,
			description: value.description || null,
			supportsMobileService: value.supportsMobileService,
			supportsEmergencyService: value.supportsEmergencyService,
			isActive: value.isActive,
			sortOrder: Number(value.sortOrder),
		};

		const created = await this.store.createCatalogService(payload);

		if (!created) {
			toast("No se pudo crear el servicio", {
				description:
					this.store.createError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		this.createFormOpen.set(false);
		toast.success("Servicio de catálogo creado correctamente");
	}

	onOpenEditForm(service: CatalogService): void {
		this.store.clearUpdateError();
		this.store.setSelectedCatalogService(service);
		this.selectedService.set(service);

		this.editForm.patchValue({
			category: service.category,
			title: service.title,
			description: service.description ?? "",
			supportsMobileService: service.supportsMobileService,
			supportsEmergencyService: service.supportsEmergencyService,
			isActive: service.isActive,
			sortOrder: service.sortOrder,
		});

		this.editFormOpen.set(true);
	}

	onCancelEditForm(): void {
		this.editFormOpen.set(false);
		this.selectedService.set(null);
		this.store.setSelectedCatalogService(null);
		this.store.clearUpdateError();
	}

	async onUpdateCatalogService(): Promise<void> {
		const selected = this.selectedService();

		if (!selected) {
			return;
		}

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return;
		}

		const value = this.editForm.getRawValue();

		const payload: UpdateCatalogServiceFormValue = {
			category: value.category,
			title: value.title,
			description: value.description || null,
			supportsMobileService: value.supportsMobileService,
			supportsEmergencyService: value.supportsEmergencyService,
			isActive: value.isActive,
			sortOrder: Number(value.sortOrder),
		};

		const updated = await this.store.updateCatalogService(selected.id, payload);

		if (!updated) {
			toast("No se pudo actualizar el servicio", {
				description:
					this.store.updateError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		this.editFormOpen.set(false);
		this.selectedService.set(null);
		this.store.setSelectedCatalogService(null);

		toast.success("Servicio actualizado correctamente");
	}
}
