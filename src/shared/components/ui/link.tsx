import {Link as RadixLink, type LinkProps} from "@radix-ui/themes";
import NextLink from "next/link";

export function Link(
  props: LinkProps & {
    href: string;
  },
) {
  return (
    <RadixLink {...props} asChild>
      <NextLink className={props.className} href={props.href}>
        {props.children}
      </NextLink>
    </RadixLink>
  );
}
