import {relations} from "drizzle-orm";
import {index, integer, pgTable, timestamp} from "drizzle-orm/pg-core";

import {food} from "./food";
import {user} from "./user";

export let favoriteFood = pgTable(
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

export let favoriteFoodRelations = relations(favoriteFood, ({one}) => ({
  user: one(user, {
    fields: [favoriteFood.userId],
    references: [user.id],
  }),
  food: one(food, {
    fields: [favoriteFood.foodId],
    references: [food.id],
  }),
}));
