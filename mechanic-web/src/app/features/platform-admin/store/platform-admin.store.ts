import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	cleanAuditFilters,
	jsonToText,
	toAuditLogs,
	toBackgroundJob,
	toBackgroundJobs,
	toDemoJobEnqueueRequest,
	toMetricSnapshots,
} from "../adapters/platform-admin.adapter";
import {
	AuditFiltersFormValue,
	AuditLog,
	BackgroundJob,
	DemoJobFormValue,
	EvidenceJobFormValue,
	IncidentSummaryJobFormValue,
	JobsFiltersFormValue,
	MetricSnapshot,
	PagedMetaDto,
	SnapshotFiltersFormValue,
} from "../models/platform-admin.types";
import { PlatformAdminApi } from "../services/platform-admin.service";

@Injectable({
	providedIn: "root",
})
export class PlatformAdminStore {
	private readonly platformAdminApi = inject(PlatformAdminApi);

	readonly auditLogs = signal<AuditLog[]>([]);
	readonly auditMeta = signal<PagedMetaDto | null>(null);
	readonly auditLoading = signal(false);
	readonly auditHasLoaded = signal(false);
	readonly auditError = signal<AppHttpError | null>(null);
	readonly hasAuditError = computed(() => this.auditError() !== null);

	readonly metricSnapshots = signal<MetricSnapshot[]>([]);
	readonly snapshotsMeta = signal<PagedMetaDto | null>(null);
	readonly snapshotsLoading = signal(false);
	readonly snapshotsHasLoaded = signal(false);
	readonly snapshotsError = signal<AppHttpError | null>(null);
	readonly hasSnapshotsError = computed(() => this.snapshotsError() !== null);

	readonly jobs = signal<BackgroundJob[]>([]);
	readonly jobsMeta = signal<PagedMetaDto | null>(null);
	readonly jobsLoading = signal(false);
	readonly jobsHasLoaded = signal(false);
	readonly jobsError = signal<AppHttpError | null>(null);
	readonly hasJobsError = computed(() => this.jobsError() !== null);

	readonly selectedJob = signal<BackgroundJob | null>(null);
	readonly selectedJobLoading = signal(false);
	readonly selectedJobError = signal<AppHttpError | null>(null);
	readonly hasSelectedJobError = computed(() => this.selectedJobError() !== null);

	readonly enqueueJobLoading = signal(false);
	readonly enqueueJobError = signal<AppHttpError | null>(null);
	readonly hasEnqueueJobError = computed(() => this.enqueueJobError() !== null);

	readonly auditCount = computed(
		() => this.auditMeta()?.count ?? this.auditLogs().length
	);

	readonly snapshotsCount = computed(
		() => this.snapshotsMeta()?.count ?? this.metricSnapshots().length
	);

	readonly jobsCount = computed(() => this.jobsMeta()?.count ?? this.jobs().length);

	readonly jobsPendingCount = computed(
		() =>
			this.jobs().filter(job =>
				["PENDING", "QUEUED", "RETRY"].includes(job.status)
			).length
	);

	readonly jobsSuccessCount = computed(
		() =>
			this.jobs().filter(job =>
				["SUCCESS", "SUCCEEDED", "COMPLETED"].includes(job.status)
			).length
	);

	readonly jobsFailedCount = computed(
		() => this.jobs().filter(job => job.status === "FAILED").length
	);

	async loadWorkspace(): Promise<void> {
		await Promise.all([
			this.loadJobs({ limit: 50, offset: 0 }),
			this.loadAuditLogs({
				limit: 50,
				offset: 0,
				eventType: "",
				actorUserId: "",
				incidentId: "",
				providerId: "",
				requestId: "",
			}),
			this.loadMetricSnapshots({
				limit: 50,
				offset: 0,
				snapshotType: "",
			}),
		]);
	}

	async loadAuditLogs(formValue: AuditFiltersFormValue): Promise<void> {
		this.auditLoading.set(true);
		this.auditError.set(null);

		try {
			const response = await firstValueFrom(
				this.platformAdminApi.getAuditLogs(cleanAuditFilters(formValue))
			);

			this.auditLogs.set(toAuditLogs(response.data));
			this.auditMeta.set(response.meta);
			this.auditHasLoaded.set(true);
		} catch (error) {
			this.auditError.set(error as AppHttpError);
			this.auditLogs.set([]);
			this.auditMeta.set(null);
			this.auditHasLoaded.set(true);
		} finally {
			this.auditLoading.set(false);
		}
	}

