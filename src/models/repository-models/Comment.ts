export type Comment = {
	id: number;
	tweetId: number;
	userId: number;
	parentId: number;
	content: string;
	time: Date;
};
