import {Link, type Location} from "@remix-run/react";
import {cn} from "~/lib/utils";
import {Icons} from "../icons";

export function Pagination(props: {
  page: number;
  location: Location;
  totalPages: number;
}) {
  return (
    <div className="flex gap-2">
      <Link
        to={`${props.location.pathname}?page=1`}
        className={cn("", props.page === 1 && "pointer-events-none opacity-50")}
      >
        <Icons.ChevronsLeft />
      </Link>
      <PreviousLink page={props.page} location={props.location} />
      <NextLink
        page={props.page}
        totalPages={props.totalPages}
        location={props.location}
      />
      <Link
        to={`${props.location.pathname}?page=${props.totalPages}`}
        className={cn(
          "",
          props.page === props.totalPages && "pointer-events-none opacity-50"
        )}
      >
        <Icons.ChevronsRight />
      </Link>
    </div>
  );
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
    <Link
      to={url}
      className={cn("", isDisabled && "pointer-events-none opacity-50")}
      aria-disabled={isDisabled}
    >
      <Icons.ChevronLeft />
    </Link>
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
    <Link
      to={url}
      className={cn("", isDisabled && "pointer-events-none opacity-50")}
    >
      <Icons.ChevronRight />
    </Link>
  );
}
