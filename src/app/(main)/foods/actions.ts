"use server";
import "server-only";

import {revalidatePath} from "next/cache";

import {type FoodItem} from "./_data/food-items";

export async function filterFoodItems(prev: FoodItem[] | null, data: FormData) {
  let hasResetFilter = data.get("reset-filter");
  console.log("🚀 ~ filterFoodItems ~ hasResetFilter:", hasResetFilter);
  if (hasResetFilter) {
    // revalidatePath("/foods");
    return null;
  }
  let xs = data.getAll("food-type");
  if (xs.length > 0 && xs.every((x) => typeof x === "string")) {
    revalidatePath("/foods");
    // return await getFoodItems(xs.map(Number));
  }
  revalidatePath("/foods");
  return [];
}
