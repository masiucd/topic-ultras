import {relations} from "drizzle-orm";
import {index, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

import {nutrition} from "./nutrition";

export let food = pgTable(
  "foods",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 100}).notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    nameIndex: index("name_index").on(table.name),
  })
);

export let foodRelations = relations(food, ({one}) => ({
  nutritionFact: one(nutrition),
}));
