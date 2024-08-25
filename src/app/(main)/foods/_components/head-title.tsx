"use client";

import {Link} from "@radix-ui/themes";
import type {Route} from "next";
import NextLink from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import type {PropsWithChildren} from "react";

export function HeadTitle({
  title,
  children,
}: PropsWithChildren<{
  title: "name" | "calories" | "carbs" | "fat" | "protein";
}>) {
  let searchParams = useSearchParams();
  let pathName = usePathname();

  let params = new URLSearchParams(searchParams);
  let orderBy = params.get("orderby");

  if (title === "name") {
    params.delete("orderby");
  } else {
    params.set("orderby", title);
  }

  let href = `${pathName}?${params.toString()}` as Route<string>;

  return (
    <Link asChild underline="hover" color={orderBy === title ? "blue" : "gray"}>
      <NextLink href={href}>{children}</NextLink>
    </Link>
  );
}
