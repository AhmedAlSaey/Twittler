import { Database, Formatter, PostTweetCommentQueryParams, TweetCommentsRepositoryIf } from '../models';

export class TweetCommentRepository implements TweetCommentsRepositoryIf {
	constructor(private readonly db: Database, private readonly formatter: Formatter) {}
	/**
	 * The repository function for posting a tweet's comment
	 * @function
	 * @async
	 * @param  {PostTweetCommentQueryParams} params The parameters needed for posting a comment under a tweet
	 * @param  {number} params.userId The user ID of the comment's poster
	 * @param  {number} params.tweetId The tweet ID of the tweet that the comment falls under
	 * @param  {number | undefined} params.parentId The parent comment that the comment falls under (If exists)
	 * @param  {string} params.content The content of the comment
	 * @return {PostTweetCommentQueryResult} The query result
	 * */
	post = async (params: PostTweetCommentQueryParams) => {
		let insertCommentQuery = this.formatter.format(
			`
			INSERT INTO "comment" (user_id, tweet_id, parent_id, "content", time) VALUES (%L, %L, %L, %L, NOW())
       `,
			params.userId,
			params.tweetId,
			params.parentId,
			params.content,
		);
		await this.db.query(insertCommentQuery);
		return true;
	};
}
