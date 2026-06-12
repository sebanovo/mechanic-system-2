import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { API_CONFIG } from "./api.config";
import { ApiMessageResponse, ApiResponse } from "./api.types";
import { buildHttpParams } from "./http-params.builder";
import { QueryParams } from "./query.types";

@Injectable({
	providedIn: "root",
})
export class ApiClient {
	private readonly http = inject(HttpClient);

	get<T>(path: string, params?: QueryParams): Observable<T> {
		return this.http
			.get<ApiResponse<T>>(this.url(path), {
				params: buildHttpParams(params),
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	post<TResponse, TPayload = unknown>(
		path: string,
		payload?: TPayload,
		params?: QueryParams
	): Observable<TResponse> {
		return this.http
			.post<ApiResponse<TResponse>>(this.url(path), payload ?? {}, {
				params: buildHttpParams(params),
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	put<TResponse, TPayload = unknown>(
		path: string,
		payload: TPayload,
		params?: QueryParams
	): Observable<TResponse> {
		return this.http
			.put<ApiResponse<TResponse>>(this.url(path), payload, {
				params: buildHttpParams(params),
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	patch<TResponse, TPayload = unknown>(
		path: string,
		payload: TPayload,
		params?: QueryParams
	): Observable<TResponse> {
		return this.http
			.patch<ApiResponse<TResponse>>(this.url(path), payload, {
				params: buildHttpParams(params),
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	delete<TResponse = ApiMessageResponse>(
		path: string,
		params?: QueryParams
	): Observable<TResponse> {
		return this.http
			.delete<ApiResponse<TResponse>>(this.url(path), {
				params: buildHttpParams(params),
				withCredentials: API_CONFIG.withCredentials,
			})
			.pipe(map(response => response.data));
	}

	private url(path: string): string {
		if (path.startsWith("http://") || path.startsWith("https://")) {
			return path;
		}

		const normalizedPath = path.startsWith("/") ? path : `/${path}`;

		return `${API_CONFIG.baseUrl}${normalizedPath}`;
	}
}
