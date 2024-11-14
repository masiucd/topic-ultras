import {eq, ilike, sql} from "drizzle-orm";
import {db} from "..";
import {foodCategories, foodItems, foodNutrients, slugs} from "../schema";

export async function getFoodItemsData(name: string | null, page: number, rows: number) {
	try {
		return await db.transaction(async (trx) => {
			let totalFoodItems = await trx
				.select({count: sql`count(*)`.mapWith(Number)})
				.from(foodItems);

			let totalPages = Math.ceil(totalFoodItems[0].count / rows);

			let results = await trx
				.select({
					foodId: foodItems.id,
					foodName: foodItems.name,
					foodDescription: foodItems.description,
					foodCategory: {
						id: foodCategories.id,
						name: foodCategories.name,
					},
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
				.orderBy(sql`${foodItems.name} ASC`)
				.where(name ? ilike(foodItems.name, `%${name}%`) : undefined)
				.limit(rows)
				.offset((page - 1) * rows);

			return {
				results,
				totalPages,
				page,
				totalFoodItems: totalFoodItems[0].count,
			};
		});
	} catch (error) {
		console.error(error);
		return {
			results: [],
			totalPages: 0,
			page: 0,
			totalFoodItems: 0,
		};
	}
}
