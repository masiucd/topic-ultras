"use client";

import type {RouteType} from "next/dist/lib/load-custom-routes";
import Link, {type LinkProps} from "next/link";
import {usePathname} from "next/navigation";

import {cn} from "@/lib/utils";

export function ActiveLink(props: LinkProps<RouteType>) {
  let path = usePathname();
  let isActive = path === props.href;
  return (
    <Link
      className={cn(
        "text-sm font-semibold text-gray-900/60 hover:text-gray-900",
        isActive &&
          "underline underline-offset-2 text-gray-900 hover:text-gray-900/60"
      )}
      {...props}
    >
      {props.children}
    </Link>
  );
}
