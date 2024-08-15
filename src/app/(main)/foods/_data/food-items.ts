import "server-only";

import {desc, eq, like, SQL, sql} from "drizzle-orm";
import {alias, PgColumn} from "drizzle-orm/pg-core";

import {type DB, db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

export const ITEMS_PER_PAGE = 6;

export async function getFoodItemsData(
  query: string,
  perPage = ITEMS_PER_PAGE,
  skip = 0,
  orderBy: string
) {
  console.log("🚀 ~ orderBy:", orderBy);
  try {
    let res = await db.transaction(async (tx) => {
      let queryCondition = query === "" ? sql`1=1` : like(f.name, `%${query}%`);
      let orderByCondition =
        orderBy === ""
          ? f.name
          : foodNutrients[orderBy as "carbs" | "protein" | "fat"];
      let foodItems = await selectFoodItems(
        tx,
        queryCondition,
        perPage,
        skip,
        orderByCondition
      );
      let totalFoods = await getTotalFoodItems(tx);
      return {foodItems, totalFoods: totalFoods[0].total};
    });
    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {foodItems: [], totalFoods: 0};
  }
}

export type FoodItem = Awaited<
  ReturnType<typeof getFoodItemsData>
>["foodItems"][number];

let ft = alias(foodTypes, "foodType");
let f = alias(foods, "food");

async function selectFoodItems(
  trx: DB,
  queryCondition: SQL<unknown>,
  perPage: number,
  skip: number,
  orderByCondition: PgColumn
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
    .orderBy(desc(orderByCondition));
}

async function getTotalFoodItems(trx: DB) {
  return await trx.select({total: sql`count(*)`.mapWith(Number)}).from(foods);
}
