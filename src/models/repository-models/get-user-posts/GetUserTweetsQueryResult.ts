import { Tweet } from '../Tweet';
import { Comment } from '../Comment';

export type GetUserTweetsQueryResult = Tweet & {
	comments: Comment &
		{
			replies: Comment[];
		}[];
};
