import {and, eq} from "drizzle-orm";

import {db} from "@/db";
import {favoriteFoods, foodNutrients, foods, foodTypes} from "@/db/schema";
import {safe} from "@/lib/safe";

export async function getFoodItemByName(foodName: string) {
  let result = safe(
    async () =>
      await db
        .select({
          foodId: foods.id,
          name: foods.name,
          description: foods.description,
          type: {
            name: foodTypes.name,
            slug: foodTypes.slug,
            id: foodTypes.id,
          },
          nutrients: {
            calories: foodNutrients.calories,
            fat: foodNutrients.fat,
            protein: foodNutrients.protein,
            carbs: foodNutrients.carbs,
          },
        })
        .from(foods)
        .innerJoin(foodTypes, eq(foods.typeId, foodTypes.id))
        .innerJoin(foodNutrients, eq(foods.id, foodNutrients.foodId))
        .where(eq(foods.slug, foodName)),
  );

  return result.success ? (await result.value)[0] : null;
}

export async function getFavoriteFoods(userId: number, foodId: number) {
  let result = safe(
    async () =>
      await db
        .select({userId: favoriteFoods.userId, foodId: favoriteFoods.foodId})
        .from(favoriteFoods)
        .where(and(eq(favoriteFoods.userId, userId), eq(favoriteFoods.foodId, foodId))),
  );
  if (result.success) {
    return await result.value;
  }
  return [];
}
