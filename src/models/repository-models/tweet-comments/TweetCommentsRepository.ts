import { Repository, PostTweetCommentQueryParams, PostTweetCommentQueryResult } from '../..';

export interface TweetCommentsRepositoryIf extends Repository {
	post: (params: PostTweetCommentQueryParams) => Promise<PostTweetCommentQueryResult>;
}
