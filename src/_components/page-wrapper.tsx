import type {PropsWithChildren} from "react";

import {cn} from "@/lib/utils";

// import {cn} from "../lib/cn";

export function PageWrapper({
  children,
  className,
  // fluid,
}: PropsWithChildren<{
  // fluid?: boolean;
  className?: string;
}>) {
  return (
    <section
      className={cn(
        "flex w-full flex-1 flex-col pl-0 sm:pl-4",
        className,
        // fluid ? "max-w-full" : "max-w-4xl",
      )}
    >
      {children}
    </section>
  );
}
