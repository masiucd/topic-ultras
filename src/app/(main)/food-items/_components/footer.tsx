import {TableCell, TableFooter, TableRow} from "@/components/ui/table";
import {Muted} from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import type {Route} from "next";
import Link from "next/link";

export function Footer(props: {
  skip: number;
  limit: number;
  totalFoodItems: number;
  searchParams: Record<string, string>;
  itemsPerPage: number;
}) {
  let {skip, limit, totalFoodItems, itemsPerPage} = props;
  let page = Math.floor(skip / limit) + 1;
  let totalPages = Math.ceil(totalFoodItems / itemsPerPage);
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={7}>
          <Muted>
            Page {page} of {totalPages} pages
          </Muted>
          <Muted>{totalFoodItems} items in total</Muted>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <PrevLink
              limit={limit}
              skip={skip}
              searchParams={props.searchParams}
              page={page}
            />
            <NextLink
              skip={skip}
              limit={limit}
              searchParams={props.searchParams}
              page={page}
              totalPages={totalPages}
            />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

function PrevLink(props: {
  skip: number;
  limit: number;
  searchParams: Record<string, string>;
  page: number;
}) {
  let {skip, limit, searchParams, page} = props;
  let url = new URLSearchParams(searchParams);
  if (page === 2) {
    url.delete("skip");
    url.delete("limit");
  } else {
    url.set("skip", `${skip - limit}`);
    url.set("limit", `${limit}`);
  }
  let prevUrl = `food-items/?${url.toString()}` as Route<string>;
  return (
    <Link
      className={cn("", page === 1 ? "pointer-events-none" : "")}
      href={prevUrl}
    >
      Prev
    </Link>
  );
}

function NextLink(porps: {
  skip: number;
  limit: number;
  searchParams: Record<string, string>;
  page: number;
  totalPages: number;
}) {
  let {skip, limit, searchParams, page, totalPages} = porps;
  let url = new URLSearchParams(searchParams);
  if (page >= 1) {
    url.set("skip", `${skip + limit}`);
    url.set("limit", `${limit}`);
  }
  let nextUrl = `food-items/?${url.toString()}` as Route<string>;

  let isDisabled = page === totalPages;
  return (
    <Link
      className={cn("", isDisabled ? "pointer-events-none opacity-50" : "")}
      aria-disabled={isDisabled}
      aria-label={isDisabled ? "Next page disabled" : "Go to next page"}
      href={nextUrl}
    >
      Next
    </Link>
  );
}
