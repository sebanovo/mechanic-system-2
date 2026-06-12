import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideClock,
	lucideHash,
	lucideInfo,
	lucideMapPin,
	lucideRoute,
	lucideStar,
	lucideWrench,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { CandidateProviderApi } from "../../../entities/candidate-provider/api/candidate-provider.api";
import {
	CANDIDATE_PROVIDER_STATUS_OPTIONS,
	CandidateProviderDetail,
	CandidateProviderPagination,
	CandidateProviderStatus,
	createEmptyCandidateProviderPagination,
	formatCandidateDistance,
	formatCandidateEta,
	formatCandidateProviderDate,
	formatCandidateScore,
	getCandidateIncidentCode,
	getCandidateIncidentDescription,
	getCandidateProviderOperationalText,
	getCandidateProviderStatusLabel,
	isCandidateFinalStatus,
} from "../../../entities/candidate-provider/model";
import { CandidateProviderStatusBadge } from "../../../entities/candidate-provider/ui/candidate-provider-status-badge/candidate-provider-status-badge";
import {
	formatIncidentDate,
	getIncidentLocationLabel,
	getIncidentPriorityLabel,
} from "../../../entities/incident/model";
import { getApiErrorMessage } from "../../../shared/api";
import {
	ConfirmActionDialog,
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	ResourceActionItem,
	ResourceActionsMenu,
	SideDrawer,
	StatCard,
} from "../../../shared/custom-components";

