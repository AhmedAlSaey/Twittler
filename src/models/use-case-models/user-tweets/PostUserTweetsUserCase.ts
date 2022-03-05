import { PostUserTweetsParams, PostUserTweetsDTO } from '../..';

export type PostUserTweetsUseCase = (params: PostUserTweetsParams) => Promise<PostUserTweetsDTO>;
