import {
  Link as RadixLink,
  type LinkProps as RadixLinkProps,
} from "@radix-ui/themes";
import type {Route} from "next";
import NextLink from "next/link";

export type LinkProps<T extends string> = Omit<RadixLinkProps, "href"> & {
  href: Route<T>;
};

export function Link<T extends string>({href, ...props}: LinkProps<T>) {
  return (
    <RadixLink asChild>
      <NextLink {...props} className={props.className} href={href} />
    </RadixLink>
  );
}

// app/components/link.tsx

// import { Link as RadixLink } from "@radix-ui/themes";
// import NextLink from "next/link";
// import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// type NextLinkKeys = "href" | "replace" | "scroll" | "prefetch";

// type RadixLinkProps2 = Omit<
//   ComponentPropsWithoutRef<typeof RadixLink>,
//   NextLinkKeys
// >;
// type NextLinkProps = Pick<
//   ComponentPropsWithoutRef<typeof NextLink>,
//   NextLinkKeys
// >;

// export const LinkV2 = forwardRef<
//   ElementRef<"a">,
//   RadixLinkProps2 &
//     Omit<NextLinkProps, "href"> & {
//       href: Route<string>;
//     }
// >(function Link(
//   {children, href, replace, scroll, prefetch, ...rest},
//   forwardedRef,
// ) {
//   return (
//     <RadixLink asChild {...rest} ref={forwardedRef}>
//       <NextLink
//         href={href}
//         replace={replace}
//         scroll={scroll}
//         prefetch={prefetch}
//       >
//         {children}
//       </NextLink>
//     </RadixLink>
//   );
// });
