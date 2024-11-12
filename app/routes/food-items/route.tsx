import type {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData, useSearchParams} from "@remix-run/react";
import {eq, ilike, sql} from "drizzle-orm";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {H1} from "~/components/ui/typography";
// import  invariant from "tiny-invariant";

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let term = url.searchParams.get("name");
  let limit = Number.parseInt(url.searchParams.get("limit") ?? "4", 10);
  let skip = Number.parseInt(url.searchParams.get("skip") ?? "0", 10);
  console.log({term, limit, skip});

  let name = undefined;
  // let limit = 4;
  // let skip = 0;
  let results = await db
    .select({
      foodId: foodItems.id,
      foodName: foodItems.name,
      foodDescription: foodItems.description,
      foodCategory: {
        id: foodCategories.id,
        name: foodCategories.name,
      },
      slug: slugs.slug,
      nutrients: {
        calories: foodNutrients.calories,
        protein: foodNutrients.protein,
        fat: foodNutrients.fat,
        carbs: foodNutrients.carbs,
      },
    })
    .from(foodItems)

    .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
    .leftJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
    .leftJoin(slugs, eq(foodItems.id, slugs.objectId))
    .orderBy(sql`${foodItems.name} ASC`)
    .where(name ? ilike(foodItems.name, `%${name}%`) : undefined)
    .limit(limit)
    .offset(skip);

  return results;
}

export default function FoodItemsRoute() {
  let results = useLoaderData<typeof loader>();
  let [s] = useSearchParams();
  console.log("s", s);
  return (
    <div>
      <H1>Food Items</H1>
      <div className="my-10 max-w-[65rem]">
        <Table title="Food items table">
          <TableCaption>Food Items in the Database.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Fat</TableHead>
              <TableHead>Carbs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.foodId}>
                <TableCell>{result.foodId}</TableCell>
                <TableCell>{result.foodName}</TableCell>
                <TableCell>{result.foodDescription}</TableCell>
                <TableCell>{result.foodCategory?.name ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.calories ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.protein ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.fat ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.carbs ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
