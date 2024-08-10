import "server-only";

import {eq, like, SQL, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";

import {db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

export const ITEMS_PER_PAGE = 6;

export async function getFoodItemsData(
  query: string,
  perPage = ITEMS_PER_PAGE,
  skip = 0
) {
  try {
    return await db.transaction(async (tx) => {
      let ft = alias(foodTypes, "foodType");
      let f = alias(foods, "food");

      let selectFoodItems = async (
        tx2: typeof tx,
        queryCondition: SQL<unknown>
      ) => {
        return await tx2
          .select({
            foodId: f.id,
            foodName: f.name,
            foodType: {name: ft.name, id: ft.id},
            data: {
              calories: foodNutrients.calories,
              fat: foodNutrients.fat,
              protein: foodNutrients.protein,
              carbs: foodNutrients.carbs,
            },
          })
          .from(f)
          .innerJoin(ft, eq(f.typeId, ft.id))
          .innerJoin(foodNutrients, eq(f.id, foodNutrients.foodId))
          .limit(perPage)
          .offset(skip)
          .where(queryCondition);
      };

      let queryCondition = query === "" ? sql`1=1` : like(f.name, `%${query}%`);
      let foodItems = await selectFoodItems(tx, queryCondition);

      let totalFoods = await tx
        .select({total: sql`count(*)`.mapWith(Number)})
        .from(foods);

      return {foodItems, totalFoods: totalFoods[0].total};
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {foodItems: [], totalFoods: 0};
  }
}

export type FoodItem = Awaited<
  ReturnType<typeof getFoodItemsData>
>["foodItems"][number];
