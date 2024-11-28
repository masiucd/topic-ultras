import {Link, useLocation} from "react-router";
import {cn} from "~/lib/utils";
import {Icons} from "../icons";
import {TooltipComponent} from "../ui/tooltip";

export function Pagination(props: {
  page: number;

  totalPages: number;
}) {
  return (
    <div className="flex gap-2">
      <GoToFirstPage page={props.page} />
      <PreviousLink page={props.page} />
      <NextLink page={props.page} totalPages={props.totalPages} />
      <GoToLastPage page={props.page} totalPages={props.totalPages} />
    </div>
  );
}

// TODO: We need to take of consideration the total number of pages when amount of rows is changed
function GoToFirstPage(props: {page: number}) {
  let l = useLocation();
  let searchParams = new URLSearchParams(l.search);
  let page = searchParams.get("page");
  if (page !== null) {
    searchParams.delete("page");
  }
  searchParams.set("page", "1");
  let url = `${l.pathname}?${searchParams.toString()}`;
  return (
    <TooltipComponent
      content="Go to the first page"
      disabled={props.page === 1}
    >
      <Link
        to={url}
        className={cn("", props.page === 1 && "pointer-events-none opacity-50")}
      >
        <Icons.ChevronsLeft />
      </Link>
    </TooltipComponent>
  );
}

// TODO: We need to take of consideration the total number of pages when amount of rows is changed
function GoToLastPage(props: {page: number; totalPages: number}) {
  let l = useLocation();
  let searchParams = new URLSearchParams(l.search);
  let page = searchParams.get("page");
  if (page !== null) {
    searchParams.delete("page");
  }
  searchParams.set("page", props.totalPages.toString());
  let url = `${l.pathname}?${searchParams.toString()}`;
  return (
    <TooltipComponent
      content="Go to the last page"
      disabled={props.page === props.totalPages}
    >
      <Link
        to={url}
        className={cn(
          "",
          props.page === props.totalPages && "pointer-events-none opacity-50"
        )}
      >
        <Icons.ChevronsRight />
      </Link>
    </TooltipComponent>
  );
}

function PreviousLink(props: {page: number}) {
  let {page} = props;
  let l = useLocation();
  // TODO: Remove name param before navigating???
  let searchParams = new URLSearchParams(l.search);
  if (searchParams.get("page")) {
    searchParams.delete("page");
  }
  searchParams.set("page", (page - 1).toString());
  if (searchParams.get("page") === "1") {
    searchParams.delete("page");
  }
  let url = `${l.pathname}?${searchParams.toString()}`;
  let isDisabled = page < 2;
  return (
    <TooltipComponent
      content={
        props.page === 1
          ? "You are on the first page"
          : "Go to the previous page"
      }
    >
      <Link
        to={url}
        className={cn("", isDisabled && "pointer-events-none opacity-50")}
        aria-disabled={isDisabled}
      >
        <Icons.ChevronLeft />
      </Link>
    </TooltipComponent>
  );
}

function NextLink(props: {page: number; totalPages: number}) {
  let l = useLocation();
  let {page, totalPages} = props;
  let isDisabled = page >= totalPages;
  // TODO: Remove name param before navigating???
  let searchParams = new URLSearchParams(l.search);
  searchParams.set("page", (page + 1).toString());
  let url = `${l.pathname}?${searchParams.toString()}`;
  return (
    <TooltipComponent
      content={
        props.page === props.totalPages
          ? "You are on the last page"
          : "Go to the next page"
      }
    >
      <Link
        to={url}
        className={cn("", isDisabled && "pointer-events-none opacity-50")}
      >
        <Icons.ChevronRight />
      </Link>
    </TooltipComponent>
  );
}
