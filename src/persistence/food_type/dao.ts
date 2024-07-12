import {alias} from "drizzle-orm/sqlite-core";

import {db} from "@/_db/db";
import {foodTypes} from "@/_db/models/schema";

export async function getAllFoodTypes() {
  let ft = alias(foodTypes, "ft");
  let xs = await db.select().from(ft);
  return xs;
}
