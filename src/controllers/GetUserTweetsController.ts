import { Controller, HTTPRequest } from '../models';
import { GetUserTweetsUseCase } from '../models';

let makeGetUserTweetsController = (getUserTweetsUseCase: GetUserTweetsUseCase) => {
	let getUserTweetsController: Controller = async (httpRequest: HTTPRequest) => {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			let userId = httpRequest.params.userId;
			if (!userId) throw new Error('Please insert a slug');
			if (!Number(userId)) throw new Error('User ID must be numeric');
			let userTweets = await getUserTweetsUseCase({ userId: userId });
			return {
				headers,
				statusCode: 200,
				body: userTweets,
			};
		} catch (e) {
			let error = e as Error;
			console.log(error);
			return {
				headers,
				statusCode: 400,
				body: {
					error: error.message,
				},
			};
		}
	};
	return getUserTweetsController;
};

export { makeGetUserTweetsController };
