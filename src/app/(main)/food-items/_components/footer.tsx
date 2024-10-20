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

const linkClassName = "underline hover:opacity-55";

function PrevLink(props: {
  skip: number;
  limit: number;
  searchParams: Record<string, string>;
  page: number;
}) {
  let {skip, limit, searchParams, page} = props;
  if (page === 1) {
    return (
      <button
        disabled
        aria-description="Previous page disabled"
        className="opacity-50 cursor-not-allowed"
      >
        Prev
      </button>
    );
  }
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
    <Link className={linkClassName} href={prevUrl}>
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
  if (page === totalPages) {
    return (
      <button
        disabled
        aria-description="Next page disabled"
        className="opacity-50 cursor-not-allowed"
      >
        Next
      </button>
    );
  }
  let url = new URLSearchParams(searchParams);
  if (page >= 1) {
    url.set("skip", `${skip + limit}`);
    url.set("limit", `${limit}`);
  }
  let nextUrl = `food-items/?${url.toString()}` as Route<string>;

  return (
    <Link href={nextUrl} className={linkClassName}>
      Next
    </Link>
  );
}
