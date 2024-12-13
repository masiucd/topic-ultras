import {Link, useOutletContext} from "react-router";
import type {FoodCategoryData} from "~/.server/db/dao/food-categories";
import {Span} from "~/components/ui/typography";
import type {Route} from "./+types/category";

export async function loader({params}: Route.LoaderArgs) {
  return params.category ? params.category : null;
}

export default function CategoryRoute({loaderData}: Route.ComponentProps) {
  let ctx = useOutletContext<{foodCategory: FoodCategoryData}>();

  return (
    <div>
      {ctx.foodCategory && (
        <div>
          <Link
            to={`/food-categories/${ctx.foodCategory?.name}/food-items`}
            className="underline transition-all duration-150 hover:opacity-45"
          >
            View all food items for category -{" "}
            <Span className="capitalize">{ctx.foodCategory?.name}</Span>
          </Link>
        </div>
      )}
    </div>
  );
}
