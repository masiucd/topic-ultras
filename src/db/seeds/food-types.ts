import type {DB} from "..";
import {foodTypes} from "../schema/food-types";
import foodTypesData from "./data/food-type.json";

export async function seed(db: DB) {
  for (let type of foodTypesData) {
    await db.insert(foodTypes).values({name: type}).execute();
  }
}
