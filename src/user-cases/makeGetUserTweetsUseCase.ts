import { UserTweetsRepositoryIf, GetUserTweetsUseCase, GetUserTweetsDTO, GetUserTweetsParams } from '../models';

/**
 * Constructor function for initializing the usecase and its dependencies
 * @function
 * @async
 * @param  {UserTweetsRepositoryIf} getUserTweetsRepository The user tweets repository used by the usecase, passed as an
 * 		injected dependency
 * @return {GetUserTweetsUseCase} The usecase for getting the user tweets
 * */
let makeGetUserTweetsUseCase = (getUserTweetsRepository: UserTweetsRepositoryIf) => {
	/**
	 * Use case for getting the tweets of the user
	 * @function
	 * @async
	 * @param  {GetUserTweetsParams} params The user tweets repository used by the usecase, passed as an
	 * 		injected dependency
	 * @param  {number} params.userId The user tweets repository used by the usecase, passed as an
	 * @return {GetUserTweetsDTO[]} The requested tweets for the user
	 * */
	let getUserTweetsUseCase: GetUserTweetsUseCase = async (params) => {
		// Use case invocation
		let userTweetsResponse = await getUserTweetsRepository.get({
			userId: params.userId,
		});
		// DTO return
		return userTweetsResponse;
	};
	return getUserTweetsUseCase;
};

export { makeGetUserTweetsUseCase };
