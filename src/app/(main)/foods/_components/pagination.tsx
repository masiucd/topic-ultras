"use client";

import {Flex, Link as RadixLink} from "@radix-ui/themes";
import type {Route} from "next";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

import {Icons} from "@/components/ui/icons";

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
    <Flex asChild gap="2" justify="end" height="100%">
      <div>
        <PrevLink params={params} page={page} pathName={pathName} />
        <PageSequence
          page={page}
          totalPages={totalPages}
          pathName={pathName}
          params={params}
        />
        <NextLink
          params={params}
          page={page}
          pathName={pathName}
          totalPages={totalPages}
        />
      </div>
    </Flex>
  );
}

function generatePageSequence(totalPages: number) {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
}

function PageSequence({
  page,
  totalPages,
  pathName,
  params,
}: {
  page: number;
  totalPages: number;
  pathName: string;
  params: URLSearchParams;
}) {
  return generatePageSequence(totalPages).map((pageNumber) => {
    let pageLinkUrlParams = new URLSearchParams(params);
    pageLinkUrlParams.set("page", pageNumber.toString());
    return (
      <Link
        key={pageNumber}
        href={makeHref(pathName, pageLinkUrlParams)}
        className={`flex items-center gap-1 hover:underline hover:opacity-50 ${
          pageNumber === page ? "text-blue-500" : ""
        }`}
      >
        {pageNumber}
      </Link>
    );
  });
}

type LinkProps = {
  params: URLSearchParams;
  page: number;
  pathName: string;
};

function PrevLink({params, page, pathName}: LinkProps) {
  if (page <= 1) {
    return null;
  }
  let prevLinkUrlParams = new URLSearchParams(params);
  prevLinkUrlParams.set("page", (page - 1).toString());
  return (
    <RadixLink
      color="gray"
      className="flex items-center gap-1  hover:opacity-50"
      href={makeHref(pathName, prevLinkUrlParams)}
    >
      <Icons.Left /> Prev
    </RadixLink>
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
    return null;
  }
  return (
    <RadixLink
      color="gray"
      className="flex items-center gap-1  hover:opacity-50"
      href={makeHref(pathName, nextLinkUrlParams)}
    >
      Next
      <Icons.Right />
    </RadixLink>
  );
}

function makeHref(pathName: string, params: URLSearchParams) {
  return `${pathName}?${params.toString()}` as Route<string>;
}
