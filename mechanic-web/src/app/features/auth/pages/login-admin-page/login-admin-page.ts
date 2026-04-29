import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
	getDefaultRouteForUser,
	isSafeLocalReturnUrl,
} from "../../../../core/session/utils/session-route.utils";
import { LoginAdminForm } from "../../components/login-admin-form/login-admin-form";
import { LoginRequest } from "../../models/auth.dto";
import { AuthStore } from "../../store/auth.store";

@Component({
	selector: "app-login-admin-page",
	imports: [LoginAdminForm],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./login-admin-page.html",
	styleUrl: "./login-admin-page.css",
})
export class LoginAdminPage {
	private readonly authStore = inject(AuthStore);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	readonly isSubmitting = this.authStore.loading;
	readonly errorMessage = this.authStore.errorMessage;

	async onSubmitWithAdmin(payload: LoginRequest): Promise<void> {
		const success = await this.authStore.loginAdmin(payload);

		if (!success) {
			return;
		}

		await this.navigateAfterLogin();
	}

	onFormEdited(): void {
		this.authStore.clearError();
	}

	private async navigateAfterLogin(): Promise<void> {
		const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

		if (isSafeLocalReturnUrl(returnUrl)) {
			await this.router.navigateByUrl(returnUrl);
			return;
		}

		await this.router.navigateByUrl(getDefaultRouteForUser(this.authStore.user()));
	}
}
