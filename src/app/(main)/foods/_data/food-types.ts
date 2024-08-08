import "server-only";

import {db} from "@/db";
import {foodTypes} from "@/db/schema";

export async function getAllFoodTypes() {
  return await db
    .select({
      id: foodTypes.id,
      name: foodTypes.name,
    })
    .from(foodTypes)
    .execute();
}

export type FoodType = Awaited<ReturnType<typeof getAllFoodTypes>>[number];
