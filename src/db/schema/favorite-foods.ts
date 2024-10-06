import {relations} from "drizzle-orm";
import {integer, pgTable, serial, timestamp} from "drizzle-orm/pg-core";
import {foodItems} from "./food-items";
import {users} from "./users";

export let favoriteFoods = pgTable("favorite_foods", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  foodId: integer("food_id")
    .references(() => foodItems.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  updatedAt: timestamp("updated_at", {mode: "string"})
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export let favoriteFoodsRelations = relations(favoriteFoods, ({one}) => ({
  // One to one relationship with users - favorite foods belong to a user
  user: one(users, {
    fields: [favoriteFoods.userId],
    references: [users.id],
  }),
  // One to one relationship with food items - favorite foods belong to a food item
  food: one(foodItems, {
    fields: [favoriteFoods.foodId],
    references: [foodItems.id],
  }),
}));
