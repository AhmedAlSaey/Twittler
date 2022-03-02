import { Repository } from '../..';
import { GetUserTweetsQueryParams } from './GetUserTweetsQueryParams';
import { GetUserTweetsQueryResult } from './GetUserTweetsQueryResult';

export interface GetUserTweetsQueryRepository extends Repository {
	get: (param: GetUserTweetsQueryParams) => Promise<GetUserTweetsQueryResult[]>;
}
