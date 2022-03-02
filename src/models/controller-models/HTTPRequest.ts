export type HTTPRequest = {
	headers: {
		'Content-Type'?: string;
		Referer?: string;
		'User-Agent'?: string;
	};
	statusCode?: number;
	params?: any;
	body?: any;
	query?: any;
	ip?: string;
	method?: string;
	path?: string;
};
