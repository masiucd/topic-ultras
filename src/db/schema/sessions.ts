import {relations} from "drizzle-orm";
import {integer, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

import {users} from "./users";

// TODO delete this table
export let sessions = pgTable("sessions", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	token: varchar("token", {length: 250}).notNull(),
	createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
	expiresAt: timestamp("expires_at", {mode: "string"}).notNull(),
});

export let sessionRelations = relations(sessions, ({one}) => ({
	user: one(users),
}));
