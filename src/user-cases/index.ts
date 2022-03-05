import { makeGetUserTweetsUseCase } from './makeGetUserTweetsUseCase';
import { makePostUserTweetsUseCase } from './makePostUserTweetsUseCase';
import { makePostTweetCommentUseCase } from './makePostTweetCommentUseCase';
import { tweetCommentRepository, userTweetsRepository } from '../repositories-psql';

// Initializing usercases by injecting their dependencies
let getUserTweetsUseCase = makeGetUserTweetsUseCase(userTweetsRepository);
let postUserTweetsUseCase = makePostUserTweetsUseCase(userTweetsRepository);
let postTweetCommentUseCase = makePostTweetCommentUseCase(tweetCommentRepository);

export { getUserTweetsUseCase, postUserTweetsUseCase, postTweetCommentUseCase };
