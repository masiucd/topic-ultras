"use client";

import {Icons} from "@/components/icons";
import {Span} from "@/components/typography";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

export function NextPage({
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
        isOverLastPage && "cursor-not-allowed opacity-45"
      )}
      href={newUrl}
      aria-disabled={isOverLastPage}
    >
      <Span>next</Span>
      <Icons.ArrowRight />
    </Link>
  );
}

export function PreviousPage({page}: {page: number}) {
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
        isUnderFirstPage && "cursor-not-allowed opacity-45"
      )}
      aria-disabled={isUnderFirstPage}
      href={newUrl}
    >
      <Icons.ArrowLeft />
      <Span>previous</Span>
    </Link>
  );
}

const DEFAULT_STYLES = "flex items-center gap-2 hover:opacity-80";
