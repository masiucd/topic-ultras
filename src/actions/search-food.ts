"use server";
import "server-only";

import {and, eq, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/db/db";
import {foodNutrients, foods, nutrients, units} from "@/db/models/schema";
import {z} from "zod";

let unitSchema = z.union([z.literal("g"), z.literal("oz")]);

type Unit = z.infer<typeof unitSchema>;

export async function searchFood(
  prevState: null | Awaited<ReturnTypeOfFetchFoodNutrition>,
  formData: FormData,
) {
  let food = formData.get("food");
  let unit = formData.get("unit");
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

  return await fetchFoodNutrition(
    food,
    unitSchema.parse(unit),
    parseInt(amount, 10),
  );
}

export type SearchFood = typeof searchFood;

async function fetchFoodNutrition(food: string, unit: Unit, amount: number) {
  if (unit === "oz") {
    let statement = sql`
  SELECT
    f.name AS food_name,
    n.name AS nutrient_name,
    fn.amount * u.conversion_factor / (SELECT conversion_factor FROM units WHERE name = 'oz') AS amount_in_ounces,
    'oz' AS unit
FROM
    foods f
        JOIN
    food_nutrients fn ON f.food_id = fn.food_id
        JOIN
    nutrients n ON fn.nutrient_id = n.nutrient_id
        JOIN
    units u ON fn.unit_id = u.unit_id
WHERE
        lower(f.name) = lower(${food});
`;

    let result = resultSchema.safeParse(db.get(statement));
    if (result.success) return {result: result.data, search: food, error: null};
    return {result: null, search: food, error: result.error};
  }
  let statement = sql`
    SELECT
    f.name AS food_name,
    n.name AS nutrient_name,
    fn.amount * u.conversion_factor AS amount_in_grams,
    'g' AS unit
FROM
    foods f
        JOIN
    food_nutrients fn ON f.food_id = fn.food_id
        JOIN
    nutrients n ON fn.nutrient_id = n.nutrient_id
        JOIN
    units u ON fn.unit_id = u.unit_id
WHERE
        lower(f.name) = lower(${food});
  `;

  let result = resultSchema.safeParse(db.get(statement));
  if (result.success) return {result: result.data, search: food, error: null};
  return {result: null, search: food, error: result.error};
}

let resultSchema = z.object({
  food_name: z.string(),
  nutrient_name: z.string(),
  amount_in_grams: z.number().nullable(),
  amount_in_ounces: z.number().nullable(),
  unit: z.string(),
});

type Result = z.infer<typeof resultSchema>;

export type ReturnTypeOfFetchFoodNutrition = ReturnType<
  typeof fetchFoodNutrition
>;
