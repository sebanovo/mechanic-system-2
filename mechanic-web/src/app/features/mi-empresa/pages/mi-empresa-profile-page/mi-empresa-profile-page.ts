import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import { MiEmpresa } from "../../models/mi-empresa.types";
import { MiEmpresaStore } from "../../store/mi-empresa.store";

@Component({
	selector: "app-mi-empresa-profile-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./mi-empresa-profile-page.html",
	styleUrl: "./mi-empresa-profile-page.css",
})
export class MiEmpresaProfilePage implements OnInit {
	readonly store = inject(MiEmpresaStore);
	private readonly fb = inject(FormBuilder);

	readonly editMode = signal(false);

	readonly form = this.fb.nonNullable.group({
		businessName: ["", [Validators.required, Validators.maxLength(150)]],
		legalName: ["", [Validators.maxLength(180)]],
		description: ["", [Validators.maxLength(700)]],
		contactEmail: ["", [Validators.email, Validators.maxLength(255)]],
		contactPhone: ["", [Validators.maxLength(30)]],
		city: ["", [Validators.maxLength(100)]],
		address: ["", [Validators.maxLength(255)]],
		baseLatitude: [0, [Validators.required]],
		baseLongitude: [0, [Validators.required]],
		isAvailable: [true],
		maxConcurrentServices: [
			1,
			[Validators.required, Validators.min(1), Validators.max(100)],
		],
	});

	async ngOnInit(): Promise<void> {
		await this.loadEmpresa();
	}

	async loadEmpresa(): Promise<void> {
		const empresa = await this.store.loadMiEmpresa();

		if (empresa) {
			this.patchForm(empresa);
		}

		this.form.disable();
		this.editMode.set(false);
	}

	onRetry(): void {
		this.store.clearError();
		void this.loadEmpresa();
	}

	onEnableEdit(): void {
		this.store.clearUpdateError();
		this.editMode.set(true);
		this.form.enable();
	}

	onCancelEdit(): void {
		const empresa = this.store.miEmpresa();

		if (empresa) {
			this.patchForm(empresa);
		}

		this.form.disable();
		this.editMode.set(false);
		this.store.clearUpdateError();
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const value = this.form.getRawValue();

		const updatedEmpresa = await this.store.updateMiEmpresa({
			businessName: value.businessName,
			legalName: value.legalName,
			description: value.description || null,
			contactEmail: value.contactEmail,
			contactPhone: value.contactPhone || null,
			city: value.city,
			address: value.address,
			baseLatitude: Number(value.baseLatitude),
			baseLongitude: Number(value.baseLongitude),
			isAvailable: value.isAvailable,
			maxConcurrentServices: Number(value.maxConcurrentServices),
		});

		if (!updatedEmpresa) {
			toast("No se pudo actualizar la empresa", {
				description:
					this.store.updateError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		this.patchForm(updatedEmpresa);
		this.form.disable();
		this.editMode.set(false);

		toast.success("Empresa actualizada correctamente");
	}

	private patchForm(empresa: MiEmpresa): void {
		this.form.patchValue({
			businessName: empresa.businessName,
			legalName: empresa.legalName,
			description: empresa.description ?? "",
			contactEmail: empresa.contactEmail,
			contactPhone: empresa.contactPhone ?? "",
			city: empresa.city,
			address: empresa.address,
			baseLatitude: empresa.baseLatitude,
			baseLongitude: empresa.baseLongitude,
			isAvailable: empresa.isAvailable,
			maxConcurrentServices: empresa.maxConcurrentServices,
		});
	}
}
