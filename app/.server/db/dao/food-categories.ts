import {eq} from "drizzle-orm";
import {db} from "..";
import {foodCategories} from "../schema";

export async function getFoodCategory(category: string) {
  try {
    let results = await db
      .select()
      .from(foodCategories)
      .where(eq(foodCategories.name, category));

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export type FoodCategoryData = Awaited<ReturnType<typeof getFoodCategory>>;
