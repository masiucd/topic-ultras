import {eq} from "drizzle-orm";
import {Link} from "react-router";
import {db} from "~/.server/db";
import {foodCategories} from "~/.server/db/schema";
import {H1, P} from "~/components/ui/typography";
import type {Route} from "./+types/category";

export async function loader({params}: Route.LoaderArgs) {
  try {
    let results = await db
      .select()
      .from(foodCategories)
      .where(eq(foodCategories.name, params.category));
    return {
      foodCategory: results.length > 0 ? results[0] : null,
    };
  } catch (error) {
    console.error(error);
    return {foodCategory: null};
  }
}

export default function CategoryRoute({loaderData}: Route.ComponentProps) {
  let {foodCategory} = loaderData;
  if (foodCategory === null) {
    return <H1>Category not found</H1>;
  }
  return (
    <div>
      <div>
        <div>
          <H1>Food category - {foodCategory.name}</H1>
          {foodCategory.description !== null && (
            <P>{foodCategory.description}</P>
          )}
        </div>

        <Link
          to={`/food-categories/${foodCategory.name}/food-items`}
          className="underline transition-all duration-150 hover:opacity-45"
        >
          View all food items for this category
        </Link>
      </div>
    </div>
  );
}
