import { HttpParams } from "@angular/common/http";

import { removeEmptyValues } from "../lib/object/remove-empty-values";
import { QueryParams } from "./query.types";

export function buildHttpParams(params?: QueryParams): HttpParams {
	const cleanParams = removeEmptyValues(params ?? {});
	let httpParams = new HttpParams();

	for (const [key, value] of Object.entries(cleanParams)) {
		if (Array.isArray(value)) {
			for (const item of value) {
				if (item !== null && item !== undefined && item !== "") {
					httpParams = httpParams.append(key, String(item));
				}
			}

			continue;
		}

		httpParams = httpParams.set(key, String(value));
	}

	return httpParams;
}
