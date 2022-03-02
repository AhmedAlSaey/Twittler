import { makeGetUserTweetsUseCase } from './GetUserTweetsUseCase';
import { userTweetsRepository } from '../repositories-psql';

let getVehicleIDFromSlugService = makeGetUserTweetsUseCase(userTweetsRepository);

export { getVehicleIDFromSlugService };
