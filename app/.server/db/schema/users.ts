import {pgTable, serial, timestamp, uniqueIndex, varchar} from "drizzle-orm/pg-core";

export let users = pgTable(
	"users",
	{
		id: serial("id").primaryKey().notNull(),
		firstName: varchar("first_name", {length: 100}),
		lastName: varchar("last_name", {length: 100}),
		email: varchar("email", {length: 120}).notNull(),
		password: varchar("password", {length: 200}).notNull(),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(table) => ({
		emailIndex: uniqueIndex("user_email_index").on(table.email),
	}),
);
