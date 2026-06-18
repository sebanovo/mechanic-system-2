import { HttpErrorResponse } from "@angular/common/http";

import { ApiErrorResponse } from "./api.types";

function extractApiErrorDetails(body: Partial<ApiErrorResponse> | null): {
	field?: string;
	message: string;
}[] {
	if (!body) {
		return [];
	}

	if (body.details?.length) {
		return body.details;
	}

	if (body.error?.details?.length) {
		return body.error.details;
	}

	return [];
}

export function getApiErrorMessage(error: unknown): string {
	if (error instanceof HttpErrorResponse) {
		const body = error.error as Partial<ApiErrorResponse> | null;

		if (body?.message) {
			return body.message;
		}

		if (error.status === 0) {
			return "No se pudo conectar con el servidor.";
		}

		if (error.status === 400) {
			return "La solicitud no es válida.";
		}

		if (error.status === 401) {
			return "Tu sesión no es válida o ha expirado.";
		}

		if (error.status === 403) {
			return "No tienes permisos para realizar esta acción.";
		}

		if (error.status === 404) {
			return "El recurso solicitado no existe.";
		}

		if (error.status === 409) {
			return "La operación no se puede completar por un conflicto de datos.";
		}

		if (error.status >= 500) {
			return "Ocurrió un error interno en el servidor.";
		}

		return "Ocurrió un error al procesar la solicitud.";
	}

	return "Ocurrió un error inesperado.";
}

export function getApiFieldErrors(error: unknown): Record<string, string> {
	if (!(error instanceof HttpErrorResponse)) {
		return {};
	}

	const body = error.error as Partial<ApiErrorResponse> | null;

	const details = extractApiErrorDetails(body);

	if (!details.length) {
		return {};
	}

	return details.reduce<Record<string, string>>((acc, detail) => {
		if (!detail.field) {
			return acc;
		}

		return {
			...acc,
			[detail.field]: detail.message,
		};
	}, {});
}
