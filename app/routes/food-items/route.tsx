import type {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData, useLocation, useNavigate} from "@remix-run/react";
import {eq, ilike, sql} from "drizzle-orm";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import {Input} from "~/components/ui/input";
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
  let name = url.searchParams.get("name");
  let limit = Number.parseInt(url.searchParams.get("limit") ?? "4", 10);
  let skip = Number.parseInt(url.searchParams.get("skip") ?? "0", 10);
  console.log({name, limit, skip});

  // let limit = 4;
  // let skip = 0;
  try {
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
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function FoodItemsRoute() {
  let results = useLoaderData<typeof loader>();

  return (
    <div>
      <H1>Food Items</H1>
      <div className="my-10 max-w-[65rem]">
        <div>
          <SearchInput />
        </div>
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

function SearchInput() {
  // let [s] = useSearchParams();
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <Input
      type="text"
      placeholder="Search food items"
      onChange={(e) => {
        let search = new URLSearchParams(location.search);
        search.set("name", e.target.value);
        console.log("search", search.get("name"));
        navigate(`${location.pathname}?${search.toString()}`);
        if (e.target.value === "") {
          search.delete("name");
          navigate(`${location.pathname}?${search.toString()}`);
        }
      }}
    />
  );
}
