import {relations} from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {foodNutrients} from "./food-nutrients";
import {foodTypes} from "./food-types";

export let foods = pgTable(
  "foods",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 100}).notNull(),
    typeId: integer("type_id")
      .notNull()
      .references(() => foodTypes.id),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    foodNameIndex: index("food_name_index").on(table.name),
  })
);

export let foodRelations = relations(foods, ({one}) => ({
  nutritionFact: one(foodNutrients),
  foodType: one(foodTypes, {
    fields: [foods.typeId],
    references: [foodTypes.id],
  }),
}));
