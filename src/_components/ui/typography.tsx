import type {PropsWithChildren} from "react";

import {cn} from "@/lib/utils";

export function H1(
  props: PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
}

export function H2(props: PropsWithChildren<{className?: string}>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
}

export function H3(props: PropsWithChildren<{className?: string}>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
}

export function H4(props: PropsWithChildren<{className?: string}>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {props.children}
    </h4>
  );
}

export function P(props: PropsWithChildren<{className?: string}>) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}>
      {props.children}
    </p>
  );
}

export function Blockquote(props: PropsWithChildren<{className?: string}>) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", props.className)}>
      {props.children}
    </blockquote>
  );
}

export function List(props: PropsWithChildren<{className?: string}>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", props.className)}>
      {props.children}
    </ul>
  );
}

export function InlineCode(props: PropsWithChildren<{className?: string}>) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        props.className,
      )}
    >
      {props.children}
    </code>
  );
}

export function Lead(props: PropsWithChildren<{className?: string}>) {
  return (
    <p className={cn("text-xl text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}

export function Large(props: PropsWithChildren<{className?: string}>) {
  return (
    <div className={cn("text-lg font-semibold", props.className)}>
      {props.children}
    </div>
  );
}

export function Small(props: PropsWithChildren<{className?: string}>) {
  return (
    <small className={cn("text-sm font-medium leading-none", props.className)}>
      {props.children}
    </small>
  );
}

export function Muted(props: PropsWithChildren<{className?: string}>) {
  return (
    <p className={cn("text-sm text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}

export function Span(props: PropsWithChildren<{className?: string}>) {
  return (
    <span className={cn("font-semibold", props.className)}>
      {props.children}
    </span>
  );
}
