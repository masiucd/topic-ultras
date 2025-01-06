import "server-only";
import {relations} from "drizzle-orm";
import {
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import {foodItems} from "./food-items";

export let foodNutrients = pgTable("food_nutrients", {
  id: serial("id").primaryKey().notNull(),
  foodId: integer("food_id").references(() => foodItems.id),
  calories: decimal("calories", {precision: 10, scale: 2}),
  protein: decimal("protein", {precision: 10, scale: 2}),
  fat: decimal("fat", {precision: 10, scale: 2}),
  carbs: decimal("carbs", {precision: 10, scale: 2}),
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  updatedAt: timestamp("updated_at", {mode: "string"})
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export let foodNutrientsRelations = relations(foodNutrients, ({one}) => ({
  // A food nutrition belongs to a food item - one to one relationship
  foodItem: one(foodItems, {
    fields: [foodNutrients.foodId],
    references: [foodItems.id],
  }),
}));
