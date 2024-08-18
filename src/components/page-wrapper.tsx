import {Flex} from "@radix-ui/themes";
import type {ComponentProps, HTMLAttributes, PropsWithChildren} from "react";

import {cn} from "@/lib/utils";

type Props = {
  className?: string;
  attributes?: HTMLAttributes<HTMLElement>;
};

export default function PageWrapper(
  props: PropsWithChildren<Props & ComponentProps<"section">>
) {
  return (
    <Flex
      asChild
      flexGrow="1"
      direction="column"
      className={cn("max-w-6xl mx-auto w-full", props.className)}
    >
      <section {...props} />
    </Flex>
  );
}
