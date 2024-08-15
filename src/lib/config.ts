import type {Route} from "next";

export let appData = Object.freeze({
  title: "Nutri Check",
  name: "nutri check",
  description: "Nutri Check checks the nutritional value of your food.",
  routes: [
    {
      name: "Foods",
      href: "/foods",
    },
    {
      name: "Calculator",
      href: "/calculator",
    },
  ] as {
    name: string;
    href: Route<string>;
  }[],
});
