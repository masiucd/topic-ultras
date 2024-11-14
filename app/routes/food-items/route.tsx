import type {LoaderFunctionArgs} from "@remix-run/node";
import {
  type Location,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import {useMemo} from "react";
import {getFoodItemsData} from "~/.server/db/dao/food-items";
import {Input} from "~/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
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
import {cn} from "~/lib/utils";

// import  invariant from "tiny-invariant";

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let page = Number(url.searchParams.get("page")) || 1;
  return await getFoodItemsData(name, page);
}

// TODO : copy url feature to share the search results
export default function FoodItemsRoute() {
  let {results, totalPages, page} = useLoaderData<typeof loader>();
  let [searchParams] = useSearchParams();
  let location = useLocation();
  let name = searchParams.get("name");

  return (
    <div>
      <H1>Food Items</H1>
      <div className="my-10 max-w-[65rem]">
        <div>
          <SearchInput location={location} name={name} />
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
                  <PaginationComponent
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
  );
}

export function PaginationComponent(props: {
  page: number;
  location: Location;
  totalPages: number;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PreviousLink page={props.page} location={props.location} />
        </PaginationItem>
        <PaginationLinks
          page={props.page}
          location={props.location}
          totalPages={props.totalPages}
        />

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
  let xs = useMemo(
    () => Array.from({length: props.totalPages}, (_, i) => i + 1),
    [props.totalPages]
  );
  return xs.map((x) => {
    let searchParams = new URLSearchParams(props.location.search);
    searchParams.set("page", x.toString());
    let url = `${props.location.pathname}?${searchParams.toString()}`;
    return (
      <PaginationItem key={x}>
        <PaginationLink to={url} isActive={x === props.page}>
          {x}
        </PaginationLink>
      </PaginationItem>
    );
  });
}

function SearchInput(props: {location: Location; name: string | null}) {
  let navigate = useNavigate();
  let {location, name} = props;

  return (
    <Input
      type="text"
      placeholder="Search food items"
      defaultValue={name ?? undefined}
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
