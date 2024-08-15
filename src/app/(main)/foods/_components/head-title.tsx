"use client";

import type {Route} from "next";
import Link from "next/link";
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
  params.set("orderby", title);
  if (title === "name") {
    params.delete("orderby");
  }
  let href = `${pathName}?${params.toString()}` as Route<string>;
  return <Link href={href}>{children}</Link>;
}
