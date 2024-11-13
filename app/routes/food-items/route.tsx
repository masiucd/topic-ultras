import type {LoaderFunctionArgs} from "@remix-run/node";
import {Link, useLoaderData, useLocation, useNavigate} from "@remix-run/react";
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

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  // let limit = Number.parseInt(url.searchParams.get("limit") ?? "4", 10);
  // let skip = Number.parseInt(url.searchParams.get("skip") ?? "0", 10);
  let perPage = 4;
  let page = url.searchParams.get("page");

  try {
    let totalUsers = await db
      .select({count: sql`count(*)`.mapWith(Number)})
      .from(foodItems);

    let totalPages = Math.ceil(totalUsers[0].count / perPage);
    let pageFromUrl =
      typeof page === "string" && Number.parseInt(page, 10) <= totalPages
        ? Number.parseInt(page, 10)
        : 1;

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
      .limit(perPage)
      .offset((pageFromUrl - 1) * perPage);

    return {
      results,
      page: pageFromUrl,
      totalPages,
    };
  } catch (error) {
    console.error(error);
    return {
      results: [],
      page: 1,
      totalPages: 1,
    };
  }
}

export default function FoodItemsRoute() {
  let {results} = useLoaderData<typeof loader>();

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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total</TableCell>
              <TableCell className="">
                <Navigation />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

function SearchInput() {
  let navigate = useNavigate();
  let location = useLocation();
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

// function TableNavigation() {
//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious href="#" />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#">1</PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationEllipsis />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationNext href="#" />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }

function Navigation() {
  let location = useLocation();

  let search = new URLSearchParams(location.search);
  console.log("search.toString()", search.toString());
  let page = Number.parseInt(search.get("page") ?? "1", 10);

  let prevLinkPath =
    page !== null && page > 2
      ? `${location.pathname}?page=${page - 1}`
      : location.pathname;

  let nextLinkPath =
    page !== null ? `${location.pathname}?page=${page + 1}` : location.pathname;

  console.log("🚀 ~ Navigation ~ prevLinkPath:", prevLinkPath);
  console.log("page", page);

  return (
    <div className="flex gap-2">
      {/* <Link
        to={prevLinkPath}
        // className={cn("", page <= 1 ? "pointer-events-none text-gray-400" : "")}
      >
        Prev
      </Link> */}
      <PreviousLink />
      <NextLink />
      {/* <Link to={nextLinkPath}>Next</Link> */}
    </div>
  );
}

function PreviousLink() {
  let location = useLocation();
  let search = new URLSearchParams(location.search);
  if (search.get("name")) {
    search.delete("name");
  }
  let page = Number.parseInt(search.get("page") ?? "1", 10);
  if (page < 2) {
    console.log("RENDER BUTTON");
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
  let to =
    page > 2 ? `${location.pathname}?page=${page - 1}` : location.pathname;
  return <Link to={to}>Prev</Link>;
}

function NextLink() {
  let location = useLocation();
  let search = new URLSearchParams(location.search);
  if (search.get("name")) {
    search.delete("name");
  }
  let page = Number.parseInt(search.get("page") ?? "1", 10);
  let to = `${location.pathname}?page=${page + 1}`;
  return <Link to={to}>Next</Link>;
}
