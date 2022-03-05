import { GetUserTweetsParams } from './GetUserTweetsParams';
import { GetUserTweetsDTO } from './GetUserTweetsDTO';

export type GetUserTweetsUseCase = (params: GetUserTweetsParams) => Promise<GetUserTweetsDTO[]>;
