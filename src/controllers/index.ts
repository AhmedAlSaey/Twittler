import { makeGetUserTweetsController } from './makeGetUserTweetsController';
import { makePostUserTweetsController } from './makePostUserTweetsController';
import { makePostTweetCommentController } from './makePostTweetCommentController';
import { getUserTweetsUseCase, postUserTweetsUseCase, postTweetCommentUseCase } from '../user-cases';

// Initializeing controllers by injecting their use case dependencies
let getUserTweetsController = makeGetUserTweetsController(getUserTweetsUseCase);
let postUserTweetsController = makePostUserTweetsController(postUserTweetsUseCase);
let postTweetCommentController = makePostTweetCommentController(postTweetCommentUseCase);

// Export controllers
export { getUserTweetsController, postUserTweetsController, postTweetCommentController };
