import {eq} from "drizzle-orm";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import PageWrapper from "~/components/page-wrapper";
import {P} from "~/components/ui/typography";
import type {Route} from "./+types/food-item";

export function meta({params}: Route.MetaArgs) {
  return [
    {
      title: `Food Item - ${params.slug}`,
    },
    {
      property: "og:title",
      content: `Food Item - ${params.slug}`,
    },
    {
      name: "description",
      content: `Food item details about the food you love - ${params.slug}.`,
    },
  ];
}

export async function loader({params}: Route.LoaderArgs) {
  // params.slug
  try {
    let results = await db
      .select({
        id: foodItems.id,
        name: foodItems.name,
        description: foodItems.description,
        category: foodCategories.name,
        nutrients: {
          calories: foodNutrients.calories,
          protein: foodNutrients.protein,
          fat: foodNutrients.fat,
          carbs: foodNutrients.carbs,
        },
      })
      .from(foodItems)
      .innerJoin(slugs, eq(foodItems.id, slugs.objectId))
      .innerJoin(
        foodCategories,
        eq(foodItems.foodCategoryId, foodCategories.id)
      )
      .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
      .where(eq(slugs.slug, params.slug));

    return {
      foodItem: results.length > 0 ? results[0] : null,
    };
  } catch (error) {
    console.error(error);
    return {foodItem: null};
  }
}

export default function FoodItemRoute({
  params,
  loaderData,
}: Route.ComponentProps) {
  let {foodItem} = loaderData;
  return (
    <PageWrapper>
      {foodItem !== null ? (
        <div>
          <P>Name: {foodItem.name}</P>
          <P>Description: {foodItem.description}</P>
          <P>Category: {foodItem.category}</P>
        </div>
      ) : (
        <P>Food item not found with slug: {params.slug}</P>
      )}
    </PageWrapper>
  );
}
