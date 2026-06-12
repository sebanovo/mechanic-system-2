import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	OnInit,
	output,
	signal,
} from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";

import { AssignmentApi } from "../../../entities/assignment/api/assignment.api";
import {
	AssignmentDetail,
	UpdateAssignmentPayload,
} from "../../../entities/assignment/model";
import { TechnicianApi } from "../../../entities/technician/api/technician.api";
import {
	getTechnicianFullName,
	Technician,
} from "../../../entities/technician/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-edit-assignment-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./edit-assignment-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAssignmentForm implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly assignmentApi = inject(AssignmentApi);
	private readonly technicianApi = inject(TechnicianApi);

	readonly item = input.required<AssignmentDetail>();

	readonly updated = output<AssignmentDetail>();
	readonly cancelled = output<void>();

	protected readonly technicians = signal<Technician[]>([]);
	protected readonly isLoadingTechnicians = signal(false);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		technician_id: ["", [Validators.required]],
		notes: ["", [Validators.maxLength(1000)]],
	});

	constructor() {
		effect(() => {
			const item = this.item();

			this.form.patchValue({
				technician_id: item.assignment.technician_id,
				notes: item.assignment.notes ?? "",
			});
		});
	}

	ngOnInit(): void {
		this.loadTechnicians();
	}

	protected loadTechnicians(): void {
		this.isLoadingTechnicians.set(true);

		this.technicianApi
			.listTenantTechnicians({
				page: 1,
				page_size: 200,
				status: "ACTIVE",
			})
			.subscribe({
				next: response => {
					this.technicians.set(response.items);
					this.isLoadingTechnicians.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoadingTechnicians.set(false);

					toast.error("No se pudieron cargar los técnicos", {
						description: message,
					});
				},
			});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.assignmentApi
			.updateCurrentTenantAssignment(this.item().assignment.id, payload)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Asignación actualizada", {
						description:
							"El técnico o las notas fueron actualizados correctamente.",
					});

					this.updated.emit(item);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo actualizar la asignación", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	protected technicianLabel(item: Technician): string {
		return `${getTechnicianFullName(item)} · ${item.technician.technician_code}`;
	}

	private buildPayload(): UpdateAssignmentPayload {
		const raw = this.form.getRawValue();
		const notes = raw.notes.trim();

		return {
			technician_id: raw.technician_id,
			notes: notes || null,
		};
	}
}
