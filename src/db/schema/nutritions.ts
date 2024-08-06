import {relations} from "drizzle-orm";
import {
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

import {foods} from "./foods";

// Everything is based on grams
export let nutritions = pgTable("nutritions", {
  id: serial("id").primaryKey().notNull(),
  foodId: integer("food_id")
    .notNull()
    .references(() => foods.id),
  calories: decimal("calories", {precision: 5, scale: 2}).notNull(), // kcal/100g
  fat: decimal("fat", {precision: 5, scale: 2}).notNull(),
  protein: decimal("protein", {precision: 5, scale: 2}).notNull(),
  carbs: decimal("carbs", {precision: 5, scale: 2}).notNull(),
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
});

export let nutritionRelations = relations(nutritions, ({one}) => ({
  food: one(foods, {
    fields: [nutritions.foodId],
    references: [foods.id],
  }),
}));
