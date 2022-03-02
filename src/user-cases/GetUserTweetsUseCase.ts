import { GetUserTweetsQueryRepository, GetUserTweetsUseCase } from '../models';

let makeGetUserTweetsUseCase = (getUserTweetsRepository: GetUserTweetsQueryRepository) => {
	let getUserTweetsUseCase: GetUserTweetsUseCase = async (params) => {
		let userTweetsResponse = await getUserTweetsRepository.get({
			userId: params.userId,
		});
		return userTweetsResponse;
	};
	return getUserTweetsUseCase;
};

export { makeGetUserTweetsUseCase };
