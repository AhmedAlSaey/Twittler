import { PostTweetCommentDTO, PostTweetCommentParams } from '../..';

export type PostTweetCommentUseCase = (params: PostTweetCommentParams) => Promise<PostTweetCommentDTO>;
