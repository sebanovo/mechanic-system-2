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
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

import { TenantApi } from "../../../entities/tenant/api/tenant.api";
import { Tenant } from "../../../entities/tenant/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-tenant-network-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-tenant-network-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTenantNetworkForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly tenantApi = inject(TenantApi);

	readonly created = output<Tenant>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		commercial_name: ["", [Validators.required, Validators.maxLength(150)]],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.tenantApi
			.createCurrentTenantNetwork({
				commercial_name: raw.commercial_name.trim(),
			})
			.subscribe({
				next: tenant => {
					this.isSubmitting.set(false);

					toast.success("Red de tenant creada", {
						description: `${tenant.commercial_name} fue creada correctamente.`,
					});

					this.created.emit(tenant);
					this.form.reset();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo crear la red", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}
}
