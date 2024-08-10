import {relations} from "drizzle-orm";
import {index, integer, pgTable, timestamp} from "drizzle-orm/pg-core";

import {foods} from "./foods";
import {users} from "./users";

export let favoriteFoods = pgTable(
  "favorite_foods",
  {
    userId: integer("user_id").notNull(),
    foodId: integer("food_id").notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    userIndex: index("user_index").on(table.userId),
    foodIndex: index("food_index").on(table.foodId),
  })
);

export let favoriteFoodRelations = relations(favoriteFoods, ({one}) => ({
  user: one(users, {
    fields: [favoriteFoods.userId],
    references: [users.id],
  }),
  food: one(foods, {
    fields: [favoriteFoods.foodId],
    references: [foods.id],
  }),
}));

export type FavoriteFood = typeof favoriteFoods.$inferSelect; // return type when queried
export type NewFavoriteFood = typeof favoriteFoods.$inferInsert; // insert type
