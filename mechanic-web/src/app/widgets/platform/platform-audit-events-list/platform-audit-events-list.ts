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
	lucideCode2,
	lucideDatabase,
	lucideFileClock,
	lucideFingerprint,
	lucideGlobe,
	lucideHistory,
	lucideInfo,
	lucideMonitor,
	lucideSearch,
	lucideShield,
	lucideUser,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";

import { AuditEventApi } from "../../../entities/audit-event/api/audit-event.api";
import {
	AUDIT_ACTOR_OPTIONS,
	AuditEvent,
	AuditEventFilters,
	AuditEventPagination,
	createEmptyAuditEventFilters,
	createEmptyAuditEventPagination,
	formatAuditDate,
	formatAuditEventData,
	formatAuditEventType,
	formatAuditResourceType,
	getAuditActorReference,
	getAuditResourceLabel,
	hasAuditEventData,
	toAuditDateTimeEnd,
	toAuditDateTimeStart,
} from "../../../entities/audit-event/model";
import { AuditActorBadge } from "../../../entities/audit-event/ui/audit-actor-badge/audit-actor-badge";
import { getApiErrorMessage } from "../../../shared/api";
import {
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

type PlatformAuditEventFilters = AuditEventFilters & {
	scope: string;
	tenant_id: string;
};

function createEmptyPlatformAuditEventFilters(): PlatformAuditEventFilters {
	return {
		...createEmptyAuditEventFilters(),
		scope: "",
		tenant_id: "",
	};
}

@Component({
	selector: "app-platform-audit-events-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		HlmInputImports,
		DataToolbar,
		ErrorState,
		LoadingState,
		PageSection,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		StatCard,
		AuditActorBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideCode2,
			lucideDatabase,
			lucideFileClock,
			lucideFingerprint,
			lucideGlobe,
			lucideHistory,
			lucideInfo,
			lucideMonitor,
			lucideSearch,
			lucideShield,
			lucideUser,
		}),
	],
	templateUrl: "./platform-audit-events-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformAuditEventsList implements OnInit {
	private readonly auditEventApi = inject(AuditEventApi);

	protected readonly items = signal<AuditEvent[]>([]);
	protected readonly pagination = signal<AuditEventPagination>(
		createEmptyAuditEventPagination()
	);
	protected readonly filters = signal<PlatformAuditEventFilters>(
		createEmptyPlatformAuditEventFilters()
	);
	protected readonly search = signal("");
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly selectedEvent = signal<AuditEvent | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly historyItems = signal<AuditEvent[]>([]);
	protected readonly isHistoryOpen = signal(false);
	protected readonly isHistoryLoading = signal(false);
	protected readonly historyResourceLabel = signal("");
	protected readonly actorOptions = AUDIT_ACTOR_OPTIONS;

	protected readonly filteredItems = computed(() =>
		this.items().filter(item => this.matchesSearch(item, this.search()))
	);

	protected readonly pageStats = computed(() => {
		const items = this.items();

		return {
			system: items.filter(item => item.actor_type === "SYSTEM").length,
			superadmins: items.filter(item => item.actor_type === "SUPERADMIN")
				.length,
			owners: items.filter(item => item.actor_type === "TENANT_OWNER").length,
		};
	});

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		const filters = this.filters();

		this.auditEventApi
			.listPlatformAuditEvents({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				actor_id: filters.actor_id.trim() || undefined,
				scope: filters.scope.trim() || undefined,
				tenant_id: filters.tenant_id.trim() || undefined,
				event_type: filters.event_type.trim() || undefined,
				resource_type: filters.resource_type.trim() || undefined,
				resource_id: filters.resource_id.trim() || undefined,
				created_from: toAuditDateTimeStart(filters.created_from),
				created_to: toAuditDateTimeEnd(filters.created_to),
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

					toast.error("No se pudo cargar la auditoría de plataforma", {
						description: message,
					});
				},
			});
	}

	protected updateFilter(
		key: keyof PlatformAuditEventFilters,
		value: string
	): void {
		this.filters.update(current => ({
			...current,
			[key]: value,
		}));
	}

	protected applyFilters(): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected clearFilters(): void {
		this.filters.set(createEmptyPlatformAuditEventFilters());
		this.search.set("");

		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onSearch(value: string): void {
		this.search.set(value);
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

	protected actionsFor(item: AuditEvent): ResourceActionItem[] {
		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (item.resource_id && item.resource_type) {
			actions.push({
				id: "history",
				label: "Ver historial del recurso",
			});
		}

		return actions;
	}

	protected onAction(actionId: string, item: AuditEvent): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "history") {
			this.openHistory(item);
		}
	}

	protected openDetail(item: AuditEvent): void {
		this.selectedEvent.set(item);
		this.isDetailOpen.set(true);
		this.isDetailLoading.set(true);

		this.auditEventApi.getPlatformAuditEventById(item.id).subscribe({
			next: event => {
				this.selectedEvent.set(event);
				this.isDetailLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.isDetailLoading.set(false);

				toast.error("No se pudo cargar el evento", {
					description: message,
				});
			},
		});
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedEvent.set(null);
	}

	protected openHistory(item: AuditEvent): void {
		if (!item.resource_id || !item.resource_type) {
			return;
		}

		this.historyItems.set([]);
		this.historyResourceLabel.set(getAuditResourceLabel(item));
		this.isHistoryOpen.set(true);
		this.isHistoryLoading.set(true);

		this.auditEventApi
			.getPlatformResourceHistory(item.resource_type, item.resource_id)
			.subscribe({
				next: response => {
					this.historyItems.set(response.items);
					this.isHistoryLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.isHistoryLoading.set(false);

					toast.error("No se pudo cargar el historial", {
						description: message,
					});
				},
			});
	}

	protected closeHistory(): void {
		this.isHistoryOpen.set(false);
		this.historyItems.set([]);
		this.historyResourceLabel.set("");
	}

	protected eventTypeLabel(item: AuditEvent): string {
		return formatAuditEventType(item.event_type);
	}

	protected resourceTypeLabel(item: AuditEvent): string {
		return formatAuditResourceType(item.resource_type);
	}

	protected resourceLabel(item: AuditEvent): string {
		return getAuditResourceLabel(item);
	}

	protected actorReference(item: AuditEvent): string {
		return getAuditActorReference(item);
	}

	protected dateLabel(value: string | null | undefined): string {
		return formatAuditDate(value);
	}

	protected eventDataLabel(item: AuditEvent): string {
		return formatAuditEventData(item.event_data);
	}

	protected hasEventData(item: AuditEvent): boolean {
		return hasAuditEventData(item);
	}

	protected trackAuditEvent(_: number, item: AuditEvent): string {
		return item.id;
	}

	private matchesSearch(event: AuditEvent, search: string): boolean {
		const normalizedSearch = search.trim().toLowerCase();

		if (!normalizedSearch) {
			return true;
		}

		const searchableValues = [
			event.event_type,
			event.resource_type,
			event.resource_id,
			event.actor_type,
			event.user_id,
			event.ip_address,
			formatAuditEventType(event.event_type),
			formatAuditResourceType(event.resource_type),
			event.scope,
			event.tenant_id,
		];

		return searchableValues.some(value =>
			value?.toLowerCase().includes(normalizedSearch)
		);
	}
}
