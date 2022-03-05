import { UserTweetsRepositoryIf, PostUserTweetsUseCase, BusinessStatusMessage, BaseError } from '../models';

/**
 * Constructor function for initializing the usecase and its dependencies
 * @function
 * @async
 * @param  {UserTweetsRepositoryIf} userTweetsRepository The repository that the usecase uses for posting a tweet
 * @return {PostUserTweetsUseCase} The usecase for posting a tweet
 * */
let makePostUserTweetsUseCase = (userTweetsRepository: UserTweetsRepositoryIf) => {
	/**
	 * Use case for posting a comment on a tweet
	 * @function
	 * @async
	 * @param  {PostUserTweetsParams} params The parameters for posting a tweet
	 * @param  {number} params.userId The user ID for the tweet's posting user
	 * @param  {number} params.content The content of the tweet
	 * @return {PostUserTweetsDTO} The result of the operation
	 * */
	let postUserTweetsUseCase: PostUserTweetsUseCase = async (params) => {
		// Parameter validation
		if (!(params.content.length > 0 && params.content.length <= 140))
			throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'Invalid tweet length');

		// Data fetching
		let postTweetResponse = await userTweetsRepository.post({
			userId: params.userId,
			content: params.content,
		});
		return postTweetResponse;
	};
	return postUserTweetsUseCase;
};

export { makePostUserTweetsUseCase };
