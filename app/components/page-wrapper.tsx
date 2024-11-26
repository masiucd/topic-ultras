import type {ComponentProps, HTMLAttributes, PropsWithChildren} from "react";
import {cn} from "~/lib/utils";

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
        "mx-auto my-3 flex w-full max-w-7xl flex-1 flex-col",
        props.fluid ? "max-w-full" : "max-w-7xl",
        props.className
      )}
    >
      {props.children}
    </section>
  );
}