	async loadMetricSnapshots(formValue: SnapshotFiltersFormValue): Promise<void> {
		this.snapshotsLoading.set(true);
		this.snapshotsError.set(null);

		try {
			const params: {
				limit: string;
				offset: string;
				snapshot_type?: string;
			} = {
				limit: String(formValue.limit),
				offset: String(formValue.offset),
			};

			const snapshotType = formValue.snapshotType.trim();

			if (snapshotType) {
				params.snapshot_type = snapshotType;
			}

			const response = await firstValueFrom(
				this.platformAdminApi.getMetricSnapshots(params)
			);

			this.metricSnapshots.set(toMetricSnapshots(response.data));
			this.snapshotsMeta.set(response.meta);
			this.snapshotsHasLoaded.set(true);
		} catch (error) {
			this.snapshotsError.set(error as AppHttpError);
			this.metricSnapshots.set([]);
			this.snapshotsMeta.set(null);
			this.snapshotsHasLoaded.set(true);
		} finally {
			this.snapshotsLoading.set(false);
		}
	}

	async loadJobs(formValue: JobsFiltersFormValue): Promise<void> {
		this.jobsLoading.set(true);
		this.jobsError.set(null);

		try {
			const response = await firstValueFrom(
				this.platformAdminApi.getJobs({
					limit: String(formValue.limit),
					offset: String(formValue.offset),
				})
			);

			this.jobs.set(toBackgroundJobs(response.data));
			this.jobsMeta.set(response.meta);
			this.jobsHasLoaded.set(true);
		} catch (error) {
			this.jobsError.set(error as AppHttpError);
			this.jobs.set([]);
			this.jobsMeta.set(null);
			this.jobsHasLoaded.set(true);
		} finally {
			this.jobsLoading.set(false);
		}
	}

	async loadJobById(jobId: string): Promise<BackgroundJob | null> {
		this.selectedJobLoading.set(true);
		this.selectedJobError.set(null);

		try {
			const dto = await firstValueFrom(this.platformAdminApi.getJobById(jobId));
			const job = toBackgroundJob(dto);

			this.selectedJob.set(job);
			this.upsertJob(job);

			return job;
		} catch (error) {
			this.selectedJobError.set(error as AppHttpError);
			this.selectedJob.set(null);
			return null;
		} finally {
			this.selectedJobLoading.set(false);
		}
	}

	async enqueueDemoJob(
		formValue: DemoJobFormValue
	): Promise<BackgroundJob | null> {
		this.enqueueJobLoading.set(true);
		this.enqueueJobError.set(null);

		try {
			const payload = toDemoJobEnqueueRequest(formValue);
			const dto = await firstValueFrom(
				this.platformAdminApi.enqueueDemoJob(payload)
			);
			const job = toBackgroundJob(dto);

			this.upsertJob(job);

			return job;
		} catch (error) {
			this.enqueueJobError.set(error as AppHttpError);
			return null;
		} finally {
			this.enqueueJobLoading.set(false);
		}
	}

	async enqueueEvidenceJob(
		formValue: EvidenceJobFormValue
	): Promise<BackgroundJob | null> {
		this.enqueueJobLoading.set(true);
		this.enqueueJobError.set(null);

		try {
			const dto =
				formValue.jobKind === "audio"
					? await firstValueFrom(
							this.platformAdminApi.enqueueAudioTranscriptionJob(
								formValue.evidenceId.trim()
							)
						)
					: await firstValueFrom(
							this.platformAdminApi.enqueueImageAnalysisJob(
								formValue.evidenceId.trim()
							)
						);

			const job = toBackgroundJob(dto);

			this.upsertJob(job);

			return job;
		} catch (error) {
			this.enqueueJobError.set(error as AppHttpError);
			return null;
		} finally {
			this.enqueueJobLoading.set(false);
		}
	}

	async enqueueIncidentSummaryJob(
		formValue: IncidentSummaryJobFormValue
	): Promise<BackgroundJob | null> {
		this.enqueueJobLoading.set(true);
		this.enqueueJobError.set(null);

		try {
			const dto = await firstValueFrom(
				this.platformAdminApi.enqueueIncidentSummaryJob(
					formValue.incidentId.trim()
				)
			);
			const job = toBackgroundJob(dto);

			this.upsertJob(job);

			return job;
		} catch (error) {
			this.enqueueJobError.set(error as AppHttpError);
			return null;
		} finally {
			this.enqueueJobLoading.set(false);
		}
	}

	clearAuditError(): void {
		this.auditError.set(null);
	}

	clearSnapshotsError(): void {
		this.snapshotsError.set(null);
	}

	clearJobsError(): void {
		this.jobsError.set(null);
	}

	clearSelectedJob(): void {
		this.selectedJob.set(null);
		this.selectedJobError.set(null);
	}

	clearEnqueueJobError(): void {
		this.enqueueJobError.set(null);
	}

	jsonText(value: Record<string, unknown>): string {
		return jsonToText(value);
	}

	private upsertJob(job: BackgroundJob): void {
		this.jobs.update(current => {
			const exists = current.some(item => item.id === job.id);

			if (exists) {
				return current.map(item => (item.id === job.id ? job : item));
			}

			return [job, ...current];
		});

		this.jobsMeta.set({
			limit: this.jobsMeta()?.limit ?? 50,
			offset: this.jobsMeta()?.offset ?? 0,
			count: this.jobs().length,
		});

		if (this.selectedJob()?.id === job.id) {
			this.selectedJob.set(job);
		}
	}
}
