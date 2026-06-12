import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
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
import { HlmInputImports } from "@shared/ui/input";

import { AssignmentTrackingEventApi } from "../../../entities/assignment-tracking-event/api/assignment-tracking-event.api";
import {
	ASSIGNMENT_TRACKING_EVENT_CREATE_OPTIONS,
	AssignmentTrackingEventDetail,
	AssignmentTrackingEventType,
	CreateAssignmentTrackingEventPayload,
	getTrackingEventImpactText,
} from "../../../entities/assignment-tracking-event/model";
import { AssignmentDetail } from "../../../entities/assignment/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-assignment-tracking-event-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-assignment-tracking-event-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssignmentTrackingEventForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly trackingEventApi = inject(AssignmentTrackingEventApi);

	readonly assignment = input.required<AssignmentDetail>();

	readonly created = output<AssignmentTrackingEventDetail>();
	readonly cancelled = output<void>();

	protected readonly eventOptions = ASSIGNMENT_TRACKING_EVENT_CREATE_OPTIONS;
	protected readonly isSubmitting = signal(false);
	protected readonly isLocating = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		event_type: [
			"LOCATION_UPDATED" as AssignmentTrackingEventType,
			[Validators.required],
		],
		latitude: ["", [Validators.required]],
		longitude: ["", [Validators.required]],
		notes: ["", [Validators.maxLength(1000)]],
	});

	protected readonly impactText = computed(() =>
		getTrackingEventImpactText(this.form.controls.event_type.value)
	);

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();
		const validationError = this.validatePayload(payload);

		if (validationError) {
			this.errorMessage.set(validationError);

			toast.error("Revisa los datos del evento", {
				description: validationError,
			});

			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.trackingEventApi
			.createCurrentTenantAssignmentTrackingEvent(
				this.assignment().assignment.id,
				payload
			)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Evento registrado", {
						description: "El avance operativo fue registrado correctamente.",
					});

					this.created.emit(item);
					this.resetForm();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo registrar el evento", {
						description: message,
					});
				},
			});
	}

	protected useCurrentLocation(): void {
		if (!navigator.geolocation) {
			const message = "Tu navegador no permite obtener ubicación.";

			this.errorMessage.set(message);

			toast.error("Ubicación no disponible", {
				description: message,
			});

			return;
		}

		this.isLocating.set(true);
		this.errorMessage.set(null);

		navigator.geolocation.getCurrentPosition(
			position => {
				this.form.patchValue({
					latitude: String(position.coords.latitude),
					longitude: String(position.coords.longitude),
				});

				this.isLocating.set(false);

				toast.success("Ubicación obtenida", {
					description: "Se cargaron las coordenadas actuales.",
				});
			},
			error => {
				const message =
					error.message || "No se pudo obtener la ubicación actual.";

				this.errorMessage.set(message);
				this.isLocating.set(false);

				toast.error("No se pudo obtener ubicación", {
					description: message,
				});
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 30000,
			}
		);
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	protected assignmentLabel(): string {
		const assignment = this.assignment();

		return assignment.incident.incident_code || assignment.incident.id;
	}

	private buildPayload(): CreateAssignmentTrackingEventPayload {
		const raw = this.form.getRawValue();
		const notes = raw.notes.trim();

		return {
			event_type: raw.event_type,
			latitude: Number(raw.latitude),
			longitude: Number(raw.longitude),
			notes: notes || null,
		};
	}

	private validatePayload(
		payload: CreateAssignmentTrackingEventPayload
	): string | null {
		if (Number.isNaN(payload.latitude)) {
			return "La latitud debe ser numérica.";
		}

		if (Number.isNaN(payload.longitude)) {
			return "La longitud debe ser numérica.";
		}

		if (payload.latitude < -90 || payload.latitude > 90) {
			return "La latitud debe estar entre -90 y 90.";
		}

		if (payload.longitude < -180 || payload.longitude > 180) {
			return "La longitud debe estar entre -180 y 180.";
		}

		return null;
	}

	private resetForm(): void {
		this.form.reset({
			event_type: "LOCATION_UPDATED",
			latitude: "",
			longitude: "",
			notes: "",
		});
	}
}
