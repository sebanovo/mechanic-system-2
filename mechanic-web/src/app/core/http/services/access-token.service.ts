import { Injectable } from "@angular/core";

export type TokenData = {
	access_token: string;
	token_type: string;
	expires_in_minutes: number;
};

@Injectable({
	providedIn: "root",
})
export class AccessTokenService {
	private readonly sessionKey = "session";

	getTokens(): TokenData | null {
		const raw = localStorage.getItem(this.sessionKey);

		if (!raw) {
			return null;
		}

		try {
			const parsed = JSON.parse(raw) as unknown;

			if (!this.isTokenData(parsed)) {
				this.clearTokens();
				return null;
			}

			return {
				access_token: parsed.access_token,
				token_type: this.normalizeTokenType(parsed.token_type),
				expires_in_minutes: parsed.expires_in_minutes,
			};
		} catch {
			this.clearTokens();
			return null;
		}
	}

	setTokens(session: TokenData): void {
		const safeSession: TokenData = {
			access_token: session.access_token,
			token_type: this.normalizeTokenType(session.token_type),
			expires_in_minutes: session.expires_in_minutes,
		};

		localStorage.setItem(this.sessionKey, JSON.stringify(safeSession));
	}

	clearTokens(): void {
		localStorage.removeItem(this.sessionKey);
	}

	getAccessToken(): string | null {
		return this.getTokens()?.access_token ?? null;
	}

	getTokenType(): string {
		return this.getTokens()?.token_type ?? "Bearer";
	}

	hasAccessToken(): boolean {
		return !!this.getAccessToken();
	}

	private normalizeTokenType(tokenType: string | null | undefined): string {
		if (!tokenType?.trim()) {
			return "Bearer";
		}

		return tokenType.trim();
	}

	private isTokenData(value: unknown): value is TokenData {
		if (!value || typeof value !== "object") {
			return false;
		}

		const candidate = value as Record<string, unknown>;

		return (
			typeof candidate["access_token"] === "string" &&
			typeof candidate["token_type"] === "string" &&
			typeof candidate["expires_in_minutes"] === "number"
		);
	}
}
