import {
	ChangeDetectionStrategy,
	Component,
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

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";
import { HlmTextareaImports } from "@shared/ui/textarea";
import { toast } from "@spartan-ng/brain/sonner";

import { IncidentAiAnalysisApi } from "../../../entities/incident-ai-analysis/api";
import {
	IncidentAiAnalysis,
	IncidentAiAnalysisCreatePayload,
	INCIDENT_AI_ANALYSIS_PRIORITY_OPTIONS,
	IncidentAiAnalysisPriority,
} from "../../../entities/incident-ai-analysis/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-incident-ai-analysis-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
		HlmTextareaImports,
	],
	templateUrl: "./create-incident-ai-analysis-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateIncidentAiAnalysisForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly analysisApi = inject(IncidentAiAnalysisApi);

	readonly incidentId = input.required<string>();
	readonly scope = input<"platform" | "tenant">("tenant");

	readonly created = output<IncidentAiAnalysis>();
	readonly cancelled = output<void>();

	protected readonly priorityOptions = INCIDENT_AI_ANALYSIS_PRIORITY_OPTIONS.filter(
		option => option.value !== ""
	);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		analysis_version: ["v1", [Validators.required, Validators.minLength(1)]],
		probable_service_code: [""],
		probable_problem: [""],
		confidence_score: [""],
		estimated_min_price: [""],
		estimated_max_price: [""],
		estimated_min_duration_minutes: [""],
		estimated_max_duration_minutes: [""],
		recommended_priority: ["" as IncidentAiAnalysisPriority | ""],
		analysis_result: [""],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();
		const analysisResult = this.parseAnalysisResult(raw.analysis_result);

		if (analysisResult === undefined) {
			return;
		}

		const payload: IncidentAiAnalysisCreatePayload = {
			analysis_version: raw.analysis_version.trim(),
			probable_service_code: this.cleanString(raw.probable_service_code),
			probable_problem: this.cleanString(raw.probable_problem),
			confidence_score: this.parseNumber(raw.confidence_score),
			estimated_min_price: this.parseNumber(raw.estimated_min_price),
			estimated_max_price: this.parseNumber(raw.estimated_max_price),
			estimated_min_duration_minutes: this.parseInteger(
				raw.estimated_min_duration_minutes
			),
			estimated_max_duration_minutes: this.parseInteger(
				raw.estimated_max_duration_minutes
			),
			recommended_priority:
				raw.recommended_priority || null,
			analysis_result: analysisResult,
		};

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		const request =
			this.scope() === "platform"
				? this.analysisApi.createPlatformIncidentAiAnalysis(
						this.incidentId(),
						payload
					)
				: this.analysisApi.createCurrentTenantIncidentAiAnalysis(
						this.incidentId(),
						payload
					);

		request.subscribe({
			next: analysis => {
				this.isSubmitting.set(false);

				toast.success("Análisis IA creado correctamente");
				this.created.emit(analysis);
				this.form.reset({
					analysis_version: "v1",
					probable_service_code: "",
					probable_problem: "",
					confidence_score: "",
					estimated_min_price: "",
					estimated_max_price: "",
					estimated_min_duration_minutes: "",
					estimated_max_duration_minutes: "",
					recommended_priority: "",
					analysis_result: "",
				});
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error("No se pudo crear el análisis IA", {
					description: message,
				});
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private cleanString(value: string): string | null {
		const normalized = value.trim();
		return normalized || null;
	}

	private parseNumber(value: string): number | null {
		const normalized = value.trim();

		if (!normalized) {
			return null;
		}

		const parsed = Number(normalized);
		return Number.isFinite(parsed) ? parsed : null;
	}

	private parseInteger(value: string): number | null {
		const normalized = value.trim();

		if (!normalized) {
			return null;
		}

		const parsed = Number.parseInt(normalized, 10);
		return Number.isFinite(parsed) ? parsed : null;
	}

	private parseAnalysisResult(
		value: string
	): Record<string, unknown> | null | undefined {
		const normalized = value.trim();

		if (!normalized) {
			return null;
		}

		try {
			const parsed = JSON.parse(normalized) as Record<string, unknown>;
			if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
				this.errorMessage.set("El resultado del análisis debe ser un objeto JSON.");
				return undefined;
			}

			return parsed;
		} catch {
			this.errorMessage.set("El resultado del análisis no es un JSON válido.");
			return undefined;
		}
	}
}
