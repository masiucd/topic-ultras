import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node"; // or cloudflare/deno
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {amountOfRows} from "~/.server/cookies/rows";
import {getFoodItemsData} from "~/.server/db/dao/food-items";
import {FoodCategory} from "~/components/food-category";
import {Pagination} from "~/components/food-items/pagination";
import {SearchInput} from "~/components/food-items/search-input";
import PageWrapper from "~/components/page-wrapper";
import {Checkbox} from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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
import {H1, Lead, Span} from "~/components/ui/typography";
import {cn} from "~/lib/utils";

// import  invariant from "tiny-invariant";

export async function action({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let rows = formData.get("rows");
  const cookieHeader = request.headers.get("Cookie");
  let cookie = (await amountOfRows.parse(cookieHeader)) || {rows: 4};

  if (rows) {
    cookie.rows = Number(rows);
  }

  return redirect("/food-items", {
    headers: {
      "Set-Cookie": await amountOfRows.serialize(cookie),
    },
  });
}

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let page = Number(url.searchParams.get("page")) || 1;

  let cookieHeader = request.headers.get("Cookie");
  let cookie = (await amountOfRows.parse(cookieHeader)) || {rows: 4};

  return {
    ...(await getFoodItemsData(name, page, cookie.rows)),
    rows: cookie.rows,
  };
}

// TODO : copy url feature to share the search results
export default function FoodItemsRoute() {
  let {results, totalPages, page, totalFoodItems, rows} =
    useLoaderData<typeof loader>();
  let [searchParams] = useSearchParams();
  let location = useLocation();
  let name = searchParams.get("name");

  return (
    <PageWrapper>
      <H1>Food Items</H1>
      <Lead>
        Nutrition facts for the food you love. Search for food items by name.
      </Lead>
      <div className="mx-auto my-10 w-full max-w-[80rem]">
        <div className="mb-2">
          <SearchInput location={location} name={name} />
        </div>
        <div className="rounded-lg border-2">
          <Table title="Food items table">
            <TableCaption>Food Items in the Database.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Protein</TableHead>
                <TableHead>Fat</TableHead>
                <TableHead>Carbs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.foodId}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Link
                      className={cn(
                        item.slug
                          ? "underline hover:no-underline hover:opacity-50"
                          : "pointer-events-none opacity-80"
                      )}
                      to={`/food-items/${item.slug}`}
                    >
                      {item.foodName}
                    </Link>
                  </TableCell>
                  <TableCell>{item.foodDescription}</TableCell>
                  <TableCell>
                    <FoodCategory name={item.foodCategory?.name} />
                  </TableCell>
                  <TableCell>{item.nutrients?.calories ?? "N/A"}</TableCell>
                  <TableCell>{item.nutrients?.protein ?? "N/A"}</TableCell>
                  <TableCell>{item.nutrients?.fat ?? "N/A"}</TableCell>
                  <TableCell>{item.nutrients?.carbs ?? "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="flex gap-5">
                    <span>
                      Page {page} / {totalPages}
                    </span>
                    <span>
                      {page === totalPages
                        ? totalFoodItems
                        : (page - 1) * results.length + results.length}{" "}
                      of {totalFoodItems} food items
                    </span>
                  </div>
                </TableCell>
                <TableCell colSpan={5}>
                  <div className="flex items-center ">
                    <div className="mr-3 flex flex-1 items-center justify-end gap-3 ">
                      <Span>Rows per page</Span>
                      <SelectRows rows={rows} />
                    </div>

                    <Pagination
                      page={page}
                      location={location}
                      totalPages={totalPages}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </PageWrapper>
  );
}

function SelectRows(props: {rows: number}) {
  let submit = useSubmit();
  return (
    <Form
      method="post"
      id="rows"
      onChange={(e) => {
        submit(e.currentTarget);
      }}
    >
      <fieldset className="flex flex-row-reverse items-center gap-2">
        <Select name="rows">
          <SelectTrigger className="h-7 w-[60px]">
            <SelectValue placeholder={props.rows} />
          </SelectTrigger>
          <SelectContent>
            {[4, 6, 8, 10, 12, 14, 16].map((p) => (
              <SelectItem key={p} value={p.toString()}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
    </Form>
  );
}
