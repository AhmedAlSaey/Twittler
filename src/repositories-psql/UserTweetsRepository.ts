import {
	Database,
	Formatter,
	GetUserTweetsQueryParams,
	UserTweetsRepositoryIf,
	GetUserTweetsQueryResult,
	PostUserTweetsQueryParams,
} from '../models';

export class UserTweetsRepository implements UserTweetsRepositoryIf {
	constructor(private readonly db: Database, private readonly formatter: Formatter) {}
	/**
	 * The repository function for posting a tweet
	 * @function
	 * @async
	 * @param  {GetUserTweetsQueryParams} params The parameters needed for getting the tweets of a user
	 * @param  {number} params.userId The user ID of the tweets' poster
	 * @return {GetUserTweetsQueryParams} The query result containing the tweets of the user
	 * */
	get = async (params: GetUserTweetsQueryParams) => {
		let getTweetsQuery = this.formatter.format(
			`
			SELECT tweet.*, jsonb_agg(row_to_json("comments".*))  FILTER (WHERE "comments".id IS NOT NULL) AS comments
			FROM tweet
			LEFT JOIN (
				SELECT c1.*, jsonb_agg(row_to_json(c2.*)) FILTER (WHERE "c2".id IS NOT NULL) AS replies
				FROM "comment" c1
				LEFT JOIN "comment" c2 
				ON c1.id = c2.parent_id  
				WHERE c1.parent_id IS NULL
				GROUP BY c1.id
			) AS "comments" ON "tweet".id = "comments".tweet_id
			WHERE tweet.user_id = 1
			GROUP BY "tweet".id;
       `,
			params.userId,
		);
		let userTweets: GetUserTweetsQueryResult[] = await this.db.query(getTweetsQuery);
		return userTweets;
	};

	/**
	 * The repository function for posting a tweet
	 * @function
	 * @async
	 * @param  {PostUserTweetsQueryParams} params The parameters needed for posting a tweet
	 * @param  {number} params.userId The user ID of the tweet's poster
	 * @param  {number} params.content The content of the tweet
	 * @return {PostUserTweetsQueryResult} The query result
	 * */
	post = async (params: PostUserTweetsQueryParams) => {
		let postTweetQuery = this.formatter.format(
			`
			INSERT INTO "tweet" (user_id, "content", time) VALUES (%L, %L, NOW())
       `,
			params.userId,
			params.content,
		);
		await this.db.query(postTweetQuery);
		return true;
	};
}
