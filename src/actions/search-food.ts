"use server";
import "server-only";

import {eq, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/db/db";
import {foodNutrients, foods, nutrients, units} from "@/db/models/schema";

export async function searchFood(
  prevState: null | Awaited<ReturnTypeOfFetchFoodNutrition>,
  formData: FormData,
) {
  let food = formData.get("food");
  if (typeof food !== "string") {
    throw new Error("Expected food to be a string.");
  }
  return await fetchFoodNutrition(food);
}

export type SearchFood = typeof searchFood;

async function fetchFoodNutrition(food: string) {
  let foodNutrientsAlias = alias(foodNutrients, "foodNutrients");
  let result = await db
    .select()
    .from(foods)
    .innerJoin(foodNutrientsAlias, eq(foods.foodId, foodNutrientsAlias.foodId))
    .innerJoin(
      nutrients,
      eq(foodNutrientsAlias.nutrientId, nutrients.nutrientId),
    )
    .innerJoin(units, eq(foodNutrientsAlias.unitId, units.unitId))
    .where(sql`lower(${foods.name}) = lower(${food})`)
    .get();
  console.log("result", result);
  if (result) return {result, search: food};
  return {result: null, search: food};
}

export type ReturnTypeOfFetchFoodNutrition = ReturnType<
  typeof fetchFoodNutrition
>;
