import {
	Repository,
	GetUserTweetsQueryParams,
	GetUserTweetsQueryResult,
	PostUserTweetsQueryParams,
	PostUserTweetsQueryResult,
} from '../..';

export interface UserTweetsRepositoryIf extends Repository {
	get: (params: GetUserTweetsQueryParams) => Promise<GetUserTweetsQueryResult[]>;
	post: (params: PostUserTweetsQueryParams) => Promise<PostUserTweetsQueryResult>;
}
