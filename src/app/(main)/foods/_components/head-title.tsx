"use client";

import type {Route} from "next";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import type {PropsWithChildren} from "react";

import {cn} from "@/lib/utils";

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
    <Link className={cn(orderBy === title && "text-blueA11")} href={href}>
      {children}
    </Link>
  );
}
