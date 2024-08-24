"use server";
import "server-only";

import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

import {db} from "@/db";
import {favoriteFoods} from "@/db/schema";
import {safe} from "@/lib/safe";
import {validateFormData} from "@/lib/utils";

export async function addOrRemoveFavoriteFood(data: FormData) {
  let record = validateFormData(data, ["food-id", "user-id", "food-name", "is-favorite"]);
  let userId = record["user-id"];
  let foodId = record["food-id"];
  let foodName = record["food-name"];
  let isFavorite = record["is-favorite"];
  if (userId && foodId && foodName && isFavorite) {
    await addOrRemove(userId, foodId, foodName, isFavorite === "true");
  }
}

async function addOrRemove(userId: string, foodId: string, foodName: string, isFavorite: boolean) {
  if (isFavorite) {
    await addFavorite(parseInt(userId, 10), parseInt(foodId, 10));
  } else {
    await removeFavorite(parseInt(foodId, 10));
  }
  revalidatePath(`/foods/${foodName}`);
}

async function removeFavorite(foodId: number) {
  const result = await safe(() => db.delete(favoriteFoods).where(eq(favoriteFoods.foodId, foodId)));
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error(result.error);
  }
}

async function addFavorite(userId: number, foodId: number) {
  const result = await safe(() =>
    db.insert(favoriteFoods).values({userId: userId, foodId: foodId}),
  );
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error(result.error);
  }
}
