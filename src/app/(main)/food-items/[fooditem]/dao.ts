import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients} from "@/db/schema";
import {unSlugify} from "@/lib/utils";
import {eq, sql} from "drizzle-orm";
import "server-only";

export async function getFoodItemData(foodName: string) {
	try {
		let data = await db
			.select({
				foodId: foodItems.id,
				name: foodItems.name,
				description: foodItems.description,
				foodType: foodItems.foodType,
				foodCategory: foodCategories.name,
				nutrition: {
					calories: sql<number>`${foodNutrients.calories}`.mapWith(Number),
					protein: sql<number>`${foodNutrients.protein}`.mapWith(Number),
					fat: sql<number>`${foodNutrients.fat}`.mapWith(Number),
					carbs: sql<number>`${foodNutrients.carbs}`.mapWith(Number),
				},
			})
			.from(foodItems)
			.innerJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
			.innerJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
			.where(eq(foodItems.name, unSlugify(foodName)));

		if (!data.length) {
			return null;
		}
		return data[0];
	} catch (error) {
		console.error("Error fetching food item data:", error);
		return null;
	}
}

export type FoodItemType = Awaited<ReturnType<typeof getFoodItemData>>;
