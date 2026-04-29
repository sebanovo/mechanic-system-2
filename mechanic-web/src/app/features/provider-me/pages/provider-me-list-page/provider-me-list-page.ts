import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	CreateProviderMeTechnicianFormValue,
	ProviderMeTechnician,
	UpdateProviderMeTechnicianFormValue,
} from "../../models/provider-me.types";
import { ProviderMeStore } from "../../store/provider-me.store";

@Component({
	selector: "app-provider-me-list-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./provider-me-list-page.html",
	styleUrl: "./provider-me-list-page.css",
})
export class ProviderMeListPage implements OnInit {
	readonly store = inject(ProviderMeStore);
	private readonly fb = inject(FormBuilder);

	readonly createFormOpen = signal(false);
	readonly editFormOpen = signal(false);
	readonly selectedTechnician = signal<ProviderMeTechnician | null>(null);

	readonly createForm = this.fb.nonNullable.group({
		firstName: ["", [Validators.required, Validators.minLength(2)]],
		lastName: ["", [Validators.required, Validators.minLength(2)]],
		phoneNumber: [""],
		specialty: ["", [Validators.maxLength(120)]],
		isAvailable: [true],
		currentLatitude: [0],
		currentLongitude: [0],
	});

	readonly editForm = this.fb.nonNullable.group({
		firstName: ["", [Validators.required, Validators.minLength(2)]],
		lastName: ["", [Validators.required, Validators.minLength(2)]],
		fullName: [""],
		phoneNumber: [""],
		specialty: ["", [Validators.maxLength(120)]],
		isActive: [true],
		isAvailable: [true],
		currentLatitude: [0],
		currentLongitude: [0],
	});

	async ngOnInit(): Promise<void> {
		await this.store.reloadProviderWorkspace();
	}

	onRetry(): void {
		this.store.clearTechniciansError();
		void this.store.reloadProviderWorkspace();
	}

	onOpenCreateForm(): void {
		this.store.clearCreatingTechnicianError();
		this.createForm.reset({
			firstName: "",
			lastName: "",
			phoneNumber: "",
			specialty: "",
			isAvailable: true,
			currentLatitude: this.store.myProvider()?.baseLatitude ?? 0,
			currentLongitude: this.store.myProvider()?.baseLongitude ?? 0,
		});
		this.createFormOpen.set(true);
	}

	onCancelCreateForm(): void {
		this.createFormOpen.set(false);
		this.store.clearCreatingTechnicianError();
	}

	async onCreateTechnician(): Promise<void> {
		if (this.createForm.invalid) {
			this.createForm.markAllAsTouched();
			return;
		}

		const value = this.createForm.getRawValue();

		const payload: CreateProviderMeTechnicianFormValue = {
			firstName: value.firstName,
			lastName: value.lastName,
			phoneNumber: value.phoneNumber || null,
			specialty: value.specialty,
			isAvailable: value.isAvailable,
			currentLatitude: Number(value.currentLatitude),
			currentLongitude: Number(value.currentLongitude),
		};

		const technician = await this.store.createMyTechnician(payload);

		if (!technician) {
			toast("No se pudo registrar el técnico", {
				description:
					this.store.creatingTechnicianError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.createFormOpen.set(false);
		toast.success("Técnico registrado correctamente");
	}

	onOpenEditForm(technician: ProviderMeTechnician): void {
		this.store.clearUpdatingTechnicianError();
		this.store.setSelectedTechnician(technician);
		this.selectedTechnician.set(technician);

		this.editForm.patchValue({
			firstName: technician.firstName,
			lastName: technician.lastName,
			fullName: technician.fullName,
			phoneNumber: technician.phoneNumber ?? "",
			specialty: technician.specialty,
			isActive: technician.isActive,
			isAvailable: technician.isAvailable,
			currentLatitude: technician.currentLatitude,
			currentLongitude: technician.currentLongitude,
		});

		this.editFormOpen.set(true);
	}

	onCancelEditForm(): void {
		this.editFormOpen.set(false);
		this.selectedTechnician.set(null);
		this.store.setSelectedTechnician(null);
		this.store.clearUpdatingTechnicianError();
	}

	async onUpdateTechnician(): Promise<void> {
		const technician = this.selectedTechnician();

		if (!technician) {
			return;
		}

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return;
		}

		const value = this.editForm.getRawValue();

		const payload: UpdateProviderMeTechnicianFormValue = {
			firstName: value.firstName,
			lastName: value.lastName,
			fullName: `${value.firstName} ${value.lastName}`.trim(),
			phoneNumber: value.phoneNumber || null,
			specialty: value.specialty,
			isActive: value.isActive,
			isAvailable: value.isAvailable,
			currentLatitude: Number(value.currentLatitude),
			currentLongitude: Number(value.currentLongitude),
		};

		const updatedTechnician = await this.store.updateMyTechnician(
			technician.id,
			payload
		);

		if (!updatedTechnician) {
			toast("No se pudo actualizar el técnico", {
				description:
					this.store.updatingTechnicianError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.editFormOpen.set(false);
		this.selectedTechnician.set(null);
		this.store.setSelectedTechnician(null);

		toast.success("Técnico actualizado correctamente");
	}
}
