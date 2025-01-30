import type {DB} from "..";
import {foodCategories} from "../schema";
import data from "./data/food-categories.json";

export async function seedFoodCategories(db: DB) {
  await db.insert(foodCategories).values(data);
}
