import {relations} from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import {foodCategories} from "./food-categories";
import {users} from "./users";

export let foodItems = pgTable(
	"food_items",
	{
		id: serial("id").primaryKey().notNull(),
		userId: integer("user_id").references(() => users.id),
		foodCategoryId: integer("food_category_id").references(() => foodCategories.id, {
			onDelete: "cascade",
		}),
		name: varchar("name", {length: 100}).notNull(),
		description: text("description"),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(t) => [uniqueIndex("food_item_name_index").on(t.name)],
);

export let foodItemRelations = relations(foodItems, ({one}) => ({
	// A food item belongs to a food category - one to one relationship
	foodCategory: one(foodCategories, {
		fields: [foodItems.foodCategoryId],
		references: [foodCategories.id],
	}),
	// A food item belongs to a user - one to one relationship
	users: one(users, {fields: [foodItems.userId], references: [users.id]}),
}));
