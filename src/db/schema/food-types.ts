import {relations} from "drizzle-orm";
import {index, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

import {foods} from "./foods";

export let foodTypes = pgTable(
  "food_types",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 100}).notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    foodTypeNameIndex: index("food_type_name_index").on(table.name),
  })
);

export let foodTypeRelations = relations(foodTypes, ({many}) => ({
  foods: many(foods),
}));

export type FoodType = typeof foodTypes.$inferSelect; // return type when queried
export type NewFoodType = typeof foodTypes.$inferInsert; // insert type
