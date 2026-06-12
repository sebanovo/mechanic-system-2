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

import { UserApi } from "../../../entities/user/api";
import {
	User,
	UserType,
	USER_TYPE_OPTIONS,
} from "../../../entities/user/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-change-user-type-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./change-user-type-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeUserTypeForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly userApi = inject(UserApi);

	readonly item = input.required<User>();
	readonly updated = output<User>();
	readonly cancelled = output<void>();

	protected readonly userTypeOptions = USER_TYPE_OPTIONS.filter(
		option => option.value !== ""
	);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		user_type: ["CLIENT" as UserType, [Validators.required]],
	});

	constructor() {
		effect(() => {
			this.form.patchValue({
				user_type: this.item().user_type,
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

		this.userApi
			.changePlatformUserType(this.item().id, {
				user_type: this.form.getRawValue().user_type,
			})
			.subscribe({
				next: user => {
					this.isSubmitting.set(false);
					this.updated.emit(user);
				},
				error: error => {
					this.errorMessage.set(getApiErrorMessage(error));
					this.isSubmitting.set(false);
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}
}
