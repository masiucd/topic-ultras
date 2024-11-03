import "server-only";
import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients, slugs} from "@/db/schema";
import {eq, ilike, sql} from "drizzle-orm";

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
			.innerJoin(slugs, eq(foodItems.id, slugs.objectId))
			.where(eq(slugs.slug, foodName));

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
					slug: slugs.slug,
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
				.leftJoin(slugs, eq(foodItems.id, slugs.objectId))
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
