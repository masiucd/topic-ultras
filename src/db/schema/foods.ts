import {relations} from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {foodNutrients} from "./food-nutrients";

let foodTypeEnum = pgEnum("food_type", [
  "FRUIT",
  "VEGETABLE",
  "MEAT",
  "DAIRY",
  "GRAIN",
  "NUT",
  "SEED",
  "OIL",
  "FAT",
  "SUGAR",
  "SPICE",
  "FISH",
  "BEVERAGE",
  "ALCOHOL",
  "OTHER",
]);

export type FoodType = (typeof foodTypeEnum)["enumValues"][number];

export let foods = pgTable(
  "foods",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 100}).notNull(),
    type: foodTypeEnum("food_type").default("OTHER").notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    nameIndex: index("name_index").on(table.name),
  })
);

export let foodRelations = relations(foods, ({one}) => ({
  nutritionFact: one(foodNutrients),
}));
