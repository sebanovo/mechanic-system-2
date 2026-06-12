import {
	ChangeDetectionStrategy,
	Component,
	inject,
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

import { SessionService } from "../../../core/session/session.service";
import { getApiErrorMessage } from "../../../shared/api/api-error";

@Component({
	selector: "app-auth-login-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./auth-login-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly sessionService = inject(SessionService);

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const { email, password } = this.form.getRawValue();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.sessionService.login(email, password).subscribe({
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
