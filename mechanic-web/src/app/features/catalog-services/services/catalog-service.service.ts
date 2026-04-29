import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CatalogServiceDto,
	CatalogServicesMetaDto,
	CreateCatalogServiceRequest,
	UpdateCatalogServiceRequest,
} from "../models/catalog-service.types";

@Injectable({
	providedIn: "root",
})
export class CatalogServicesApi {
	private readonly http = inject(HttpClient);

	getCatalogServices(
		includeInactive = true
	): Observable<ApiResponse<CatalogServiceDto[], CatalogServicesMetaDto>> {
		const params = new HttpParams().set(
			"include_inactive",
			String(includeInactive)
		);

		return this.http.get<ApiResponse<CatalogServiceDto[], CatalogServicesMetaDto>>(
			"/api/catalog/services",
			{ params }
		);
	}

	createCatalogService(
		payload: CreateCatalogServiceRequest
	): Observable<CatalogServiceDto> {
		return this.http
			.post<ApiResponse<CatalogServiceDto>>("/api/catalog/services", payload)
			.pipe(map(response => response.data));
	}

	getCatalogServiceById(
		serviceCatalogItemId: string
	): Observable<CatalogServiceDto> {
		return this.http
			.get<ApiResponse<CatalogServiceDto>>(
				`/api/catalog/services/${serviceCatalogItemId}`
			)
			.pipe(map(response => response.data));
	}

	updateCatalogService(
		serviceCatalogItemId: string,
		payload: UpdateCatalogServiceRequest
	): Observable<CatalogServiceDto> {
		return this.http
			.patch<ApiResponse<CatalogServiceDto>>(
				`/api/catalog/services/${serviceCatalogItemId}`,
				payload
			)
			.pipe(map(response => response.data));
	}
}
