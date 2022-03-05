import { UserTweetsRepository } from './UserTweetsRepository';
import { TweetCommentRepository } from './TweetCommentsRepository';
import { Pool } from 'pg';
import { Database, Formatter } from '../models';
import pgFormat from 'pg-format';

/**
 * Function that creates a postgres database that is injected to the usecases
 * @function
 * @async
 * @return {Database} The postgres database user by the usecases
 * */
let createDatabase: () => Database = () => {
	// Db config from the environment variables
	const env = process.env;
	const config = {
		db: {
			host: env.DB_HOST,
			port: Number(env.DB_PORT),
			user: env.DB_USER,
			password: env.DB_PASSWORD,
			database: env.DB_NAME,
		},
		listPerPage: env.LIST_PER_PAGE || 10,
	};

	// Initialize connection pool
	const pool = new Pool(config.db);

	// Create the database class
	class PgDatabase implements Database {
		initialized: boolean = false;
		// The query function used by the usecases
		query = async (query: string, ...params: string[]) => {
			// If this is the first query done by the user, the database schema will be initialized from the below
			// query. This is done for the convenience of the user of this repository
			if (!this.initialized) {
				this.initialized = true;
				await pool.query(
					`
					-- Initialize DB schema
					CREATE TABLE IF NOT EXISTS "user" (
						id SERIAL,
						name TEXT NOT NULL,
						email TEXT NOT NULL UNIQUE,
						password TEXT NOT NULL,
						PRIMARY KEY(id)
					);

					CREATE INDEX IF NOT EXISTS user_id_idx ON "user" USING btree (id);

					CREATE TABLE IF NOT EXISTS "tweet" (
						id SERIAL,
						user_id integer NOT NULL,
						content varchar (140) NOT NULL,
						time timestamp NOT NULL,
						PRIMARY KEY(id),
						CONSTRAINT fk_tweet_user
						FOREIGN KEY(user_id)
							REFERENCES "user"(id)
					);

					CREATE INDEX IF NOT EXISTS tweet_id_idx ON tweet  USING btree (id);

				CREATE TABLE IF NOT EXISTS comment(
					id SERIAL,
					tweet_id integer NOT NULL,
					user_id integer NOT NULL,
					parent_id integer,
					content TEXT NOT NULL,
					time timestamp NOT NULL,
					PRIMARY KEY(id),
					CONSTRAINT fk_comment_tweet
					FOREIGN KEY(tweet_id)
						REFERENCES tweet(id),
					CONSTRAINT fk_comment_user
					FOREIGN KEY(user_id)
						REFERENCES "user"(id),
					CONSTRAINT fk_parent_id
						FOREIGN KEY(parent_id)
							REFERENCES comment(id)
				);

					CREATE INDEX IF NOT EXISTS comment_id_idx ON comment USING btree (id);
					CREATE INDEX IF NOT EXISTS comment_parent_id_idx ON comment USING btree (parent_id);

					-- Insert dummy users for API testing
					INSERT INTO "user" (name, email, password) VALUES ('Ahmed AlSaey', 'ahmed.alsaey@icloud.com', 'ddb50980c1cfa79ba390df2de20c17c0') ON CONFLICT (email) DO NOTHING;
					INSERT INTO "user" (name, email, password) VALUES ('Nour Hussein', 'nour.hussein@gameball.co', 'cac5cae88f3d031ef49fbff769aa1d53') ON CONFLICT (email) DO NOTHING;
					`,
				);
			}
			// Normal query execution
			const { rows } = await pool.query(query, params);
			if (rows) {
				return rows;
			}
			return [];
		};
	}
	return new PgDatabase();
};

/**
 * Function that formats the query and escapes any malicious keywords
 * @function
 * @async
 * @return {Formatter} The postgres formatter that filters out query input
 * */
let createFormatter: () => Formatter = () => {
	return {
		// Formatter function that escapes the query parameters
		format: (query: string, ...params: any[]) => {
			let newQuery = pgFormat(query, ...params);
			return newQuery;
		},
	};
};
// Dependency initialization
let database = createDatabase();
let formatter = createFormatter();

// Repository creation
let userTweetsRepository = new UserTweetsRepository(database, formatter);
let tweetCommentRepository = new TweetCommentRepository(database, formatter);

// Repository exportation
export { userTweetsRepository, tweetCommentRepository };
