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
import { toast } from "@spartan-ng/brain/sonner";

import { UserApi } from "../../../entities/user/api";
import { User } from "../../../entities/user/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-change-user-password-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports, HlmInputImports],
	templateUrl: "./change-user-password-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeUserPasswordForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly userApi = inject(UserApi);

	readonly item = input.required<User>();
	readonly updated = output<User>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		new_password: ["", [Validators.required, Validators.minLength(8)]],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.userApi
			.changePlatformUserPassword(this.item().id, {
				new_password: this.form.getRawValue().new_password,
			})
			.subscribe({
				next: user => {
					this.isSubmitting.set(false);

					toast.success("Contraseña actualizada correctamente");

					this.updated.emit(user);
					this.form.reset({ new_password: "" });
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo actualizar la contraseña", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}
}
