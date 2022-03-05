export type PostTweetCommentQueryParams = {
	userId: number;
	tweetId: number;
	parentId?: number;
	content: string;
};
