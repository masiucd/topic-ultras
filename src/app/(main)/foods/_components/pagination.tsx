"use client";

import type {Route} from "next";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

import {TableCell} from "@/components/ui/table";
import {cn} from "@/lib/utils";

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
        <PrevLink
          params={params}
          page={page}
          pathName={pathName}
          totalPages={totalPages}
        />
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
  totalPages: number;
};
function PrevLink({params, page, pathName, totalPages}: LinkProps) {
  if (page <= 1) {
    return (
      <button className="cursor-not-allowed opacity-50" disabled>
        Prev
      </button>
    );
  }
  let href = `${pathName}?${params.toString()}` as Route<string>;
  return (
    <Link className={cn("")} href={"/"}>
      Prev
    </Link>
  );
}
function NextLink({page, params, pathName, totalPages}: LinkProps) {
  params.set("page", (page + 1).toString());
  let href = `${pathName}?${params.toString()}` as Route<string>;
  console.log("🚀 ~ NextLink ~ href:", href);
  if (page >= totalPages) {
    return (
      <button className="cursor-not-allowed opacity-50" disabled>
        Next
      </button>
    );
  }
  return <Link href={href}>Next</Link>;
}
