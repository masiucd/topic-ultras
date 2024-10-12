import {cn} from "@/lib/utils";
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

export function Muted(props: Props & ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-sm", props.className)}
      {...props}
    />
  );
}

export function Lead(props: Props & ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-xl", props.className)}
      {...props}
    />
  );
}

export function P(props: Props & ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}
      {...props}
    />
  );
}

export function Blockquote(props: Props & ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", props.className)}
      {...props}
    />
  );
}

export function List(props: Props & ComponentProps<"ul">) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", props.className)}
      {...props}
    />
  );
}
