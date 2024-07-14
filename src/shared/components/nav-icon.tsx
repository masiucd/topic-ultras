import type {Route} from "next";

import {Icons} from "./icons";

export function NavIcon({
  href,
  size = 18,
}: {
  href: Route<string>;
  size?: number;
}) {
  switch (href) {
    case "/":
      return <Icons.Home size={size} />;
    case "/about":
      return <Icons.About size={size} />;
    case "/contact":
      return <Icons.Contact size={size} />;
    case "/foods":
      return <Icons.List size={size} />;
    case "/calculator":
      return <Icons.Calculator size={size} />;
    default:
      return null;
  }
}
