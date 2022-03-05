export interface Repository {
	get?: (params: any) => Promise<any>;
	post?: (params: any) => Promise<any>;
}
