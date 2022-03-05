import { BaseError, BusinessStatusMessage, Controller, HTTPRequest, PostUserTweetsUseCase } from '../models';
import { formatError } from './helper/formatError';
import { refineResponse } from './helper/refineResponse';

/**
 * Constructor function for initializing a controller and its dependencies
 * @function
 * @async
 * @param  {PostUserTweetsUseCase} postUserTweetsUseCase The use case that is invoked to get the post a tweet
 * @return {Controller} The HTTP controller that is used to post a tweet
 * */
let makePostUserTweetsController = (postUserTweetsUseCase: PostUserTweetsUseCase) => {
	/**
	 * The controller HTTP conroller used to post a tweet
	 * @function
	 * @async
	 * @param  {HTTPRequest} httpRequest The HTTP request containing the parameters user by the use case
	 * @return {HTTPRequest} The HTTP controller that contains the output of he usecase
	 * */
	let postUserTweetsController: Controller = async (httpRequest: HTTPRequest) => {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			// Parameter validation
			type Body = {
				userId?: number;
				content?: string;
			};
			let body: Body = Object.assign(httpRequest.body, { userId: httpRequest.params.userId });
			if (!body.userId) throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'Please insert a user ID');
			if (!body.content)
				throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'Please insert content for the tweet');
			if (!Number(body.userId))
				throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'User ID must be numeric');
			if (typeof body.content != 'string')
				throw new BaseError(BusinessStatusMessage.INVALID_PARAMETER, true, 'Invalid content type');

			// Use case invocation
			await postUserTweetsUseCase({
				userId: Number(body.userId),
				content: body.content,
			});

			// Response return
			return {
				headers,
				statusCode: 200,
				body: refineResponse(BusinessStatusMessage.SUCCESS, 'Tweet posted successfully'),
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
	return postUserTweetsController;
};

export { makePostUserTweetsController };
