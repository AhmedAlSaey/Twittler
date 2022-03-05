import { HTTPError } from '..';

export type HTTPErrorFormatter = (error: Error) => HTTPError;
