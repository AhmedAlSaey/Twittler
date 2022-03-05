import { BusinessStatusMessage } from '..';

export class BaseError extends Error {
	isOperational: boolean;
	constructor(name: BusinessStatusMessage, isOperational: boolean, description: string) {
		super(description);
		this.isOperational = isOperational;
		this.name = name;
		Error.captureStackTrace(this);
	}
}
