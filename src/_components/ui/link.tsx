"use client";

import NextLink, {type LinkProps} from "next/link";
import {usePathname} from "next/navigation";

import {cn} from "@/lib/utils";

export function Link<RouteType>(props: LinkProps<RouteType>) {
  return (
    <NextLink
      className={cn(
        "decoration-gray-700/40 underline-offset-2 hover:underline",

        props.className,
      )}
      href={props.href}
    >
      {props.children}
    </NextLink>
  );
}
export function ActiveLink<RouteType>(props: LinkProps<RouteType>) {
  let pathname = usePathname();
  let isActive = pathname === props.href;
  return (
    <NextLink
      className={cn(
        "",
        isActive ? "text-blue-500" : "text-gray-500",
        props.className,
      )}
      href={props.href}
    >
      {props.children}
    </NextLink>
  );
}
