import "server-only";

import {eq} from "drizzle-orm";

import {db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

export async function getFoodItemByName(foodName: string) {
  try {
    let item = await db
      .select({
        name: foods.name,
        description: foods.description,
        type: {
          name: foodTypes.name,
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
