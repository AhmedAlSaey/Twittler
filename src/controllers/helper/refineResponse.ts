/**
 * A function used for standardizing the response of any endpoint
 * @function
 * @param  {string} status The status of the request's response
 * @param {string} message Message associated with the response
 * @param {any} items The payload of the response
 * @return {status: string, message: string, items: any} The refined response for the data inserted to the function
 * */
export const refineResponse = (status: string, message: string, items?: any) => {
	return {
		status,
		message,
		items,
	};
};
