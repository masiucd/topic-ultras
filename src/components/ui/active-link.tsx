"use client";

import {Link as RadixLink} from "@radix-ui/themes";
import type {RouteType} from "next/dist/lib/load-custom-routes";
import NextLink, {type LinkProps} from "next/link";
import {usePathname} from "next/navigation";

export function ActiveLink(props: LinkProps<RouteType>) {
  let path = usePathname();
  let isActive = path === props.href;
  return (
    <RadixLink
      asChild
      color={isActive ? "blue" : "gray"}
      underline={isActive ? "always" : "hover"}
      size="2"
      weight="medium"
      className={"hover:opacity-55"}
    >
      <NextLink {...props}>{props.children}</NextLink>
    </RadixLink>
  );
}
