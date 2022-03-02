import { Tweet } from '../Tweet';

export type GetUserTweetsQueryResult = Tweet & {
	comments: Comment &
		{
			replies: Comment[];
		}[];
};
