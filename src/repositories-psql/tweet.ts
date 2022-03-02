import {
	Database,
	Formatter,
	GetUserTweetsQueryParams,
	GetUserTweetsQueryRepository,
	GetUserTweetsQueryResult,
} from '../models';

export class UserTweetsRepository implements GetUserTweetsQueryRepository {
	constructor(private readonly db: Database, private readonly formatter: Formatter) {}
	get = async (params: GetUserTweetsQueryParams) => {
		let selectionLevelQuery = this.formatter.format(
			`
		SELECT tweet.*, jsonb_agg(row_to_json("comments")) 
		FROM tweet
		JOIN (
			SELECT c1.*, jsonb_agg(row_to_json(c2.*)) AS replies
			FROM "comment" c1
			LEFT JOIN "comment" c2 
			ON c1.id = c2.id 
			GROUP BY c1.id
		) AS "comments" ON "tweet".id = "comments".tweet_id
		WHERE tweet.user_id = %L
		GROUP BY "tweet".id 
       `,
			params.userId,
		);
		let userTweets: GetUserTweetsQueryResult[] = await this.db.query(selectionLevelQuery);
		return userTweets;
	};
}
