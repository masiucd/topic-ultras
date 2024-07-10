import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/db/db";
import {foodTypes} from "@/db/models/schema";

export async function getAllFoodTypes() {
  let ft = alias(foodTypes, "ft");
  let xs = await db.select().from(ft);
  return xs;
}
