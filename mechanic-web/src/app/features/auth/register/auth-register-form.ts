import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { signal } from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

import { SessionService } from "../../../core/session/session.service";
import { APP_ROUTES } from "../../../core/routing";
import { RegisterTenantKind } from "../../../entities/session/model";
import { getApiErrorMessage } from "../../../shared/api/api-error";

export type RegisterMode = "CLIENT" | "TENANT";

@Component({
	selector: "app-auth-register-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./auth-register-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly sessionService = inject(SessionService);
	private readonly router = inject(Router);

	protected readonly mode = signal<RegisterMode>(
		this.router.url.includes("/tenant") ? "TENANT" : "CLIENT"
	);

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]],
		first_name: ["", [Validators.required, Validators.minLength(1)]],
		last_name: ["", [Validators.required, Validators.minLength(1)]],
		commercial_name: [""],
		tenant_kind: ["WORKSHOP" as RegisterTenantKind],
	});

	private readonly modeEffect = effect(() => {
		const isTenant = this.mode() === "TENANT";
		const commercialName = this.form.controls.commercial_name;

		if (isTenant) {
			commercialName.setValidators([
				Validators.required,
				Validators.minLength(1),
			]);
		} else {
			commercialName.clearValidators();
			commercialName.setValue("", { emitEvent: false });
		}

		commercialName.updateValueAndValidity({ emitEvent: false });
	});

	protected setMode(mode: RegisterMode): void {
		this.mode.set(mode);

		void this.router.navigateByUrl(
			mode === "TENANT"
				? APP_ROUTES.auth.registerTenant
				: APP_ROUTES.auth.registerClient
		);
	}

	protected submit(): void {
		if (this.isSubmitting()) {
			return;
		}

		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		const raw = this.form.getRawValue();

		const request =
			this.mode() === "TENANT"
				? this.sessionService.registerTenant({
						email: raw.email,
						password: raw.password,
						first_name: raw.first_name,
						last_name: raw.last_name,
						commercial_name: raw.commercial_name,
						tenant_kind: raw.tenant_kind,
					})
				: this.sessionService.registerClient({
						email: raw.email,
						password: raw.password,
						first_name: raw.first_name,
						last_name: raw.last_name,
					});

		request.subscribe({
			next: () => {
				this.isSubmitting.set(false);
			},
			error: error => {
				this.errorMessage.set(getApiErrorMessage(error));
				this.isSubmitting.set(false);
			},
		});
	}
}
