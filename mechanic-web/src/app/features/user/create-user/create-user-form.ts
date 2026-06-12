import {
	ChangeDetectionStrategy,
	Component,
	inject,
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
import {
	User,
	UserType,
	USER_TYPE_OPTIONS,
} from "../../../entities/user/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-user-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-user-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly userApi = inject(UserApi);

	readonly created = output<User>();
	readonly cancelled = output<void>();

	protected readonly userTypeOptions = USER_TYPE_OPTIONS.filter(
		option => option.value !== ""
	);

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		first_name: ["", [Validators.required, Validators.minLength(2)]],
		last_name: ["", [Validators.required, Validators.minLength(2)]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]],
		user_type: ["CLIENT" as UserType, [Validators.required]],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.userApi
			.createPlatformUser({
				first_name: raw.first_name.trim(),
				last_name: raw.last_name.trim(),
				email: raw.email.trim().toLowerCase(),
				password: raw.password,
				user_type: raw.user_type,
			})
			.subscribe({
				next: user => {
					this.isSubmitting.set(false);

					toast.success("Usuario creado correctamente", {
						description: `${user.first_name} ${user.last_name} fue registrado.`,
					});

					this.created.emit(user);
					this.form.reset({
						first_name: "",
						last_name: "",
						email: "",
						password: "",
						user_type: "CLIENT",
					});
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo crear el usuario", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}
}
