import {drizzle} from "drizzle-orm/postgres-js";
import {env} from "env";
import postgres from "postgres";

import * as schema from "./schema";

export let connection = postgres(env.DB_URL, {
	max: env.DB_MIGRATION || env.DB_SEED ? 1 : undefined, // Limit the number of connections to 1 during migrations and seeding
	// eslint-disable-next-line no-console
	onnotice: env.DB_SEED ? console.log : undefined, // Log notices during seeding
});

export let db = drizzle(connection, {
	schema, // All tables will be added to the schema
	logger: env.NODE_ENV === "development", // Log all queries in development
});

export type DB = typeof db;
export type Schema = typeof schema;
