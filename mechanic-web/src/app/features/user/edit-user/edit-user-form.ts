import {
	ChangeDetectionStrategy,
	Component,
	effect,
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
import { User, UserUpdatePayload } from "../../../entities/user/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-edit-user-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./edit-user-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly userApi = inject(UserApi);

	readonly item = input.required<User>();
	readonly updated = output<User>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		first_name: ["", [Validators.required, Validators.minLength(2)]],
		last_name: ["", [Validators.required, Validators.minLength(2)]],
		phone: [""],
		avatar_url: [""],
	});

	constructor() {
		effect(() => {
			const item = this.item();

			this.form.patchValue({
				first_name: item.first_name,
				last_name: item.last_name,
				phone: item.phone ?? "",
				avatar_url: item.avatar_url ?? "",
			});
		});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		const payload: UserUpdatePayload = this.buildPayload();

		this.userApi.updatePlatformUser(this.item().id, payload).subscribe({
			next: user => {
				this.isSubmitting.set(false);

				toast.success("Usuario actualizado correctamente", {
					description: `${user.first_name} ${user.last_name} fue actualizado.`,
				});

				this.updated.emit(user);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error("No se pudo actualizar el usuario", {
					description: message,
				});
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private buildPayload(): UserUpdatePayload {
		const raw = this.form.getRawValue();

		return {
			first_name: raw.first_name.trim(),
			last_name: raw.last_name.trim(),
			phone: raw.phone.trim() || null,
			avatar_url: raw.avatar_url.trim() || null,
		};
	}
}
