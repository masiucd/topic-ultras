import {relations} from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import {foodCategories} from "./food-categories";
import {foodItems} from "./food-items";

export let slugs = pgTable(
  "slugs",
  {
    id: serial("id").primaryKey().notNull(),
    objectId: integer("object_id").notNull(),
    slug: varchar("slug", {length: 100}).unique().notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "string"})
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (t) => [uniqueIndex("slug_index").on(t.slug)]
);

export let slugsRelations = relations(slugs, ({one}) => ({
  // A slug belongs to a food item - one to one relationship
  foodItem: one(foodItems, {
    fields: [slugs.objectId],
    references: [foodItems.id],
  }),
  // A slug belongs to a food category - one to one relationship
  foodCategory: one(foodCategories, {
    fields: [slugs.objectId],
    references: [foodCategories.id],
  }),
}));
