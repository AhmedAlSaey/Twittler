import {
	TweetCommentsRepositoryIf,
	PostTweetCommentUseCase,
	PostTweetCommentParams,
	PostTweetCommentDTO,
	BaseError,
	BusinessStatusMessage,
} from '../models';

/**
 * Constructor function for initializing the usecase and its dependencies
 * @function
 * @async
 * @param  {TweetCommentsRepositoryIf} tweetCommentRepository The tweet comment repository used by the usecase
 * @return {PostTweetCommentUseCase} The usecase for posting a tweet's comment
 * */
let makePostTweetCommentUseCase = (tweetCommentRepository: TweetCommentsRepositoryIf) => {
	/**
	 * Use case for posting a comment on a tweet
	 * @function
	 * @async
	 * @param  {PostTweetCommentParams} params The parameters for posting a comment on a tweet
	 * @param  {number} params.userId The user ID for the commenting user
	 * @param  {number} params.tweetId The tweet ID that the comment falls under
	 * @param  {number} params.parentId The parent comment ID that the comment is nested under
	 * @param  {number} params.content The content of the comment
	 * @return {PostTweetCommentDTO} The result of the operation
	 * */
	let postTweetCommentUseCase: PostTweetCommentUseCase = async (params) => {
		// Parameter validation
		if (!(params.content.length > 0 && params.content.length <= 140))
			throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'Invalid comment length');

		// Data fetching
		let postComment = await tweetCommentRepository.post({
			userId: params.userId,
			content: params.content,
			parentId: params.parentId,
			tweetId: params.tweetId,
		});

		// DTO return
		return postComment;
	};
	return postTweetCommentUseCase;
};

export { makePostTweetCommentUseCase };
