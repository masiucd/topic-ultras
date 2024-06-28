import "server-only";

import {eq, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";
import {z} from "zod";

import {db} from "../db";
import {foodNutations, foods} from "../models/schema";

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

export let foodResultSchema = z.object({
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
