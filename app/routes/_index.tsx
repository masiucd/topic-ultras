import type {MetaFunction} from "@remix-run/node";
import {H1} from "~/components/ui/typography";

export const meta: MetaFunction = () => {
  return [
    {title: "Nutri Check"},
    {name: "description", content: "Nutrition facts for the food you love"},
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <H1>Welcome to Nutri Check</H1>
    </div>
  );
}
