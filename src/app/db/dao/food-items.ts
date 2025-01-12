import "server-only";
import {and, eq, ilike, or, sql} from "drizzle-orm";
import {db} from "..";
import {foodCategories, foodItems, foodNutrients} from "../schema";

export async function getFoodItems({
  searchTerm,
  rows,
  offset,
  categories,
}: {
  searchTerm?: string;
  rows: number;
  offset: number;
  categories: string[];
}) {
  return await db
    .select({
      id: foodItems.id,
      name: foodItems.name,
      description: foodItems.description,
      foodCateGory: foodCategories.name,
      nutrients: {
        id: foodNutrients.id,
        calories: foodNutrients.calories,
        protein: foodNutrients.protein,
        fat: foodNutrients.fat,
        carbs: foodNutrients.carbs,
      },
    })
    .from(foodItems)
    .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
    .leftJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
    .orderBy(sql`${foodItems.name} ASC`)
    .where(
      or(
        and(
          ...categories.map((category) => eq(foodCategories.name, category)),
          searchTerm ? ilike(foodItems.name, `%${searchTerm}%`) : undefined
        ),

        ...categories.map((category) => eq(foodCategories.name, category)),
        searchTerm ? ilike(foodItems.name, `%${searchTerm}%`) : undefined
      )
    )
    .limit(rows)
    .offset(offset);
}

export type FoodItem = Awaited<ReturnType<typeof getFoodItems>>[0];
