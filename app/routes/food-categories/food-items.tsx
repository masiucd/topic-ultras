import {eq} from "drizzle-orm";
import {db} from "~/.server/db";
import {foodCategories, foodItems} from "~/.server/db/schema";
import type {Route} from "./+types/food-items";

export async function loader({params}: Route.LoaderArgs) {
  try {
    let results = await db

      .select({
        foodId: foodItems.id,
        foodName: foodItems.name,
        foodCategory: foodCategories.name,
        foodDescription: foodItems.description,
      })
      .from(foodItems)
      .innerJoin(
        foodCategories,
        eq(foodCategories.id, foodItems.foodCategoryId)
      )
      .where(eq(foodCategories.name, params.category))
      .orderBy(foodItems.name);
    return {
      foodItems: results,
      category: params.category,
    };
  } catch (error) {
    console.error(error);
    return {
      foodItems: [],
      category: params.category,
    };
  }
}
export default function FoodItemsForFoodCategoryRoute({
  loaderData,
}: Route.ComponentProps) {
  let data = loaderData;

  return (
    <div>
      <h1>Food items for category - TODO</h1>

      <ul>
        {data.foodItems.length > 0 ? (
          data.foodItems.map((item) => (
            <li key={item.foodId}>
              <h2>{item.foodName}</h2>
            </li>
          ))
        ) : (
          <li>No food items found for category - {data.category}</li>
        )}
      </ul>
    </div>
  );
}
