import type {MetaFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {H1, List} from "~/components/ui/typography";

export const meta: MetaFunction = () => {
  return [
    {title: "Nutri Check"},
    {name: "description", content: "Nutrition facts for the food you love"},
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <H1>Welcome to Nutri Check</H1>
      <List>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/food-items">Food Items</Link>
        </li>
        <li>
          <Link to="/food-categories">Food Categories</Link>
        </li>

        <li>
          <Link to="/users">Users</Link>
        </li>
      </List>
    </div>
  );
}
