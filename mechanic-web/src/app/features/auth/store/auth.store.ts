import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { Router } from "@angular/router";
import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import { SessionStore } from "../../../core/session/store/session.store";
import { toAuthUser } from "../adapters/auth.adapter";
import { LoginRequest, RegisterRequest } from "../models/auth.dto";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class AuthStore {
	private readonly authService = inject(AuthService);
	private readonly sessionStore = inject(SessionStore);
	readonly router = inject(Router);

	readonly loading = signal(false);
	readonly error = signal<AppHttpError | null>(null);

	readonly errorMessage = computed(() => this.error()?.message ?? null);

	readonly user = this.sessionStore.user;
	readonly isAuthenticated = this.sessionStore.isAuthenticated;

	async login(payload: LoginRequest): Promise<boolean> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const sessionDto = await firstValueFrom(this.authService.login(payload));
			const user = toAuthUser(sessionDto.user);

			this.sessionStore.setAuthenticated(user);

			return true;
		} catch (error) {
			this.error.set(this.toAppHttpError(error));
			return false;
		} finally {
			this.loading.set(false);
		}
	}

	async loginAdmin(payload: LoginRequest): Promise<boolean> {
		return this.login(payload);
	}

	async register(payload: RegisterRequest): Promise<boolean> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const sessionDto = await firstValueFrom(
				this.authService.register(payload)
			);
			const user = toAuthUser(sessionDto.user);

			this.sessionStore.setAuthenticated(user);

			return true;
		} catch (error) {
			this.error.set(this.toAppHttpError(error));
			return false;
		} finally {
			this.loading.set(false);
		}
	}

	async logout(): Promise<void> {
		this.authService.logout(); // solo limpia tokens
		// this.reset();
		this.sessionStore.clearSession();

		await this.router.navigate(["/auth/login"]);
	}

	clearError(): void {
		this.error.set(null);
	}

	private toAppHttpError(error: unknown): AppHttpError {
		if (this.isAppHttpError(error)) {
			return error;
		}

		if (error && typeof error === "object") {
			const candidate = error as Record<string, unknown>;

			return {
				code: "UNKNOWN",
				status:
					typeof candidate["status"] === "number" ? candidate["status"] : null,
				message:
					typeof candidate["message"] === "string"
						? candidate["message"]
						: "No se pudo completar la operación.",
				fieldErrors: [],
				timestamp: null,
				requestId: null,
			};
		}

		return {
			code: "UNKNOWN",
			status: null,
			message: "No se pudo completar la operación.",
			fieldErrors: [],
			timestamp: null,
			requestId: null,
		};
	}

	private isAppHttpError(error: unknown): error is AppHttpError {
		if (!error || typeof error !== "object") {
			return false;
		}

		const candidate = error as Record<string, unknown>;

		return (
			typeof candidate["message"] === "string" &&
			"code" in candidate &&
			"fieldErrors" in candidate
		);
	}
}
