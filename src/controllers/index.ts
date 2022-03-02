import { makeGetUserTweetsController } from './GetUserTweetsController';
import { getVehicleIDFromSlugService } from '../user-cases';

let getVehicleIDFromSlugController = makeGetUserTweetsController(getVehicleIDFromSlugService);

export { getVehicleIDFromSlugController };
