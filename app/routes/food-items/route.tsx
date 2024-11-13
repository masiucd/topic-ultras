import type {LoaderFunctionArgs} from "@remix-run/node";
import {
  Link,
  type Location,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import {eq, ilike, sql} from "drizzle-orm";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import {Input} from "~/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "~/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {H1} from "~/components/ui/typography";

// import  invariant from "tiny-invariant";
const PER_PAGE = 4;

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let page = Number(url.searchParams.get("page")) || 1;

  try {
    let totalUsers = await db
      .select({count: sql`count(*)`.mapWith(Number)})
      .from(foodItems);

    let totalPages = Math.ceil(totalUsers[0].count / PER_PAGE);

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
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE);

    return {
      results,
      totalPages,
      page,
    };
  } catch (error) {
    console.error(error);
    return {
      results: [],
      totalPages: 1,
      page: 1,
    };
  }
}

export default function FoodItemsRoute() {
  let {results, totalPages, page} = useLoaderData<typeof loader>();
  let location = useLocation();
  return (
    <div>
      <H1>Food Items</H1>
      <div className="my-10 max-w-[65rem]">
        <div>
          <SearchInput location={location} />
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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total</TableCell>
              <TableCell className="">
                <div className="flex gap-2">
                  <PreviousLink page={page} location={location} />
                  <NextLink
                    page={page}
                    totalPages={totalPages}
                    location={location}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

function SearchInput(props: {location: Location}) {
  let navigate = useNavigate();
  let {location} = props;

  return (
    <Input
      type="text"
      placeholder="Search food items"
      onChange={(e) => {
        let search = new URLSearchParams(location.search);
        search.set("name", e.target.value);
        if (search.get("page")) {
          search.delete("page");
        }
        navigate(`${location.pathname}?${search.toString()}`);
        if (e.target.value === "") {
          search.delete("name");
          navigate(`${location.pathname}?${search.toString()}`);
        }
      }}
    />
  );
}

function PreviousLink(props: {page: number; location: Location}) {
  let {page, location} = props;
  if (page < 2) {
    return (
      <button
        className="opacity-50"
        disabled
        aria-disabled="true"
        type="button"
      >
        Prev
      </button>
    );
  }
  let searchParams = new URLSearchParams(location.search);
  if (searchParams.get("page")) {
    searchParams.delete("page");
  }
  searchParams.set("page", (page - 1).toString());
  if (searchParams.get("page") === "1") {
    searchParams.delete("page");
  }
  let url = `${location.pathname}?${searchParams.toString()}`;
  return <Link to={url}>Prev</Link>;
}

function NextLink(props: {
  page: number;
  totalPages: number;
  location: Location;
}) {
  let {page, totalPages, location} = props;
  if (page >= totalPages) {
    return (
      <button
        className="opacity-50"
        disabled
        aria-disabled="true"
        type="button"
      >
        Next
      </button>
    );
  }
  let searchParams = new URLSearchParams(location.search);
  searchParams.set("page", (page + 1).toString());
  let url = `${location.pathname}?${searchParams.toString()}`;
  return <Link to={url}>Next</Link>;
}
