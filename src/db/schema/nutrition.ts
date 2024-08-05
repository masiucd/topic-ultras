import {
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

import {food} from "./food";

export let nutrition = pgTable("nutritions", {
  id: serial("id").primaryKey().notNull(),
  foodId: integer("food_id")
    .notNull()
    .references(() => food.id),
  calories: decimal("calories", {precision: 5, scale: 2}).notNull(),
  fat: decimal("fat", {precision: 5, scale: 2}).notNull(),
  protein: decimal("protein", {precision: 5, scale: 2}).notNull(),
  carbs: decimal("carbs", {precision: 5, scale: 2}).notNull(),
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
});
