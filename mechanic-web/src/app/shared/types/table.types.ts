export type TableColumnAlign = "left" | "center" | "right";

export interface TableColumnConfig<TEntity> {
	id: string;
	label: string;
	key?: keyof TEntity;
	sortable?: boolean;
	align?: TableColumnAlign;
	width?: string;
}

export interface TableActionConfig<TEntity> {
	id: string;
	label: string;
	icon?: string;
	variant?: "default" | "outline" | "ghost" | "destructive";
	disabled?: (row: TEntity) => boolean;
	hidden?: (row: TEntity) => boolean;
}
