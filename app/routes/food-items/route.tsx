import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node"; // or cloudflare/deno
import {
  Form,
  type Location,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import {useMemo} from "react";
import {amountOfRows} from "~/.server/cookies/rows";
import {getFoodItemsData} from "~/.server/db/dao/food-items";
import {FoodCategory} from "~/components/food-category";
import PageWrapper from "~/components/page-wrapper";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
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
import {H1, Lead} from "~/components/ui/typography";
import {cn} from "~/lib/utils";
import {SearchInput} from "./components/search-input";

// import  invariant from "tiny-invariant";

export async function action({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let rows = formData.get("rows");
  console.log("rows  SERVER ", rows);
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

  console.log("cookie", cookie);

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
      <div className="mx-auto my-10 w-full max-w-[65rem] border border-red-500 ">
        <div className="mb-2">
          <SearchInput location={location} name={name} />
        </div>
        <Table title="Food items table">
          <TableCaption>Food Items in the Database.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">ID</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[250px]">Description</TableHead>
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
                <TableCell>
                  <FoodCategory name={result.foodCategory?.name} />
                </TableCell>
                <TableCell>{result.nutrients?.calories ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.protein ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.fat ?? "N/A"}</TableCell>
                <TableCell>{result.nutrients?.carbs ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="bg-red-400">
                <div className="flex flex-col gap-1">
                  <span>
                    Page {page} / {totalPages}
                  </span>
                  {/* <span>
                    {page === totalPages
                      ? totalFoodItems
                      : (page - 1) * results.length + results.length}{" "}
                    of {totalFoodItems} food items
                  </span> */}
                </div>
              </TableCell>
              <TableCell colSpan={2} className="bg-blue-300">
                <div className="flex items-center justify-end gap-2">
                  <SelectRows rows={rows} />
                </div>
              </TableCell>
              <TableCell colSpan={4} className="bg-green-400">
                {/* <div className="flex justify-end gap-2"> */}
                <PaginationComponent
                  page={page}
                  location={location}
                  totalPages={totalPages}
                />
                {/* </div> */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </PageWrapper>
  );
}

function SelectRows(props: {rows: number}) {
  return (
    <Form method="post" id="rows">
      <fieldset className="flex gap-1">
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
        <button type="submit">Rows per page </button>
      </fieldset>
    </Form>
  );
}

export function PaginationComponent(props: {
  page: number;
  location: Location;
  totalPages: number;
}) {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PreviousLink page={props.page} location={props.location} />
        </PaginationItem>
        {/* <PaginationLinks
          page={props.page}
          location={props.location}
          totalPages={props.totalPages}
        /> */}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <NextLink
            page={props.page}
            totalPages={props.totalPages}
            location={props.location}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function PaginationLinks(props: {
  page: number;
  location: Location;
  totalPages: number;
}) {
  let pages = useMemo(
    () => Array.from({length: props.totalPages}, (_, i) => i + 1),
    [props.totalPages]
  );
  return pages.map((page) => {
    let searchParams = new URLSearchParams(props.location.search);
    searchParams.set("page", page.toString());
    let url = `${props.location.pathname}?${searchParams.toString()}`;

    return (
      <PaginationItem key={page}>
        <PaginationLink to={url} isActive={page === props.page}>
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  });
}

function PreviousLink(props: {page: number; location: Location}) {
  let {page, location} = props;
  // TODO: Remove name param before navigating???
  let searchParams = new URLSearchParams(location.search);
  if (searchParams.get("page")) {
    searchParams.delete("page");
  }
  searchParams.set("page", (page - 1).toString());
  if (searchParams.get("page") === "1") {
    searchParams.delete("page");
  }
  let url = `${location.pathname}?${searchParams.toString()}`;
  let isDisabled = page < 2;
  return (
    <PaginationPrevious
      to={url}
      className={cn("", isDisabled && "pointer-events-none opacity-50")}
      aria-disabled={isDisabled}
    />
  );
  // return <Link to={url}>Prev</Link>;
}

function NextLink(props: {
  page: number;
  totalPages: number;
  location: Location;
}) {
  let {page, totalPages, location} = props;
  let isDisabled = page >= totalPages;
  // TODO: Remove name param before navigating???
  let searchParams = new URLSearchParams(location.search);
  searchParams.set("page", (page + 1).toString());
  let url = `${location.pathname}?${searchParams.toString()}`;
  return (
    <PaginationNext
      to={url}
      className={cn("", isDisabled && "pointer-events-none opacity-50")}
    />
  );
}
