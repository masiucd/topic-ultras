import {relations} from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import {favoriteFoods} from "./favorite-foods";
import {foodCategories} from "./food-categories";
import {foodNutrients} from "./food-nutrients";
import {users} from "./users";

export let foodType = pgEnum("food_type", [
  "FRUIT",
  "VEGETABLE",
  "GRAIN",
  "PROTEIN",
  "DAIRY",
  "LEGUME",
  "NUT",
  "SEED",
  "SPICE",
  "OTHER",
]);

export let foodItems = pgTable(
  "food_items",
  {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => users.id), // A user can create a food item
    name: varchar("name", {length: 100}).unique().notNull(),
    description: text("description"),
    foodType: foodType("food_type").default("OTHER"),
    foodCategoryId: integer("food_category_id")
      .references(() => foodCategories.id, {onDelete: "cascade"})
      .notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "string"})
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => ({
    foodNameIndex: uniqueIndex("food_name_index").on(table.name),
  })
);

// One to one relationship with food nutrients - one food item has one food nutrient
export let foodItemsRelations = relations(foodItems, ({one, many}) => ({
  foodNutrients: one(foodNutrients, {
    fields: [foodItems.id],
    references: [foodNutrients.foodId],
  }),
  user: one(users, {
    fields: [foodItems.userId],
    references: [users.id],
  }),
  favoriteFoods: many(favoriteFoods),
  // One to one relationship with food categories - one food item has one food category
  foodCategory: one(foodCategories, {
    fields: [foodItems.foodCategoryId],
    references: [foodCategories.id],
  }),
}));
