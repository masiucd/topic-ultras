import {relations} from "drizzle-orm";
import {integer, numeric, pgTable, timestamp} from "drizzle-orm/pg-core";

import {foods} from "./foods";

// Everything is based on grams
export let foodNutrients = pgTable("food_nutrients", {
  // foodId is a foreign key to foods.id and a primary key since a foodItem must have a nutrition fact
  foodId: integer("food_id")
    .references(() => foods.id)
    .primaryKey()
    .notNull(),
  calories: numeric("calories", {precision: 12, scale: 2}).notNull(), // kcal/100g
  fat: numeric("fat", {precision: 12, scale: 2}).notNull(),
  // TODO
  // saturatedFat: numeric("saturated_fat", {precision: 12, scale: 2}).notNull(),
  // transFat: numeric("trans_fat", {precision: 12, scale: 2}).notNull(),

  protein: numeric("protein", {precision: 12, scale: 2}).notNull(),
  carbs: numeric("carbs", {precision: 12, scale: 2}).notNull(),
  // TODO
  // fiber: numeric("fiber", {precision: 12, scale: 2}).notNull(),
  // sugars: numeric("sugars", {precision: 12, scale: 2}).notNull(),

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
