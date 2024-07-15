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
