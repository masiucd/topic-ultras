import {eq} from "drizzle-orm";
import {Link} from "react-router";
import {db} from "~/.server/db";
import {foodCategories, foodItems} from "~/.server/db/schema";
import {H3} from "~/components/ui/typography";
import type {Route} from "./+types/food-items";

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "max-age=60",
  };
}

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
    <section>
      <div>
        <H3>Food items for category - {data.category}</H3>
        <Link to={`/food-categories/${data.category}`}>
          Go back to category
        </Link>
      </div>

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
    </section>
  );
}
