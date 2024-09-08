import {and, eq} from "drizzle-orm";

import {db} from "@/db";
import {favoriteFoods, foodNutrients, foodTypes, foods} from "@/db/schema";

export async function getFoodItemByName(foodName: string) {
	try {
		let result = await db
			.select({
				foodId: foods.id,
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

		if (result.length > 0) {
			return result[0];
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}

	// return result.success ? (await result.value)[0] : null;
}

export async function getFavoriteFoods(userId: number, foodId: number) {
	try {
		let result = await db
			.select({userId: favoriteFoods.userId, foodId: favoriteFoods.foodId})
			.from(favoriteFoods)
			.where(and(eq(favoriteFoods.userId, userId), eq(favoriteFoods.foodId, foodId)));
		return result;
	} catch (error) {
		console.error(error);
		return [];
	}
}
