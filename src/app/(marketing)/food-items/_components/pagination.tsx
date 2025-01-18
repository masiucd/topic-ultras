"use client";

import {Icons} from "@/components/icons";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

export function Pagination({
  page,
  amountOfPages,
}: {
  page: number;
  amountOfPages: number;
}) {
  return (
    <div className="flex justify-end gap-2" data-testid="pagination">
      <FirstPage page={page} />
      <PreviousPage page={page} />
      <NextPage page={page} amountOfPages={amountOfPages} />
      <LastPage page={page} amountOfPages={amountOfPages} />
    </div>
  );
}

function NextPage({
  page,
  amountOfPages,
}: {
  page: number;
  amountOfPages: number;
}) {
  let searchParams = useSearchParams();
  let pathname = usePathname();
  let isOverLastPage = page >= amountOfPages;
  let newSearchParams = new URLSearchParams(searchParams);
  if (page >= 1 && !isOverLastPage) {
    newSearchParams.set("page", (page + 1).toString());
  } else if (page <= 1) {
    newSearchParams.delete("page");
  }
  let newUrl = `${pathname}?${newSearchParams.toString()}`;

  return (
    <Link
      className={cn(
        DEFAULT_STYLES,
        isOverLastPage && "cursor-not-allowed opacity-45 hover:opacity-45"
      )}
      href={newUrl}
      aria-disabled={isOverLastPage}
    >
      <Icons.ChevronRight />
    </Link>
  );
}

function PreviousPage({page}: {page: number}) {
  let searchParams = useSearchParams();
  let pathname = usePathname();
  let isUnderFirstPage = page <= 1;
  let newSearchParams = new URLSearchParams(searchParams);
  if (page <= 2) {
    newSearchParams.delete("page");
  } else if (page > 1 && !isUnderFirstPage) {
    newSearchParams.set("page", (page - 1).toString());
  }
  let newUrl = `${pathname}?${newSearchParams.toString()}`;
  return (
    <Link
      className={cn(
        DEFAULT_STYLES,
        isUnderFirstPage && "cursor-not-allowed opacity-45 hover:opacity-45"
      )}
      aria-disabled={isUnderFirstPage}
      href={newUrl}
    >
      <Icons.ChevronLeft />
    </Link>
  );
}

function FirstPage({page}: {page: number}) {
  let searchParams = useSearchParams();
  let pathname = usePathname();
  let newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.delete("page");
  let newUrl = `${pathname}?${newSearchParams.toString()}`;
  return (
    <Link
      className={cn(
        DEFAULT_STYLES,
        page <= 1 && "cursor-not-allowed opacity-45 hover:opacity-45"
      )}
      aria-disabled={page <= 1}
      href={newUrl}
    >
      <Icons.ChevronsLeft />
    </Link>
  );
}
function LastPage({
  page,
  amountOfPages,
}: {
  page: number;
  amountOfPages: number;
}) {
  let searchParams = useSearchParams();
  let pathname = usePathname();
  let newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("page", amountOfPages.toString());
  let newUrl = `${pathname}?${newSearchParams.toString()}`;
  return (
    <Link
      className={cn(
        DEFAULT_STYLES,
        page >= amountOfPages &&
          "cursor-not-allowed opacity-45 hover:opacity-45"
      )}
      aria-disabled={page >= amountOfPages}
      href={newUrl}
    >
      <Icons.ChevronsRight />
    </Link>
  );
}

const DEFAULT_STYLES =
  "hover:opacity-80 p-2 border rounded-md bg-foreground text-background";
