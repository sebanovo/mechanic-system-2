export type EntityId = string;

export interface TimestampedEntity {
	created_at: string;
	updated_at: string;
}

export interface SoftDeletedEntity {
	deleted_at: string | null;
}

export interface BaseEntity extends TimestampedEntity, SoftDeletedEntity {
	id: EntityId;
}

export interface EntityOption {
	id: EntityId;
	label: string;
	description?: string;
	disabled?: boolean;
}
