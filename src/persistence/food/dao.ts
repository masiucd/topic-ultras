import "server-only";

import {eq, like, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/_db/db";
import {foodNutations, foods, foodTypes} from "@/_db/models/schema";

import {
  foodResultSchema,
  foodsByCategorySchema,
  type FoodTypeCategory,
} from "./types";

export async function getFoodData(limit: number = 10, offset: number = 0) {
  let f = alias(foods, "food");
  let fn = alias(foodNutations, "foodNutation");
  let ft = alias(foodTypes, "foodType");
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
      foodType: ft.name,
      foodTypeId: ft.id,
    })
    .from(f)
    .leftJoin(fn, eq(f.foodId, fn.foodId))
    .leftJoin(ft, eq(f.type_id, ft.id))
    .limit(limit)
    .offset(offset)
    .groupBy(f.foodId);
  return foodResultSchema.array().safeParse(foodRecordsStatement);
}

// Returns a list of food records that match the given food name
export async function getFoodsDetailsByName(food: string) {
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

export async function getFoodRecordById(foodID: number) {
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
    .where(eq(f.foodId, foodID))
    .get();
  // Using .get() instead of .all() because we are only expecting one record
  return foodResultSchema.safeParse(foodRecordsStatement);
}

export async function foodsBasedOnFoodType(foodType: FoodTypeCategory) {
  console.log("🚀 ~ foodsBasedOnFoodType ~ foodType:", foodType);
  let ft = alias(foodTypes, "foodTypeCategory");
  let f = alias(foods, "food");
  let xs = await db
    .select({
      foodId: f.foodId,
      foodName: f.name,
      description: f.description,
    })
    .from(ft)
    .innerJoin(f, eq(ft.id, f.type_id))
    .where(eq(ft.name, foodType))
    .all();
  console.log("xs", xs);
  return foodsByCategorySchema.array().safeParse(xs);
}
