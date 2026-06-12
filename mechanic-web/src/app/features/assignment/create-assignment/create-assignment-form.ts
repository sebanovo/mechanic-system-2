import {
	ChangeDetectionStrategy,
	Component,
	inject,
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
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";

import { AssignmentApi } from "../../../entities/assignment/api/assignment.api";
import {
	AssignmentDetail,
	CreateAssignmentPayload,
} from "../../../entities/assignment/model";
import { IncidentOfferApi } from "../../../entities/incident-offer/api/incident-offer.api";
import {
	IncidentOfferListItem,
	getIncidentOfferIncidentCode,
	getIncidentOfferServiceName,
} from "../../../entities/incident-offer/model";
import { TechnicianApi } from "../../../entities/technician/api/technician.api";
import {
	getTechnicianFullName,
	Technician,
} from "../../../entities/technician/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-assignment-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./create-assignment-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssignmentForm implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly assignmentApi = inject(AssignmentApi);
	private readonly incidentOfferApi = inject(IncidentOfferApi);
	private readonly technicianApi = inject(TechnicianApi);

	readonly created = output<AssignmentDetail>();
	readonly cancelled = output<void>();

	protected readonly acceptedOffers = signal<IncidentOfferListItem[]>([]);
	protected readonly technicians = signal<Technician[]>([]);
	protected readonly isLoadingOptions = signal(false);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		offer_id: ["", [Validators.required]],
		technician_id: ["", [Validators.required]],
		notes: ["", [Validators.maxLength(1000)]],
	});

	protected offerTrackKey(item: IncidentOfferListItem): string {
		return item.id;
	}

	protected offerId(item: IncidentOfferListItem): string {
		return item.id;
	}

	ngOnInit(): void {
		this.loadOptions();
	}

	protected loadOptions(): void {
		this.isLoadingOptions.set(true);
		this.errorMessage.set(null);

		forkJoin({
			offers: this.incidentOfferApi.listCurrentTenantOffers({
				page: 1,
				page_size: 100,
				offer_status: "ACCEPTED",
			}),
			technicians: this.technicianApi.listTenantTechnicians({
				page: 1,
				page_size: 200,
				status: "ACTIVE",
			}),
		}).subscribe({
			next: response => {
				this.acceptedOffers.set(response.offers.items);
				this.technicians.set(response.technicians.items);
				this.isLoadingOptions.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isLoadingOptions.set(false);

				toast.error("No se pudieron cargar las opciones", {
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

		this.assignmentApi.createCurrentTenantAssignment(payload).subscribe({
			next: item => {
				this.isSubmitting.set(false);

				toast.success("Asignación creada", {
					description: `${item.technician.technician_code} fue asignado al incidente ${getIncidentOfferIncidentCodeFromAssignment(item)}.`,
				});

				this.created.emit(item);
				this.resetForm();
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error("No se pudo crear la asignación", {
					description: message,
				});
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	protected offerLabel(item: IncidentOfferListItem): string {
		return `${getIncidentOfferIncidentCode(item)} · ${getIncidentOfferServiceName(item)}`;
	}

	protected technicianLabel(item: Technician): string {
		return `${getTechnicianFullName(item)} · ${item.technician.technician_code}`;
	}

	private buildPayload(): CreateAssignmentPayload {
		const raw = this.form.getRawValue();
		const notes = raw.notes.trim();

		return {
			offer_id: raw.offer_id,
			technician_id: raw.technician_id,
			notes: notes || null,
		};
	}

	private resetForm(): void {
		this.form.reset({
			offer_id: "",
			technician_id: "",
			notes: "",
		});
	}
}

function getIncidentOfferIncidentCodeFromAssignment(
	item: AssignmentDetail
): string {
	return item.incident?.incident_code || item.incident?.id || "Sin incidente";
}
