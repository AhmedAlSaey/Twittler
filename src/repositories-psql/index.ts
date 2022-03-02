import { UserTweetsRepository } from './UserTweetsRepository';
import { Pool } from 'pg';
import { Database, Formatter } from '../models';
var pgFormat = require('pg-format');

let createDatabase: () => Promise<Database> = async () => {
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
	const pool = new Pool(config.db);
	await initializeDatabase(pool);
	return {
		query: async (query: string, ...params: string[]) => {
			const { rows } = await pool.query(query, params);
			if (rows) {
				return rows;
			}
			return [];
		},
	};
};

let initializeDatabase = async (pool: Pool) => {
	let schemaDDL = `
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
        parent_id integer UNIQUE NOT NULL,
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
            REFERENCES comment(parent_id)
    );

    CREATE INDEX IF NOT EXISTS comment_id_idx ON comment USING btree (id);
    CREATE INDEX IF NOT EXISTS comment_parent_id_idx ON comment USING btree (parent_id);

    -- Insert dummy users for API testing
    INSERT INTO "user" (name, email, password) VALUES ('Ahmed AlSaey', 'ahmed.alsaey@icloud.com', 'ddb50980c1cfa79ba390df2de20c17c0') ON CONFLICT (email) DO NOTHING;
    INSERT INTO "user" (name, email, password) VALUES ('Nour Hussein', 'nour.hussein@gameball.co', 'cac5cae88f3d031ef49fbff769aa1d53') ON CONFLICT (email) DO NOTHING;
    `;
	await pool.query(schemaDDL);
};

let createFormatter: () => Formatter = () => {
	return {
		format: (query: string, ...params: string[]) => {
			let newQuery = pgFormat(query, params);
			return newQuery;
		},
	};
};

let userTweetsRepository = new UserTweetsRepository(await createDatabase(), createFormatter());

export { userTweetsRepository };
