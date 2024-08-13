"use client";

import type {Route} from "next";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

import {Icons} from "@/components/ui/icons";
import {TableCell} from "@/components/ui/table";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let params = new URLSearchParams(searchParams);
  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", page.toString());
  }

  return (
    <TableCell className="text-right">
      <div className="flex justify-end gap-2 ">
        <PrevLink params={params} page={page} pathName={pathName} />
        <NextLink
          params={params}
          page={page}
          pathName={pathName}
          totalPages={totalPages}
        />
      </div>
    </TableCell>
  );
}

type LinkProps = {
  params: URLSearchParams;
  page: number;
  pathName: string;
};

function PrevLink({params, page, pathName}: LinkProps) {
  if (page <= 1) {
    return (
      <button
        className="flex cursor-not-allowed items-center gap-1 opacity-50"
        disabled
      >
        <Icons.Left /> Prev
      </button>
    );
  }
  let prevLinkUrlParams = new URLSearchParams(params);
  prevLinkUrlParams.set("page", (page - 1).toString());
  return (
    <Link
      className="flex items-center gap-1 hover:underline hover:opacity-50"
      href={makeHref(pathName, prevLinkUrlParams)}
    >
      <Icons.Left /> Prev
    </Link>
  );
}

function NextLink({
  page,
  params,
  pathName,
  totalPages,
}: LinkProps & {totalPages: number}) {
  let nextLinkUrlParams = new URLSearchParams(params);
  nextLinkUrlParams.set("page", (page + 1).toString());
  if (page >= totalPages) {
    return (
      <button
        className="flex cursor-not-allowed items-center gap-1 opacity-50"
        disabled
      >
        Next <Icons.Right />
      </button>
    );
  }
  return (
    <Link
      className="flex items-center gap-1 hover:underline hover:opacity-50"
      href={makeHref(pathName, nextLinkUrlParams)}
    >
      Next
      <Icons.Right />
    </Link>
  );
}

function makeHref(pathName: string, params: URLSearchParams) {
  return `${pathName}?${params.toString()}` as Route<string>;
}
