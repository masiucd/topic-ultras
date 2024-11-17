import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node"; // or cloudflare/deno
import {
  Form,
  Link,
  type Location,
  useLoaderData,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {useState} from "react";
import {foodItemsCookie, parseCookie} from "~/.server/cookies/food-items";
import {type FoodItemData, getFoodItemsData} from "~/.server/db/dao/food-items";
import {FoodCategory} from "~/components/food-category";
import {Pagination} from "~/components/food-items/pagination";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import PageWrapper from "~/components/page-wrapper";
import {Button} from "~/components/ui/button";
import {Checkbox} from "~/components/ui/checkbox";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
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

export async function action({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let rows = formData.get("rows");
  let categories = formData.getAll("category");
  let cookieHeader = request.headers.get("Cookie");
  let cookie = await parseCookie(cookieHeader);
  console.log({categories, cookie});

  if (rows) {
    cookie.rows = Number(rows);
  }
  if (categories.length > 0) {
    // do something with category
    cookie.categories = categories;
  }

  return redirect("/food-items", {
    headers: {
      "Set-Cookie": await foodItemsCookie.serialize(cookie),
    },
  });
}

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let page = Number(url.searchParams.get("page")) || 1;

  let cookieHeader = request.headers.get("Cookie");
  let cookie = await parseCookie(cookieHeader);

  return {
    ...(await getFoodItemsData(name, page, cookie.rows)),
    rows: cookie.rows,
  };
}

// TODO : copy url feature to share the search results
export default function FoodItemsRoute() {
  let {results, totalPages, page, totalFoodItems, rows, allFoodCategories} =
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
        <div className="mb-2 flex gap-2">
          <div>
            <SearchInput location={location} name={name} />
          </div>
          <CategoryFilter
            results={results}
            allFoodCategories={allFoodCategories}
          />
        </div>
        <div className="rounded-lg border-2">
          <FoodItems
            page={page}
            totalPages={totalPages}
            totalFoodItems={totalFoodItems}
            rows={rows}
            results={results}
            location={location}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

function CategoryFilter(props: {
  results: FoodItemData["results"];
  allFoodCategories: FoodItemData["allFoodCategories"];
}) {
  // TODO use form hooks to improve UX
  let submit = useSubmit();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Category />
          Category
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form
          method="post"
          onChange={(e) => {
            console.log(e.currentTarget);
            submit(e.currentTarget);
          }}
        >
          <fieldset>
            <input type="hidden" name="_action" />
            {props.allFoodCategories.map((c) => (
              <div key={c.id} className="mb-1 flex items-center gap-2">
                <Checkbox id={c.name} name="category" value={c.id} />
                <label htmlFor={c.name}>{c.name}</label>
              </div>
            ))}
            {/* <Button type="submit">Apply</Button> */}
          </fieldset>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

function FoodItems(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  rows: number;
  results: FoodItemData["results"];
  location: Location;
}) {
  let {page, totalPages, totalFoodItems, rows, results, location} = props;
  let [selectedFoodItems, setSelectedFoodItems] = useState<Set<number>>(
    new Set()
  );
  return (
    <Table title="Food items table">
      <TableCaption>Food Items in the Database.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">
            <Checkbox
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFoodItems((p) => {
                    let newSet = new Set(p);
                    for (const item of results) {
                      newSet.add(item.foodId);
                    }
                    return newSet;
                  });
                } else {
                  setSelectedFoodItems(new Set());
                }
              }}
            />
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
              <Checkbox
                checked={selectedFoodItems.has(item.foodId)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFoodItems((p) => {
                      let newSet = new Set(p);
                      newSet.add(item.foodId);
                      return newSet;
                    });
                  } else {
                    setSelectedFoodItems((p) => {
                      let newSet = new Set(p);
                      newSet.delete(item.foodId);
                      return newSet;
                    });
                  }
                }}
              />
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
              <FoodCategory withLink name={item.foodCategory?.name} />
            </TableCell>
            <TableCell>{item.nutrients?.calories ?? "N/A"}</TableCell>
            <TableCell>{item.nutrients?.protein ?? "N/A"}</TableCell>
            <TableCell>{item.nutrients?.fat ?? "N/A"}</TableCell>
            <TableCell>{item.nutrients?.carbs ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Footer
        page={page}
        totalPages={totalPages}
        totalFoodItems={totalFoodItems}
        rows={rows}
        results={results}
        location={location}
      />
    </Table>
  );
}

function Footer(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  rows: number;
  results: FoodItemData["results"];
  location: Location;
}) {
  let {page, totalPages, totalFoodItems, rows, results, location} = props;
  return (
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
              <SelectRows rows={rows} totalFoodItems={totalFoodItems} />
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
  );
}

function SelectRows(props: {rows: number; totalFoodItems: number}) {
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
            {makeRowValues(props.totalFoodItems).map((p) => (
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

function makeRowValues(totalFoodItems: number) {
  let xs = [];
  for (let i = 2; i < totalFoodItems; i += 2) {
    xs.push(i);
  }
  return xs;
}
