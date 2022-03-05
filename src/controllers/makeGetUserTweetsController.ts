import {
	Controller,
	HTTPRequest,
	GetUserTweetsUseCase,
	BaseError,
	BusinessStatusMessage,
	HTTPStatusCode,
} from '../models';
import { formatError } from './helper/formatError';
import { refineResponse } from './helper/refineResponse';

/**
 * Constructor function for initializing a controller and its dependencies
 * @function
 * @async
 * @param  {GetUserTweetsUseCase} getUserTweetsUseCase The use case that is invoked to get the tweets of a user
 * @return {Controller} The HTTP controller that is used to get the tweets of a user
 * */
let makeGetUserTweetsController = (getUserTweetsUseCase: GetUserTweetsUseCase) => {
	/**
	 * The controller HTTP conroller used to get the the tweets of a user
	 * @function
	 * @async
	 * @param  {HTTPRequest} httpRequest The HTTP request containing the parameters user by the use case
	 * @return {HTTPRequest} The HTTP controller that contains the output of he usecase
	 * */
	let getUserTweetsController: Controller = async (httpRequest: HTTPRequest) => {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			// Parameter validation
			let userId = httpRequest.params.userId;
			if (!userId) throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'Please insert a user ID');
			if (!Number(userId))
				throw new BaseError(BusinessStatusMessage.MISSING_PARAMETER, true, 'User ID must be numeric');

			// Use case invocation
			let userTweets = await getUserTweetsUseCase({ userId: userId });

			// Response return
			return {
				headers,
				statusCode: HTTPStatusCode.OK,
				body: refineResponse(BusinessStatusMessage.SUCCESS, 'Here are the list of user Tweets', userTweets),
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
	return getUserTweetsController;
};

export { makeGetUserTweetsController };
