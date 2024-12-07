import {db} from "~/.server/db";
import {foodCategories} from "~/.server/db/schema";
import {List} from "~/components/ui/typography";
import type {Route} from "./+types/categories";

export async function loader() {
  try {
    let results = await db
      .select({
        id: foodCategories.id,
        name: foodCategories.name,
      })
      .from(foodCategories);
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function CategoriesRoute({loaderData}: Route.ComponentProps) {
  return (
    <div>
      <h1>Categories</h1>
      <List>
        {loaderData.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </List>
    </div>
  );
}
