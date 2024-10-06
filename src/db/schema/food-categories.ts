import {relations} from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import {foodItems} from "./food-items";

export let foodCategories = pgTable(
  "food_categories",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 100}).unique().notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "string"})
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => ({
    foodCategoryNameIndex: uniqueIndex("food_category_name_index").on(
      table.name
    ),
  })
);

export let foodCategoriesRelations = relations(foodCategories, ({many}) => ({
  // One to many relationship with food items - a food category can have many food items
  foodItems: many(foodItems),
}));
