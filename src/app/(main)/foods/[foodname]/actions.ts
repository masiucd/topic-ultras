"use server";
import {db} from "@/db";
import {favoriteFoods} from "@/db/schema";
import {validateFormData} from "@/lib/utils";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import "server-only";

export async function addOrRemoveFavoriteFood(data: FormData) {
  let record = validateFormData(data, [
    "food-id",
    "user-id",
    "food-name",
    "is-favorite",
  ]);
  let userId = record["user-id"];
  let foodId = record["food-id"];
  let foodName = record["food-name"];
  let isFavorite = record["is-favorite"];
  if (userId && foodId && foodName && isFavorite) {
    if (isFavorite === "true") {
      try {
        await db
          .delete(favoriteFoods)
          .where(eq(favoriteFoods.foodId, Number(foodId)));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await db
          .insert(favoriteFoods)
          .values({userId: Number(userId), foodId: Number(foodId)});
      } catch (error) {
        console.error(error);
      }
    }
    revalidatePath(`/foods/${foodName}`);
  }
}
