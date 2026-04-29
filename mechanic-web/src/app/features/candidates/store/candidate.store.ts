import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toAssignmentCandidate,
	toAssignmentCandidates,
	toCandidateActionResult,
} from "../adapters/candidate.adapter";
import {
	AssignmentCandidate,
	CandidateActionResult,
	CandidatesMetaDto,
} from "../models/candidate.types";
import { CandidatesApi } from "../services/candidate.service";

@Injectable({
	providedIn: "root",
})
export class CandidatesStore {
	private readonly candidatesApi = inject(CandidatesApi);

	readonly candidates = signal<AssignmentCandidate[]>([]);
	readonly meta = signal<CandidatesMetaDto | null>(null);

	readonly loading = signal(false);
	readonly hasLoaded = signal(false);
	readonly error = signal<AppHttpError | null>(null);
	readonly hasError = computed(() => this.error() !== null);

	readonly count = computed(
		() => this.meta()?.count ?? this.candidates().length
	);

	readonly isEmpty = computed(
		() => this.hasLoaded() && !this.loading() && this.candidates().length === 0
	);

	readonly averageScore = computed(() => {
		const items = this.candidates();

		if (!items.length) {
			return 0;
		}

		const total = items.reduce((sum, item) => sum + item.score, 0);

		return Math.round((total / items.length) * 100) / 100;
	});

	readonly highPriorityCount = computed(
		() =>
			this.candidates().filter(candidate =>
				["HIGH", "CRITICAL", "URGENT"].includes(candidate.incident.priority)
			).length
	);

	readonly selectedCandidate = signal<AssignmentCandidate | null>(null);
	readonly selectedCandidateLoading = signal(false);
	readonly selectedCandidateError = signal<AppHttpError | null>(null);
	readonly hasSelectedCandidateError = computed(
		() => this.selectedCandidateError() !== null
	);

	readonly acceptingCandidateIds = signal<string[]>([]);
	readonly acceptingCandidateError = signal<AppHttpError | null>(null);
	readonly hasAcceptingCandidateError = computed(
		() => this.acceptingCandidateError() !== null
	);

	readonly rejectingCandidateIds = signal<string[]>([]);
	readonly rejectingCandidateError = signal<AppHttpError | null>(null);
	readonly hasRejectingCandidateError = computed(
		() => this.rejectingCandidateError() !== null
	);

	readonly actingCandidateIds = computed(() => [
		...this.acceptingCandidateIds(),
		...this.rejectingCandidateIds(),
	]);

	async loadAvailableCandidates(): Promise<void> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const response = await firstValueFrom(
				this.candidatesApi.getAvailableCandidates()
			);

			this.candidates.set(toAssignmentCandidates(response.data));
			this.meta.set(response.meta);
			this.hasLoaded.set(true);
		} catch (error) {
			this.error.set(error as AppHttpError);
			this.candidates.set([]);
			this.meta.set(null);
			this.hasLoaded.set(true);
		} finally {
			this.loading.set(false);
		}
	}

	async loadAvailableCandidateById(
		candidateId: string
	): Promise<AssignmentCandidate | null> {
		this.selectedCandidateLoading.set(true);
		this.selectedCandidateError.set(null);
		this.selectedCandidate.set(null);

		try {
			const dto = await firstValueFrom(
				this.candidatesApi.getAvailableCandidateById(candidateId)
			);
			const candidate = toAssignmentCandidate(dto);

			this.selectedCandidate.set(candidate);

			return candidate;
		} catch (error) {
			this.selectedCandidateError.set(error as AppHttpError);
			this.selectedCandidate.set(null);
			return null;
		} finally {
			this.selectedCandidateLoading.set(false);
		}
	}

	async acceptCandidate(
		candidateId: string
	): Promise<CandidateActionResult | null> {
		this.acceptingCandidateError.set(null);
		this.addAcceptingCandidateId(candidateId);

		try {
			const dto = await firstValueFrom(
				this.candidatesApi.acceptCandidate(candidateId)
			);
			const result = toCandidateActionResult(dto);

			this.removeCandidateFromList(candidateId);
			this.markSelectedCandidateAs(candidateId, result.candidateStatus);

			return result;
		} catch (error) {
			this.acceptingCandidateError.set(error as AppHttpError);
			return null;
		} finally {
			this.removeAcceptingCandidateId(candidateId);
		}
	}

	async rejectCandidate(
		candidateId: string
	): Promise<CandidateActionResult | null> {
		this.rejectingCandidateError.set(null);
		this.addRejectingCandidateId(candidateId);

		try {
			const dto = await firstValueFrom(
				this.candidatesApi.rejectCandidate(candidateId)
			);
			const result = toCandidateActionResult(dto);

			this.removeCandidateFromList(candidateId);
			this.markSelectedCandidateAs(candidateId, result.candidateStatus);

			return result;
		} catch (error) {
			this.rejectingCandidateError.set(error as AppHttpError);
			return null;
		} finally {
			this.removeRejectingCandidateId(candidateId);
		}
	}

	isCandidateActing(candidateId: string): boolean {
		return this.actingCandidateIds().includes(candidateId);
	}

	clearError(): void {
		this.error.set(null);
	}

	clearSelectedCandidate(): void {
		this.selectedCandidate.set(null);
	}

	clearSelectedCandidateError(): void {
		this.selectedCandidateError.set(null);
	}

	clearAcceptingCandidateError(): void {
		this.acceptingCandidateError.set(null);
	}

	clearRejectingCandidateError(): void {
		this.rejectingCandidateError.set(null);
	}

	private addAcceptingCandidateId(candidateId: string): void {
		this.acceptingCandidateIds.update(ids =>
			ids.includes(candidateId) ? ids : [...ids, candidateId]
		);
	}

	private removeAcceptingCandidateId(candidateId: string): void {
		this.acceptingCandidateIds.update(ids =>
			ids.filter(id => id !== candidateId)
		);
	}

	private addRejectingCandidateId(candidateId: string): void {
		this.rejectingCandidateIds.update(ids =>
			ids.includes(candidateId) ? ids : [...ids, candidateId]
		);
	}

	private removeRejectingCandidateId(candidateId: string): void {
		this.rejectingCandidateIds.update(ids =>
			ids.filter(id => id !== candidateId)
		);
	}

	private removeCandidateFromList(candidateId: string): void {
		this.candidates.update(current =>
			current.filter(candidate => candidate.id !== candidateId)
		);

		this.meta.set({
			count: this.candidates().length,
		});
	}

	private markSelectedCandidateAs(
		candidateId: string,
		status: AssignmentCandidate["status"]
	): void {
		const selected = this.selectedCandidate();

		if (!selected || selected.id !== candidateId) {
			return;
		}

		this.selectedCandidate.set({
			...selected,
			status,
		});
	}
}
