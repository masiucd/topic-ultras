import type {Route} from "./+types/category";

export async function loader({params}: Route.LoaderArgs) {
  return params.category ? params.category : null;
}

export default function FoodItemsForFoodCategoryRoute({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Food items for category - TODO</h1>
    </div>
  );
}
