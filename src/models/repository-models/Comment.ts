export type Comment = {
	id: number;
	tweet_id: number;
	user_id: number;
	parent_id: number | null;
	content: string;
	time: Date;
};
