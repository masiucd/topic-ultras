import {Slot} from "@radix-ui/react-slot";
import type {HTMLAttributes, PropsWithChildren} from "react";

import {cn} from "@/lib/utils";

type Props = {
  asChild?: boolean;
  className?: string;
  htmlTag?: string;
  attributes?: HTMLAttributes<HTMLElement>;
};

export default function PageWrapper({
  asChild,
  htmlTag = "section",
  ...props
}: PropsWithChildren<Props>) {
  let Comp = asChild ? Slot : htmlTag;

  return (
    <Comp
      className={cn("flex flex-col flex-1 max-w-6xl mx-auto", props.className)}
      {...props}
    />
  );
}
