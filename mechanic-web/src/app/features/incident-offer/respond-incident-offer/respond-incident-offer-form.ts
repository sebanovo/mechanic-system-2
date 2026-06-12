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

import { IncidentOfferApi } from "../../../entities/incident-offer/api/incident-offer.api";
import {
	getIncidentOfferIncidentCode,
	getIncidentOfferServiceName,
	IncidentOfferDetail,
	IncidentOfferResponseMode,
	IncidentOfferResponsePayload,
} from "../../../entities/incident-offer/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-respond-incident-offer-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./respond-incident-offer-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RespondIncidentOfferForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly incidentOfferApi = inject(IncidentOfferApi);

	readonly item = input.required<IncidentOfferDetail>();
	readonly mode = input.required<IncidentOfferResponseMode>();

	readonly responded = output<IncidentOfferDetail>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		response_message: ["", [Validators.maxLength(1000)]],
	});

	protected readonly title = computed(() => {
		return this.mode() === "ACCEPT" ? "Aceptar oferta" : "Rechazar oferta";
	});

	protected readonly description = computed(() => {
		const item = this.item();

		return `${getIncidentOfferIncidentCode(item)} · ${getIncidentOfferServiceName(item)}`;
	});

	protected readonly helperText = computed(() => {
		return this.mode() === "ACCEPT"
			? "Al aceptar, el backend iniciará el flujo para continuar con asignación del técnico."
			: "Al rechazar, el incidente podrá continuar buscando otro proveedor.";
	});

	protected readonly submitLabel = computed(() => {
		if (this.isSubmitting()) {
			return this.mode() === "ACCEPT" ? "Aceptando..." : "Rechazando...";
		}

		return this.mode() === "ACCEPT" ? "Aceptar oferta" : "Rechazar oferta";
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		const request =
			this.mode() === "ACCEPT"
				? this.incidentOfferApi.acceptCurrentTenantOffer(
						this.item().offer.id,
						payload
					)
				: this.incidentOfferApi.rejectCurrentTenantOffer(
						this.item().offer.id,
						payload
					);

		request.subscribe({
			next: item => {
				this.isSubmitting.set(false);

				toast.success(
					this.mode() === "ACCEPT" ? "Oferta aceptada" : "Oferta rechazada",
					{
						description:
							this.mode() === "ACCEPT"
								? "El taller aceptó atender el incidente."
								: "El taller rechazó atender el incidente.",
					}
				);

				this.responded.emit(item);
				this.form.reset({
					response_message: "",
				});
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error(
					this.mode() === "ACCEPT"
						? "No se pudo aceptar la oferta"
						: "No se pudo rechazar la oferta",
					{
						description: message,
					}
				);
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private buildPayload(): IncidentOfferResponsePayload {
		const raw = this.form.getRawValue();
		const responseMessage = raw.response_message.trim();

		return {
			response_message: responseMessage || null,
		};
	}
}
