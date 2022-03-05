import { BaseError, BusinessStatusMessage } from '..';
export class HTTPError extends BaseError {
	statusCode: number;
	constructor(name: BusinessStatusMessage, statusCode: number, isOperational: boolean, description: string) {
		super(name, isOperational, description);
		this.statusCode = statusCode;
	}
}
