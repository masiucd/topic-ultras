"use server";
import "server-only";

import {eq, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/db/db";
import {foods, nutritionFacts} from "@/db/models/schema";

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
  let nutri = alias(nutritionFacts, "nutritions");
  let result = await db
    .select()
    .from(foods)
    .innerJoin(nutri, eq(foods.id, nutri.foodId))
    .where(sql`lower(${foods.name}) = lower(${food})`)
    .get();
  if (result) return result;
  return null;
}

type ReturnTypeOfFetchFoodNutrition = ReturnType<typeof fetchFoodNutrition>;
