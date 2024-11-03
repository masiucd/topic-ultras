// import {relations} from "drizzle-orm";
import {relations} from "drizzle-orm";
import {index, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {favoriteFoods} from "./favorite-foods";
import {foodItems} from "./food-items";

export let users = pgTable(
	"users",
	{
		id: serial("id").primaryKey().notNull(),
		username: varchar("username", {length: 100}).notNull().unique(),
		firstName: varchar("first_name", {length: 100}),
		lastName: varchar("last_name", {length: 100}),
		email: varchar("email", {length: 200}).notNull().unique(),
		password: varchar("password", {length: 200}).notNull(),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(table) => ({
		emailIndex: index("email_index").on(table.email),
	}),
);

// One to many relationship with food items - one user can have many food items
export let usersRelations = relations(users, ({many}) => ({
	foodItems: many(foodItems),
	favoriteFoods: many(favoriteFoods),
}));
