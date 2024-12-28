import {eq} from "drizzle-orm";
import {Link} from "react-router";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import {Icons} from "~/components/icons";
import {List, Span} from "~/components/ui/typography";
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
        nutrientId: foodNutrients.id, // nullable
        slug: slugs.slug, // nullable
      })
      .from(foodItems)
      .innerJoin(
        foodCategories,
        eq(foodCategories.id, foodItems.foodCategoryId)
      )
      .leftJoin(foodNutrients, eq(foodNutrients.foodId, foodItems.id))
      .leftJoin(slugs, eq(slugs.objectId, foodItems.id))
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
      <Link
        to={`/food-categories/${data.category}`}
        className="flex items-center gap-1 underline transition-all duration-150 hover:opacity-45"
      >
        <Icons.LeftArrow /> <Span>Category</Span>
      </Link>

      <List>
        {data.foodItems.length > 0 ? (
          data.foodItems.map((item) => (
            <li key={item.foodId}>
              {item.nutrientId !== null && item.slug !== null ? (
                <Link
                  to={`/food-items/${item.slug}`}
                  className="underline transition-all duration-150 hover:opacity-45"
                >
                  <Span>{item.foodName}</Span>
                </Link>
              ) : (
                <Span className="opacity-80">{item.foodName}</Span>
              )}
            </li>
          ))
        ) : (
          <li>No food items found for category - {data.category}</li>
        )}
      </List>
    </section>
  );
}
