"use client";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import type {PropsWithChildren} from "react";

type Props = {
  href: string;
  className?: string;
};

export function ActiveLink(props: PropsWithChildren<Props>) {
  let path = usePathname();
  console.log("path", path);
  let isActive = path === props.href;
  console.log("isActive", isActive);

  return (
    <Link
      className={cn(
        "font-semibold text-sm hover:opacity-45",
        isActive && "underline underline-offset-2",
        props.className
      )}
      href={props.href}
    >
      {props.children}
    </Link>
  );
}
