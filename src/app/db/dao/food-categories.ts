import {sql} from "drizzle-orm";
import "server-only";
import {db} from "..";
import {foodCategories} from "../schema";

export async function getCategories() {
  try {
    let rows = await db
      .select({
        id: foodCategories.id,
        name: foodCategories.name,
      })
      .from(foodCategories)
      .orderBy(sql`${foodCategories.name} ASC`);
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export type FoodCategory = Awaited<ReturnType<typeof getCategories>>[0];
