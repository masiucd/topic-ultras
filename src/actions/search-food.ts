"use server";
import "server-only";

import {sql} from "drizzle-orm";

import {db} from "@/db/db";
import {foods} from "@/db/models/schema";

export async function searchFood(prevState: any, formData: FormData) {
  let food = formData.get("food");
  if (typeof food !== "string") {
    throw new Error("Expected food to be a string.");
  }
  let result = await db
    .select()
    .from(foods)
    .where(sql`lower(${foods.name}) = lower(${food})`);

  return result;
}
