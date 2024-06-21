import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export let foods = sqliteTable("foods", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  servingSize: text("serving_size").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => foodCategories.id),
});

export let nutritionFacts = sqliteTable("nutrition_facts", {
  id: integer("id").primaryKey().notNull(),
  foodId: integer("food_id")
    .notNull()
    .references(() => foods.id),
  calories: text("calories").notNull(),
  protein: text("protein").notNull(),
  fat: text("fat").notNull(),
  carbohydrates: text("carbohydrates").notNull(),
  fiber: text("fiber").notNull(),
  sugar: text("sugar").notNull(),
  sodium: text("sodium").notNull(),
  vitaminA: text("vitamin_a"),
  vitaminC: text("vitamin_c"),
  calcium: text("calcium"),
  iron: text("iron"),
});

export let foodCategories = sqliteTable("food_categories", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
});

export let insertFoodSchema = createInsertSchema(foods);
export let selectFoodSchema = createSelectSchema(foods);

export let insertNutritionFactsSchema = createInsertSchema(nutritionFacts);
export let selectNutritionFactsSchema = createSelectSchema(nutritionFacts);

export let insertFoodCategorySchema = createInsertSchema(foodCategories);
export let selectFoodCategorySchema = createSelectSchema(foodCategories);

export type Food = z.infer<typeof insertFoodSchema>;
export type SelectFood = z.infer<typeof selectFoodSchema>;

export type NutritionFacts = z.infer<typeof insertNutritionFactsSchema>;
export type SelectNutritionFacts = z.infer<typeof selectNutritionFactsSchema>;

export type FoodCategory = z.infer<typeof insertFoodCategorySchema>;
export type SelectFoodCategory = z.infer<typeof selectFoodCategorySchema>;
