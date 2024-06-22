"use server";
import "server-only";

import {sql} from "drizzle-orm";

import {db} from "@/db/db";
import {foods, type SelectFood, selectFoodSchema} from "@/db/models/schema";

export async function searchFood(
  prevState: null | SelectFood,
  formData: FormData,
) {
  let food = formData.get("food");
  if (typeof food !== "string") {
    throw new Error("Expected food to be a string.");
  }
  let result = selectFoodSchema.safeParse(
    await db
      .select()
      .from(foods)
      .where(sql`lower(${foods.name}) = lower(${food})`)
      .get(),
  );

  if (result.success) {
    console.log("result", result.data);
    return result.data;
  }

  return null;
}

export type SearchFood = typeof searchFood;
