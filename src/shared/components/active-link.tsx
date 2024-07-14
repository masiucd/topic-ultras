"use client";

import {usePathname} from "next/navigation";

import {themeData} from "@/site-data";

import {Link, type LinkProps} from "./link";

export function ActiveLink<T extends string>(props: LinkProps<T>) {
  let pathName = usePathname();
  let isActive = pathName === props.href;

  return (
    <Link
      {...props}
      href={props.href}
      className={props.className}
      underline={isActive ? "always" : props.underline}
      color={isActive ? themeData.accentColor : "gray"}
      weight={isActive ? "bold" : "regular"}
    >
      {props.children}
    </Link>
  );
}
