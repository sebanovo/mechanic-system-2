import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	AuthContext,
	LoginRequest,
	RegisterClientRequest,
	RegisterTenantRequest,
	SelectTenantRequest,
} from "../../../entities/session/model";
import { API_CONFIG } from "../../../shared/api/api.config";
import { ApiResponse } from "../../../shared/api/api.types";

@Injectable({
	providedIn: "root",
})
export class AuthApi {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = `${API_CONFIG.baseUrl}/auth`;

	registerClient(payload: RegisterClientRequest): Observable<AuthContext> {
		return this.http
			.post<ApiResponse<AuthContext>>(`${this.baseUrl}/register-client`, payload, {
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	registerTenant(payload: RegisterTenantRequest): Observable<AuthContext> {
		return this.http
			.post<ApiResponse<AuthContext>>(`${this.baseUrl}/register-tenant`, payload, {
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	login(payload: LoginRequest): Observable<AuthContext> {
		return this.http
			.post<ApiResponse<AuthContext>>(`${this.baseUrl}/login`, payload, {
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	me(): Observable<AuthContext> {
		return this.http
			.get<ApiResponse<AuthContext>>(`${this.baseUrl}/me`, {
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	selectTenant(payload: SelectTenantRequest): Observable<AuthContext> {
		return this.http
			.post<ApiResponse<AuthContext>>(
				`${this.baseUrl}/select-tenant`,
				payload,
				{
					withCredentials: API_CONFIG.withCredentials,
				}
			)
			.pipe(map(response => response.data));
	}

	refresh(): Observable<AuthContext> {
		return this.http
			.post<ApiResponse<AuthContext>>(
				`${this.baseUrl}/refresh`,
				{},
				{
					withCredentials: API_CONFIG.withCredentials,
				}
			)
			.pipe(map(response => response.data));
	}

	logout(): Observable<void> {
		return this.http
			.post<ApiResponse<Record<string, never>>>(
				`${this.baseUrl}/logout`,
				{},
				{
					withCredentials: API_CONFIG.withCredentials,
				}
			)
			.pipe(map(() => undefined));
	}
}
