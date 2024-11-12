import {relations} from "drizzle-orm";
import {index, integer, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {users} from "./users";

export let sessions = pgTable(
	"sessions",
	{
		id: serial("id").primaryKey().notNull(),
		user_id: integer("user_id").references(() => users.id),
		token: varchar("token", {length: 255}),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(t) => [
		index("sessions_user_id_index").on(t.user_id),
		index("sessions_token_index").on(t.token),
	],
);

export let sessionsRelations = relations(sessions, ({one}) => ({
	// A session belongs to a user - one to one relationship
	users: one(users, {fields: [sessions.user_id], references: [users.id]}),
}));
