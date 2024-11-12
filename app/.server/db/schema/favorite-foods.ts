import {relations} from "drizzle-orm";
import {integer, pgTable, primaryKey, timestamp} from "drizzle-orm/pg-core";
import {foodItems} from "./food-items";
import {users} from "./users";

export let favoriteFoods = pgTable(
	"favorite_foods",
	{
		userId: integer("user_id")
			.primaryKey()
			.references(() => users.id)
			.notNull(),
		foodItemId: integer("food_item_id")
			.references(() => foodItems.id)
			.notNull(),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(t) => [
		primaryKey({columns: [t.userId, t.foodItemId]}),
		primaryKey({
			columns: [t.userId, t.foodItemId],
			name: "user_food_item_pk",
		}),
	],
);

export let favoriteFoodsRelations = relations(favoriteFoods, ({one}) => ({
	// A favorite food belongs to a user - one to one relationship
	users: one(users, {fields: [favoriteFoods.userId], references: [users.id]}),
	// A favorite food belongs to a food item - one to one relationship
	foodItems: one(foodItems, {
		fields: [favoriteFoods.foodItemId],
		references: [foodItems.id],
	}),
}));
