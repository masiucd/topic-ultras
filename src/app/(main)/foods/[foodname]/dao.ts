import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { favoriteFoods, foodNutrients, foods, foodTypes } from "@/db/schema";

export async function getFoodItemByName(foodName: string) {
  try {
    let item = await db
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
      .where(eq(foods.slug, foodName));

    return item[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

export async function getFavoriteFoods(userId: number, foodId: number) {
  return await db
    .select()
    .from(favoriteFoods)
    .where(
      and(eq(favoriteFoods.userId, userId), eq(favoriteFoods.foodId, foodId)),
    );
}
