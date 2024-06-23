import {
  index,
  integer,
  sqliteTable,
  text,
  numeric,
} from "drizzle-orm/sqlite-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export let foods = sqliteTable(
  "foods",
  {
    foodId: integer("food_id").primaryKey({autoIncrement: true}).notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
  },
  (table) => ({
    foodNameIdx: index("food_name_idx").on(table.name),
  }),
);

// -- Everything is in grams per 100 grams of food
export let foodNutations = sqliteTable("food_nutrition", {
  id: integer("id").primaryKey({autoIncrement: true}).notNull(),
  calories: numeric("calories").notNull(),
  protein: numeric("protein").notNull(),
  fat: numeric("fat").notNull(),
  carbohydrates: numeric("carbohydrates").notNull(),
  foodId: integer("food_id")
    .notNull()
    .references(() => foods.foodId),
});

let insertFoodSchema = createInsertSchema(foods);
let selectFoodSchema = createSelectSchema(foods);

export type Food = z.infer<typeof insertFoodSchema>;
export type SelectFood = z.infer<typeof selectFoodSchema>;

let insertFoodNutritionSchema = createInsertSchema(foodNutations);
let selectFoodNutritionSchema = createSelectSchema(foodNutations);

export type FoodNutrition = z.infer<typeof insertFoodNutritionSchema>;
export type SelectFoodNutrition = z.infer<typeof selectFoodNutritionSchema>;

// export let nutrients = sqliteTable("nutrients", {
//   nutrientId: integer("nutrient_id")
//     .primaryKey({autoIncrement: true})
//     .notNull(),
//   name: text("name").notNull(),
// });

// export let units = sqliteTable("units", {
//   unitId: integer("unit_id").primaryKey({autoIncrement: true}).notNull(),
//   name: text("name").notNull(),
//   conversionFactor: text("conversion_factor").notNull(),
// });

// export let foodNutrients = sqliteTable(
//   "food_nutrients",
//   {
//     id: integer("id").primaryKey({autoIncrement: true}).notNull(),
//     foodId: integer("food_id")
//       .notNull()
//       .references(() => foods.foodId),
//     nutrientId: integer("nutrient_id")
//       .notNull()
//       .references(() => nutrients.nutrientId),
//     unitId: integer("unit_id")
//       .notNull()
//       .references(() => units.unitId),
//     amount: numeric("amount").notNull(),
//   },
//   (table) => {
//     return {
//       foodIdx: index("food_idx").on(table.foodId),
//       nutrientIdx: index("nutrient_idx").on(table.nutrientId),
//       unitIdx: index("unit_idx").on(table.unitId),
//     };
//   },
// );

// export let foods = sqliteTable("foods", {
//   id: integer("id").primaryKey().notNull(),
//   name: text("name").notNull(),
//   servingSize: text("serving_size").notNull(),
//   categoryId: integer("category_id")
//     .notNull()
//     .references(() => foodCategories.id),
// });

// export let nutritionFacts = sqliteTable("nutrition_facts", {
//   id: integer("id").primaryKey().notNull(),
//   foodId: integer("food_id")
//     .notNull()
//     .references(() => foods.id),
//   calories: text("calories").notNull(),
//   protein: text("protein").notNull(),
//   fat: text("fat").notNull(),
//   carbohydrates: text("carbohydrates").notNull(),
//   fiber: text("fiber").notNull(),
//   sugar: text("sugar").notNull(),
//   sodium: text("sodium").notNull(),
//   vitaminA: text("vitamin_a"),
//   vitaminC: text("vitamin_c"),
//   calcium: text("calcium"),
//   iron: text("iron"),
// });

// export let foodCategories = sqliteTable("food_categories", {
//   id: integer("id").primaryKey().notNull(),
//   name: text("name").notNull(),
// });

// export let insertFoodSchema = createInsertSchema(foods);
// export let selectFoodSchema = createSelectSchema(foods);

// export type Food = z.infer<typeof insertFoodSchema>;
// export type SelectFood = z.infer<typeof selectFoodSchema>;

// export let insertNutritionFactsSchema = createInsertSchema(nutritionFacts);
// export let selectNutritionFactsSchema = createSelectSchema(nutritionFacts);
// export type NutritionFacts = z.infer<typeof insertNutritionFactsSchema>;
// export type SelectNutritionFacts = z.infer<typeof selectNutritionFactsSchema>;

// export let insertFoodCategorySchema = createInsertSchema(foodCategories);
// export let selectFoodCategorySchema = createSelectSchema(foodCategories);
// export type FoodCategory = z.infer<typeof insertFoodCategorySchema>;
// export type SelectFoodCategory = z.infer<typeof selectFoodCategorySchema>;

// export let selectFoodWithNutritionFactsSchema = z.object({
//   foods: z.object({
//     id: z.string(),
//     name: z.string(),
//     servingSize: z.string(),
//     categoryId: z.string(),
//   }),
//   nutritionFacts: z
//     .object({
//       id: z.string(),
//       foodId: z.string(),
//       calories: z.string(),
//       protein: z.string(),
//       fat: z.string(),
//       carbohydrates: z.string(),
//       fiber: z.string(),
//       sugar: z.string(),
//       sodium: z.string(),
//       vitaminA: z.string().optional(),
//       vitaminC: z.string().optional(),
//       calcium: z.string().optional(),
//       iron: z.string().optional(),
//     })
//     .optional(),
// });
