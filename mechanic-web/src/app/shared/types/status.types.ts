export type StatusTone =
	| "default"
	| "muted"
	| "success"
	| "warning"
	| "info"
	| "destructive";

export interface StatusConfig<TStatus extends string = string> {
	value: TStatus;
	label: string;
	description?: string;
	tone: StatusTone;
	order?: number;
}
