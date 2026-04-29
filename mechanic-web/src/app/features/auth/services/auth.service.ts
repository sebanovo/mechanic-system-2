import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";

import { AccessTokenService } from "../../../core/http/services/access-token.service";
import {
	AuthResponse,
	AuthSessionDto,
	LoginRequest,
	RegisterRequest,
	UserDto,
} from "../models/auth.dto";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly accessTokenService = inject(AccessTokenService);

	register(payload: RegisterRequest): Observable<AuthSessionDto> {
		return this.http
			.post<AuthResponse<AuthSessionDto>>("/api/auth/register", payload)
			.pipe(
				map(response => response.data),
				tap(session => this.saveSessionTokens(session))
			);
	}

	login(payload: LoginRequest): Observable<AuthSessionDto> {
		return this.http.post<AuthResponse<AuthSessionDto>>("/api/auth/login", payload).pipe(
			map(response => response.data),
			tap(session => this.saveSessionTokens(session))
		);
	}

	getMe(): Observable<UserDto> {
		return this.http
			.get<AuthResponse<UserDto>>("/api/auth/me")
			.pipe(map(response => response.data));
	}

	logout(): void {
		this.accessTokenService.clearTokens();
	}

	hasToken(): boolean {
		return this.accessTokenService.hasAccessToken();
	}

	private saveSessionTokens(session: AuthSessionDto): void {
		this.accessTokenService.setTokens({
			access_token: session.access_token,
			token_type: session.token_type || "Bearer",
			expires_in_minutes: session.expires_in_minutes,
		});
	}
}
