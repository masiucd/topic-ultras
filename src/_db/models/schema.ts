import {
  index,
  integer,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export let foods = sqliteTable(
  "foods",
  {
    foodId: integer("food_id").primaryKey({autoIncrement: true}).notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    type_id: integer("type_id")
      .notNull()
      .references(() => foodTypes.id),
  },
  (table) => ({
    foodNameIdx: index("food_name_idx").on(table.name),
  }),
);

// -- Everything is in grams per 100 grams of food
export let foodNutations = sqliteTable("food_nutrition_facts", {
  id: integer("id").primaryKey({autoIncrement: true}).notNull(), // -- the primary key should always be the id in the foods table
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

export let foodTypes = sqliteTable("food_types", {
  id: integer("id").primaryKey({autoIncrement: true}).notNull(),
  name: text("name").notNull(),
});

let insertFoodTypeSchema = createInsertSchema(foodTypes);
let selectFoodTypeSchema = createSelectSchema(foodTypes);

export type FoodType = z.infer<typeof insertFoodTypeSchema>;
export type SelectFoodType = z.infer<typeof selectFoodTypeSchema>;

export let users = sqliteTable("users", {
  id: integer("id").primaryKey({autoIncrement: true}).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("email").notNull(),
  admin: numeric("admin").default("0"),
});
export let insertUsersSchema = createInsertSchema(users);
export let selectUsersSchema = createSelectSchema(users);

export type UserType = z.infer<typeof insertUsersSchema>;
export type SelectUserType = z.infer<typeof selectUsersSchema>;

export let favoriteFoods = sqliteTable("favourite_foods", {
  id: integer("id").primaryKey({autoIncrement: true}).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  foodId: integer("food_id")
    .notNull()
    .references(() => foods.foodId),
});
export let insertFavoriteFoodsSchema = createInsertSchema(favoriteFoods);
export let selectFavoriteFoodsSchema = createSelectSchema(favoriteFoods);

export type FavoriteFoodsType = z.infer<typeof insertUsersSchema>;
export type SelectFavoriteFoodsType = z.infer<typeof selectUsersSchema>;
