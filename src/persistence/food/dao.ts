import "server-only";

import {eq, like, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/db/db";
import {foodNutations, foods, foodTypes} from "@/db/models/schema";

import {foodResultSchema} from "./types";

export async function getFoodData(limit: number = 10, offset: number = 0) {
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
    .limit(limit)
    .offset(offset)
    .groupBy(f.foodId);

  return foodResultSchema.array().safeParse(foodRecordsStatement);
}

// Returns a list of food records that match the given food name
export async function getFoodDetailsByName(food: string) {
  let f = alias(foods, "food");
  let fn = alias(foodNutations, "foodNutation");
  let dt = alias(foodTypes, "foodType");

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
      foodType: dt.name,
      foodTypeId: dt.id,
    })
    .from(f)
    .leftJoin(fn, eq(f.foodId, fn.foodId))
    .leftJoin(dt, eq(f.type_id, dt.id))
    .where(like(f.name, `%${food}%`))
    .groupBy(f.foodId);
  return foodResultSchema.array().safeParse(foodRecordsStatement);
}
