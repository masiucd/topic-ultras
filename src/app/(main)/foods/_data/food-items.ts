import "server-only";

import {eq, like} from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";

import {db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

export async function getFoodItems(query = "", limit = 5) {
  let ft = alias(foodTypes, "foodType");
  let f = alias(foods, "food");
  if (query === "") {
    return await db
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
      .limit(limit)
      .offset(0);
  }
  return await db
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
    .limit(limit)
    .offset(0)
    .where(like(f.name, `%${query}%`));
}

export type FoodItem = Awaited<ReturnType<typeof getFoodItems>>[number];
