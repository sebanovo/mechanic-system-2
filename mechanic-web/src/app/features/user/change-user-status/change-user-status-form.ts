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
	USER_STATUS_OPTIONS,
	User,
	UserStatus,
} from "../../../entities/user/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-change-user-status-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./change-user-status-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeUserStatusForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly userApi = inject(UserApi);

	readonly item = input.required<User>();
	readonly updated = output<User>();
	readonly cancelled = output<void>();

	protected readonly statusOptions = USER_STATUS_OPTIONS.filter(
		option => option.value !== ""
	);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		status: ["ACTIVE" as UserStatus, [Validators.required]],
	});

	constructor() {
		effect(() => {
			this.form.patchValue({
				status: this.item().status,
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
			.changePlatformUserStatus(this.item().id, {
				status: this.form.getRawValue().status,
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
