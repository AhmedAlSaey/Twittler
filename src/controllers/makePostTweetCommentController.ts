import { BaseError, BusinessStatusMessage, Controller, HTTPRequest, PostTweetCommentUseCase } from '../models';
import { formatError } from './helper/formatError';
import { refineResponse } from './helper/refineResponse';

/**
 * Constructor function for initializing a controller and its dependencies
 * @function
 * @async
 * @param  {PostTweetCommentUseCase} postTweetCommentUseCase The use case that is invoked to get the post a comment on a tweet
 * @return {Controller} The HTTP controller that is used to post a comment on a tweet
 * */
let makePostTweetCommentController = (postTweetCommentUseCase: PostTweetCommentUseCase) => {
	/**
	 * The controller HTTP conroller used to post a comment on a tweet
	 * @function
	 * @async
	 * @param  {HTTPRequest} httpRequest The HTTP request containing the parameters user by the use case
	 * @return {HTTPRequest} The HTTP controller that contains the output of he usecase
	 * */
	let postTweetCommentController: Controller = async (httpRequest: HTTPRequest) => {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			// Parameter validation
			type Body = {
				userId?: string;
				tweetId?: string;
				content?: string;
				parentId?: string;
			};
			let body: Body = Object.assign(httpRequest.body, { userId: httpRequest.params.userId });
			if (!body.userId) throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'Please insert a user ID');
			if (!body.tweetId) throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'Please insert a tweet ID');
			if (!body.content)
				throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'Please insert content for the tweet');
			if (!Number(body.userId))
				throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'User ID must be numeric');
			if (!Number(body.tweetId)) throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'Invalid tweet ID');
			if (body.parentId && !Number(body.parentId))
				throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'Invalid comment parent ID');
			if (typeof body.content != 'string')
				throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'Invalid content type');

			// Use case invocation
			await postTweetCommentUseCase({
				userId: Number(body.userId),
				tweetId: Number(body.tweetId),
				content: body.content,
				parentId: body.parentId ? Number(body.parentId) : undefined,
			});

			// Response return
			return {
				headers,
				statusCode: 200,
				body: refineResponse(BusinessStatusMessage.SUCCESS, 'Comment posted successfully'),
			};
		} catch (e) {
			// Error handling
			const error = e as Error;
			const httpError = formatError(error);
			return {
				headers,
				statusCode: httpError.statusCode,
				body: refineResponse(httpError.name, httpError.message),
			};
		}
	};
	return postTweetCommentController;
};

export { makePostTweetCommentController };
