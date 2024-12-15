import {Link, useOutletContext} from "react-router";
import type {FoodCategoryData} from "~/.server/db/dao/food-categories";
import {Span} from "~/components/ui/typography";

export default function CategoryRoute() {
  let ctx = useOutletContext<{foodCategory: FoodCategoryData}>();

  return (
    <div>
      <h1>Category route</h1>
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
