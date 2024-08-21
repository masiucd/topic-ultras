import {asc, desc, eq, like, SQL, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";

import {type DB, db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";
import {safe} from "@/lib/safe";

export const ITEMS_PER_PAGE = 6;

export async function getFoodItemsData(
  query: string,
  perPage = ITEMS_PER_PAGE,
  skip = 0,
  orderBy: string,
) {
  let result = safe(
    async () =>
      await db.transaction(async (tx) => {
        let queryCondition = query === "" ? sql`1=1` : like(f.name, `%${query}%`);
        let orderByCondition = getOrderByCondition(orderBy);
        let foodItems = await selectFoodItems(tx, queryCondition, perPage, skip, orderByCondition);
        let totalFoods = await getTotalFoodItems(tx);
        return {foodItems, totalFoods: totalFoods[0].total};
      }),
  );

  if (result.success) {
    return await result.value;
  } else {
    // eslint-disable-next-line no-console
    console.error(result.error);
    return {foodItems: [], totalFoods: 0};
  }

  // return res;
}

let ft = alias(foodTypes, "foodType");
let f = alias(foods, "food");

async function selectFoodItems(
  trx: DB,
  queryCondition: SQL<unknown>,
  perPage: number,
  skip: number,
  orderByCondition: SQL<unknown>,
) {
  return await trx
    .select({
      foodId: f.id,
      foodName: f.name,
      slug: f.slug,
      foodType: {
        id: ft.id,
        name: ft.name,
        slug: ft.slug,
      },
      data: {
        calories: foodNutrients.calories,
        fat: foodNutrients.fat,
        protein: foodNutrients.protein,
        carbs: foodNutrients.carbs,
      },
    })
    .from(f)
    .innerJoin(ft, eq(f.typeId, ft.id))
    .innerJoin(foodNutrients, eq(f.id, foodNutrients.foodId))
    .limit(perPage)
    .offset(skip)
    .where(queryCondition)
    .orderBy(orderByCondition);
}

async function getTotalFoodItems(trx: DB) {
  return await trx.select({total: sql`count(*)`.mapWith(Number)}).from(foods);
}

function getOrderByCondition(orderBy: string) {
  switch (orderBy) {
    case "carbs":
      return desc(foodNutrients.carbs);
    case "protein":
      return desc(foodNutrients.protein);
    case "fat":
      return desc(foodNutrients.fat);
    case "calories":
      return desc(foodNutrients.calories);

    default:
      return asc(f.name);
  }
}
