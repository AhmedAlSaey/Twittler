import { Tweet } from '../repository-models/Tweet';
import { Comment } from '../repository-models/Comment';

export type GetUserTweetsDTO = Tweet & {
	comments: Comment &
		{
			replies: Comment[];
		}[];
};
