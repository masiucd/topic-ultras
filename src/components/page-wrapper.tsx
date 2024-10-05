import {cn} from "@/lib/utils/cn";
import type {ComponentProps, HTMLAttributes, PropsWithChildren} from "react";

type Props = {
  className?: string;
  attributes?: HTMLAttributes<HTMLElement>;
  fluid?: boolean;
};

export default function PageWrapper(
  props: PropsWithChildren<Props & ComponentProps<"section">>
) {
  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col",
        props.fluid ? "max-w-full" : "max-w-7xl",
        props.className
      )}
    >
      {props.children}
    </section>
  );
}
