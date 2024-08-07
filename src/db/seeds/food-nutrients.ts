import type {DB} from "..";
import {foodNutrients} from "../schema";
import nutrionsData from "./data/nutrions.json";

export async function seed(db: DB) {
  for (let nd of nutrionsData) {
    await db
      .insert(foodNutrients)
      .values({
        // @ts-ignore
        foodId: nd.foodId,
        calories: nd.calories,
        fat: nd.fat,
        protein: nd.protein,
        carbs: nd.carbs,
      })
      .execute();
  }
}
