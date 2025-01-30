import type {DB} from "..";
import {foodItems} from "../schema";
import data from "./data/food-items.json";

export async function seedFoodItems(db: DB) {
  await db.insert(foodItems).values(data);
}
