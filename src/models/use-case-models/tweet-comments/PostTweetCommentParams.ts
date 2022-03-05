export type PostTweetCommentParams = {
	userId: number;
	tweetId: number;
	parentId?: number;
	content: string;
};
