import "server-only";

import {asc, desc, eq, like, SQL, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";

import {type DB, db} from "..";
import {foodNutrients, foods, foodTypes} from "../schema";

export async function getFoodItemByName(foodName: string) {
  try {
    let item = await db
      .select({
        name: foods.name,
        description: foods.description,
        type: {
          name: foodTypes.name,
          slug: foodTypes.slug,
          id: foodTypes.id,
        },
        nutrients: {
          calories: foodNutrients.calories,
          fat: foodNutrients.fat,
          protein: foodNutrients.protein,
          carbs: foodNutrients.carbs,
        },
      })
      .from(foods)
      .innerJoin(foodTypes, eq(foods.typeId, foodTypes.id))
      .innerJoin(foodNutrients, eq(foods.id, foodNutrients.foodId))
      .where(eq(foods.slug, foodName));

    return item[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

// export type FoodItemType = Awaited<ReturnType<typeof getFoodItemByName>>;

export const ITEMS_PER_PAGE = 6;

export async function getFoodItemsData(
  query: string,
  perPage = ITEMS_PER_PAGE,
  skip = 0,
  orderBy: string
) {
  try {
    let res = await db.transaction(async (tx) => {
      let queryCondition = query === "" ? sql`1=1` : like(f.name, `%${query}%`);
      let orderByCondition =
        orderBy === ""
          ? asc(f.name)
          : desc(
              foodNutrients[orderBy as "carbs" | "protein" | "fat" | "calories"]
            );

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

let ft = alias(foodTypes, "foodType");
let f = alias(foods, "food");

async function selectFoodItems(
  trx: DB,
  queryCondition: SQL<unknown>,
  perPage: number,
  skip: number,
  orderByCondition: SQL<unknown>
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