type PendingCandidateStatusChange = {
	item: CandidateProviderDetail;
	nextStatus: CandidateProviderStatus;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

@Component({
	selector: "app-tenant-candidate-providers-list",
	standalone: true,
	imports: [
		NgIcon,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		ConfirmActionDialog,
		StatCard,
		CandidateProviderStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideHash,
			lucideInfo,
			lucideMapPin,
			lucideRoute,
			lucideStar,
			lucideWrench,
		}),
	],
	templateUrl: "./tenant-candidate-providers-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCandidateProvidersList implements OnInit {
	private readonly candidateProviderApi = inject(CandidateProviderApi);

	protected readonly items = signal<CandidateProviderDetail[]>([]);
	protected readonly pagination = signal<CandidateProviderPagination>(
		createEmptyCandidateProviderPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly status = signal<CandidateProviderStatus | "">("");
	protected readonly statusOptions = CANDIDATE_PROVIDER_STATUS_OPTIONS;

	protected readonly selectedItem = signal<CandidateProviderDetail | null>(
		null
	);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly pendingStatusChange =
		signal<PendingCandidateStatusChange | null>(null);
	protected readonly isChangingStatus = signal(false);

	protected readonly stats = signal({
		total: 0,
		requested: 0,
		suggested: 0,
		selected: 0,
		discarded: 0,
		expired: 0,
	});

	protected readonly isCandidateFinalStatus = isCandidateFinalStatus;

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();

		if (!search) {
			return this.items();
		}

		return this.items().filter(item => {
			const incidentCode = getCandidateIncidentCode(item).toLowerCase();
			const description = getCandidateIncidentDescription(item).toLowerCase();
			const address = getIncidentLocationLabel(item.incident).toLowerCase();
			const status = getCandidateProviderStatusLabel(
				item.candidate.candidate_status
			).toLowerCase();

			return (
				incidentCode.includes(search) ||
				description.includes(search) ||
				address.includes(search) ||
				status.includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStats();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.candidateProviderApi
			.listCurrentTenantCandidateProviders({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				candidate_status: this.status(),
			})
			.subscribe({
				next: response => {
					this.items.set(response.items);
					this.pagination.set(response.pagination);
					this.isLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoading.set(false);

					toast.error("No se pudieron cargar los candidatos", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.candidateProviderApi.listCurrentTenantCandidateProviders({
				page: 1,
				page_size: 1,
				candidate_status: "",
			}),
			requested: this.candidateProviderApi.listCurrentTenantCandidateProviders({
				page: 1,
				page_size: 1,
				candidate_status: "REQUESTED",
			}),
			suggested: this.candidateProviderApi.listCurrentTenantCandidateProviders({
				page: 1,
				page_size: 1,
				candidate_status: "SUGGESTED",
			}),
			selected: this.candidateProviderApi.listCurrentTenantCandidateProviders({
				page: 1,
				page_size: 1,
				candidate_status: "SELECTED",
			}),
			discarded: this.candidateProviderApi.listCurrentTenantCandidateProviders({
				page: 1,
				page_size: 1,
				candidate_status: "DISCARDED",
			}),
			expired: this.candidateProviderApi.listCurrentTenantCandidateProviders({
				page: 1,
				page_size: 1,
				candidate_status: "EXPIRED",
			}),
		}).subscribe({
			next: response => {
				this.stats.set({
					total: response.all.pagination.total,
					requested: response.requested.pagination.total,
					suggested: response.suggested.pagination.total,
					selected: response.selected.pagination.total,
					discarded: response.discarded.pagination.total,
					expired: response.expired.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					requested: 0,
					suggested: 0,
					selected: 0,
					discarded: 0,
					expired: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onStatusFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as CandidateProviderStatus | "");
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onPageChange(page: number): void {
		this.pagination.update(current => ({
			...current,
			page,
		}));

		this.load();
	}

	protected onPageSizeChange(pageSize: number): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
			page_size: pageSize,
		}));

		this.load();
	}

	protected openDetail(item: CandidateProviderDetail): void {
		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedItem.set(item);

		this.candidateProviderApi
			.getCurrentTenantCandidateProviderById(item.candidate.id)
			.subscribe({
				next: detail => {
					this.selectedItem.set(detail);
					this.isDetailLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.detailErrorMessage.set(message);
					this.isDetailLoading.set(false);

					toast.error("No se pudo cargar el detalle del candidato", {
						description: message,
					});
				},
			});
	}

	protected closeDetail(): void {
		this.isDetailDrawerOpen.set(false);
		this.selectedItem.set(null);
		this.detailErrorMessage.set(null);
	}

	protected actionsFor(item: CandidateProviderDetail): ResourceActionItem[] {
		const status = item.candidate.candidate_status;

		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (!isCandidateFinalStatus(status) && status !== "SELECTED") {
			actions.push({
				id: "select",
				label: "Marcar seleccionado",
			});
		}

		if (!isCandidateFinalStatus(status)) {
			actions.push({
				id: "discard",
				label: "Descartar",
				destructive: true,
			});
		}

		if (status !== "EXPIRED" && status !== "DISCARDED") {
			actions.push({
				id: "expire",
				label: "Marcar expirado",
				destructive: true,
			});
		}

		return actions;
	}

	protected onAction(actionId: string, item: CandidateProviderDetail): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "select") {
			this.prepareStatusChange(item, "SELECTED");
			return;
		}

		if (actionId === "discard") {
			this.prepareStatusChange(item, "DISCARDED");
			return;
		}

		if (actionId === "expire") {
			this.prepareStatusChange(item, "EXPIRED");
		}
	}

	protected prepareStatusChange(
		item: CandidateProviderDetail,
		nextStatus: CandidateProviderStatus
	): void {
		const incidentCode = getCandidateIncidentCode(item);

		if (nextStatus === "SELECTED") {
			this.pendingStatusChange.set({
				item,
				nextStatus,
				title: "Marcar candidato seleccionado",
				description: `El taller quedará marcado como seleccionado para el incidente ${incidentCode}.`,
				confirmLabel: "Seleccionar",
				destructive: false,
			});
			return;
		}

		if (nextStatus === "DISCARDED") {
			this.pendingStatusChange.set({
				item,
				nextStatus,
				title: "Descartar candidato",
				description: `El taller será descartado como candidato para el incidente ${incidentCode}.`,
				confirmLabel: "Descartar",
				destructive: true,
			});
			return;
		}

		this.pendingStatusChange.set({
			item,
			nextStatus,
			title: "Marcar candidatura expirada",
			description: `La candidatura para el incidente ${incidentCode} será marcada como expirada.`,
			confirmLabel: "Marcar expirada",
			destructive: true,
		});
	}

	protected cancelStatusChange(): void {
		if (this.isChangingStatus()) {
			return;
		}

		this.pendingStatusChange.set(null);
	}

	protected confirmStatusChange(): void {
		const pending = this.pendingStatusChange();

		if (!pending || this.isChangingStatus()) {
			return;
		}

		this.isChangingStatus.set(true);

		this.candidateProviderApi
			.changeCurrentTenantCandidateProviderStatus(pending.item.candidate.id, {
				candidate_status: pending.nextStatus,
			})
			.subscribe({
				next: updated => {
					this.patchItem(updated);

					toast.success("Estado de candidato actualizado", {
						description: `La candidatura quedó en estado ${getCandidateProviderStatusLabel(updated.candidate.candidate_status)}.`,
					});

					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);
					this.loadStats();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);

					toast.error("No se pudo actualizar el candidato", {
						description: message,
					});
				},
			});
	}

	patchItem(updated: CandidateProviderDetail): void {
		this.items.update(items =>
			items.map(item =>
				item.candidate.id === updated.candidate.id ? updated : item
			)
		);

		if (this.selectedItem()?.candidate.id === updated.candidate.id) {
			this.selectedItem.set(updated);
		}
	}

	protected incidentCode(item: CandidateProviderDetail): string {
		return getCandidateIncidentCode(item);
	}

	protected incidentDescription(item: CandidateProviderDetail): string {
		return getCandidateIncidentDescription(item);
	}

	protected incidentLocation(item: CandidateProviderDetail): string {
		return getIncidentLocationLabel(item.incident);
	}

	protected incidentPriority(item: CandidateProviderDetail): string {
		return getIncidentPriorityLabel(item.incident);
	}

	protected incidentCreatedAt(item: CandidateProviderDetail): string {
		return formatIncidentDate(item.incident.created_at);
	}

	protected candidateCreatedAt(item: CandidateProviderDetail): string {
		return formatCandidateProviderDate(item.candidate.created_at);
	}

	protected candidateUpdatedAt(item: CandidateProviderDetail): string {
		return formatCandidateProviderDate(item.candidate.updated_at);
	}

	protected distanceLabel(item: CandidateProviderDetail): string {
		return formatCandidateDistance(item.candidate.distance_km);
	}

	protected etaLabel(item: CandidateProviderDetail): string {
		return formatCandidateEta(item.candidate.estimated_arrival_minutes);
	}

	protected matchScoreLabel(item: CandidateProviderDetail): string {
		return formatCandidateScore(item.candidate.match_score);
	}

	protected ratingScoreLabel(item: CandidateProviderDetail): string {
		return formatCandidateScore(item.candidate.rating_score);
	}

	protected capacityScoreLabel(item: CandidateProviderDetail): string {
		return formatCandidateScore(item.candidate.capacity_score);
	}

	protected responseScoreLabel(item: CandidateProviderDetail): string {
		return formatCandidateScore(item.candidate.response_score);
	}

	protected operationalText(item: CandidateProviderDetail): string {
		return getCandidateProviderOperationalText(item);
	}
}
