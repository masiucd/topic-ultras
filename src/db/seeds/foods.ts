import type {DB} from "..";
import {foods} from "../schema";
import foodData from "./data/foods.json";

export async function seed(db: DB) {
  for (let food of foodData) {
    await db
      .insert(foods)
      .values({
        name: food.name,
        typeId: 2,
      })
      .execute();
  }
}
