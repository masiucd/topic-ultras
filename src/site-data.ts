import type {ThemeProps} from "@radix-ui/themes";
import type {Route} from "next";

export let siteData = Object.freeze({
  title: "Nutri Check",
  description: "Nutrition facts for your favorite foods.",
  keywords: ["nutrition, food, health, tracking"],
  navLinks: [
    {href: "/foods", text: "Food List"},
    {href: "/about", text: "About"},
    {href: "/contact", text: "Contact"},
    {href: "/calculator", text: "Food Calculator"},
  ] as {href: Route<string>; text: string}[],
});

export let themeData: ThemeProps = Object.freeze({
  panelBackground: "translucent",
  accentColor: "iris",
  grayColor: "slate",
  radius: "medium",
  scaling: "95%",
});
