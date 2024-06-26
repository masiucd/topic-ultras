"use server";
import "server-only";

import {eq, like, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";
import {z} from "zod";

import {db} from "@/db/db";
import {foodNutations, foods} from "@/db/models/schema";

let unitSchema = z.union([z.literal("g"), z.literal("oz")]);

export type Unit = z.infer<typeof unitSchema>;

export async function getFoodResults(
  _prevState: null | Awaited<ReturnTypeOfFetchFoodNutrition>,
  formData: FormData,
) {
  let food = formData.get("food");
  let unit = formData.get("unit");
  // TODO not used. use it
  let amount = formData.get("amount");
  if (typeof food !== "string") {
    throw new Error("Expected food to be a string.");
  }
  if (typeof unit !== "string") {
    throw new Error("Expected unit to be a string.");
  }
  if (typeof amount !== "string") {
    throw new Error("Expected amount to be a string.");
  }

  return await getFoodData(food, unitSchema.parse(unit));
}

export type GetFood = typeof getFoodResults;

async function getFoodData(food: string, unit: Unit) {
  let f = alias(foods, "food");
  let fn = alias(foodNutations, "foodNutation");
  let foodRecordsStatement = await db
    .selectDistinct({
      foodId: f.foodId,
      foodName: f.name,
      lowerName: sql`lower(${f.name})`,
      description: f.description,
      calories: fn.calories,
      carbs: fn.carbohydrates,
      totalFat: fn.fat,
      protein: fn.protein,
    })
    .from(f)
    .leftJoin(fn, eq(f.foodId, fn.foodId))
    .where(like(f.name, `%${food}%`))
    .groupBy(f.foodId);

  let result = foodResultSchema.array().safeParse(foodRecordsStatement);
  if (result.success) {
    return {
      result: result.data,
      searchTerm: food,
      error: null,
      unit,
    };
  }
  return {
    result: [],
    searchTerm: food,
    error: result.error,
    unit,
  };
}

let foodResultSchema = z.object({
  foodId: z.number(),
  calories: z.number(),
  carbs: z.number(),
  description: z.string(),
  foodName: z.string(),
  lowerName: z.string(),
  protein: z.number(),
  totalFat: z.number(),
});

export type FoodResult = z.infer<typeof foodResultSchema>;
export type ReturnTypeOfFetchFoodNutrition = ReturnType<typeof getFoodData>;

const GRAMS_TO_OUNCES = 3.5274;
const GRAMS_IN_100G = 100;
// in DB everything is defaulting to 100 grams
// so we need to calculate the nutrition based on the amount and unit
function calculateNutrionBasedOnAmountAndUnit(
  foodNutrition: FoodResult,
  amount: number,
  unit: Unit,
) {
  let {calories, carbs, protein, totalFat} = foodNutrition;
  if (unit === "g") {
    return {
      calories: calories * (amount / GRAMS_IN_100G),
      carbs: carbs * (amount / GRAMS_IN_100G),
      protein: protein * (amount / GRAMS_IN_100G),
      totalFat: totalFat * (amount / GRAMS_IN_100G),
    };
  }
  if (unit === "oz") {
    return {
      calories: calories * (amount / GRAMS_TO_OUNCES),
      carbs: carbs * (amount / GRAMS_TO_OUNCES),
      protein: protein * (amount / GRAMS_TO_OUNCES),
      totalFat: totalFat * (amount / GRAMS_TO_OUNCES),
    };
  }
}
