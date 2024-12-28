import {Link} from "react-router";
import {db} from "~/.server/db";
import {foodCategories} from "~/.server/db/schema";
import {List, Span} from "~/components/ui/typography";
import type {Route} from "./+types";

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
      <List>
        {loaderData.map((category) => (
          <li key={category.id}>
            <Link to={`/food-categories/${category.name}`}>
              <Span>{category.name}</Span>
            </Link>
            {/* view food for food categories */}
          </li>
        ))}
      </List>
    </div>
  );
}
