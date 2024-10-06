import {cn} from "@/lib/utils/cn";
import type {ComponentProps} from "react";

type Props = {
  className?: string;
};

export function H1(props: Props & ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl",
        props.className
      )}
      {...props}
    />
  );
}

export function H2(props: Props & ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        props.className
      )}
      {...props}
    />
  );
}

export function H3(props: Props & ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        props.className
      )}
      {...props}
    />
  );
}

export function H4(props: Props & ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        props.className
      )}
      {...props}
    />
  );
}

export function InlineCode(props: Props & ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
        props.className
      )}
      {...props}
    />
  );
}

export function TextLarge(props: Props & ComponentProps<"p">) {
  return (
    <p className={cn("font-semibold text-lg", props.className)} {...props} />
  );
}

export function Lead(props: Props & ComponentProps<"p">) {
  return (
    <p className={cn("text-gray-800/50 text-lg", props.className)} {...props} />
  );
}
