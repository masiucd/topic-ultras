import {relations} from "drizzle-orm";
import {pgTable, serial, timestamp, uniqueIndex, varchar} from "drizzle-orm/pg-core";
import {foodItems} from "./food-items";

export let foodCategories = pgTable(
	"food_categories",
	{
		id: serial("id").primaryKey().notNull(),
		name: varchar("name", {length: 100}).unique().notNull(),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(table) => ({
		nameIndex: uniqueIndex("food_category_name_index").on(table.name),
	}),
);

export let foodCategoryRelations = relations(foodCategories, ({many}) => ({
	// A food category can have many food items - one to many relationship
	foodItems: many(foodItems),
}));
