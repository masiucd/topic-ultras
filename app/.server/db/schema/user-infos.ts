import {relations} from "drizzle-orm";
import {integer, pgEnum, pgTable} from "drizzle-orm/pg-core";
import {users} from "./users";

export let genderEnum = pgEnum("gender", ["male", "female"]);
export let userInfos = pgTable("user_infos", {
	id: integer("id")
		.primaryKey()
		.references(() => users.id)
		.notNull(),
	height: integer("height"),
	weight: integer("weight"),
	age: integer("age"),
	gender: genderEnum(),
});

export let userInfosRelations = relations(userInfos, ({one}) => ({
	// A user info belongs to a user - one to one relationship
	users: one(users, {fields: [userInfos.id], references: [users.id]}),
}));
