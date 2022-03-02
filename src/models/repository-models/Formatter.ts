export interface Formatter {
	format: (query: string, ...params: any) => string;
}
