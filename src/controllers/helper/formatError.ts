import { BaseError, HTTPError, HTTPErrorFormatter, BusinessStatusMessage, HTTPStatusCode } from '../../models';

/**
 * A function used to convert any error to an HTTP error with the correct status code
 * @function
 * @param  {Error} error The error to parse
 * @return {HTTPError} The resulting HTTP error
 * */
export const formatError: HTTPErrorFormatter = (error: Error) => {
	// Default status code
	let statusCode = HTTPStatusCode.INTERNAL_SERVER;

	if (error instanceof BaseError) {
		let baseError = error as BaseError;
		switch (baseError.name) {
			case BusinessStatusMessage.INVALID_PARAMETER:
			case BusinessStatusMessage.MISSING_PARAMETER:
				statusCode = HTTPStatusCode.BAD_REQUEST;
				break;
			case BusinessStatusMessage.DATA_NOT_FOUND:
				statusCode = HTTPStatusCode.NOT_FOUND;
				break;
			case BusinessStatusMessage.UNAUTHORIZED:
				statusCode = HTTPStatusCode.UNAUTHORIZED;
		}
		return new HTTPError(
			baseError.name as BusinessStatusMessage,
			statusCode,
			baseError.isOperational,
			baseError.message,
		);
	} else {
		return new HTTPError(BusinessStatusMessage.UNEXPECTED_ERROR, statusCode, true, error.message);
	}
};
