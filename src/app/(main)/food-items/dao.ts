import "server-only";
import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients} from "@/db/schema";
import {eq, ilike, sql} from "drizzle-orm";

export async function getFoodItems({
	name,
	limit,
	skip,
}: {
	name?: string;
	limit: number;
	skip: number;
}) {
	return db.transaction(async (ctx) => {
		try {
			let totalFoodItems = await ctx
				.select({
					count: sql`count(*)`.mapWith(Number),
				})
				.from(foodItems);

			let allFoodItems = await ctx
				.selectDistinct({
					foodId: foodItems.id,
					foodName: foodItems.name,
					foodDescription: foodItems.description,
					foodType: foodItems.foodType,
					foodCategory: foodCategories.name,
					nutrients: {
						calories: foodNutrients.calories,
						protein: foodNutrients.protein,
						fat: foodNutrients.fat,
						carbs: foodNutrients.carbs,
					},
				})
				.from(foodItems)
				.leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
				.leftJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
				.orderBy(foodItems.name)
				.where(name ? ilike(foodItems.name, `%${name}%`) : undefined)
				.limit(limit) // limit 4
				.offset(skip); // skip 4

			return {
				totalFoodItems: totalFoodItems[0].count,
				allFoodItems,
			};
		} catch (error) {
			console.error("Error fetching food items:", error);
			return {
				totalFoodItems: 0,
				allFoodItems: [],
			};
		}
	});
}

export type FoodItemsResult = Awaited<ReturnType<typeof getFoodItems>>;
