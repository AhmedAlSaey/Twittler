export interface Database {
	query: (query: string, ...params: string[]) => Promise<any[]>;
}
