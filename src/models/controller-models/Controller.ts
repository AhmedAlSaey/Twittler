import { HTTPRequest } from './HTTPRequest';

export type Controller = (httpRequest: HTTPRequest) => Promise<HTTPRequest>;
