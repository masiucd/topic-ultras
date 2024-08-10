import {relations} from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

import {foods} from "./foods";

// Everything is based on grams
export let foodNutrients = pgTable("food_nutrients", {
  id: serial("id").primaryKey().notNull(),
  foodId: integer("food_id")
    .references(() => foods.id)
    .notNull(),
  calories: numeric("calories", {precision: 12, scale: 2}).notNull(), // kcal/100g
  fat: numeric("fat", {precision: 12, scale: 2}).notNull(),
  protein: numeric("protein", {precision: 12, scale: 2}).notNull(),
  carbs: numeric("carbs", {precision: 12, scale: 2}).notNull(),
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
});

export let foodNutritionRelations = relations(foodNutrients, ({one}) => ({
  food: one(foods, {
    fields: [foodNutrients.foodId],
    references: [foods.id],
  }),
}));

export type FoodNutrient = typeof foodNutrients.$inferSelect; // return type when queried
export type NewFoodNutrient = typeof foodNutrients.$inferInsert; // insert type
