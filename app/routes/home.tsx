import {Link, NavLink} from "react-router";
import {db} from "~/.server/db";
import {foodItems} from "~/.server/db/schema";
import PageWrapper from "~/components/page-wrapper";
import {H1, List, P} from "~/components/ui/typography";
import type {Route} from "../+types/root";

export function meta() {
  return [
    {title: "Nutri check"},
    {name: "description", content: "Nutri check is a nutrition tracking app"},
  ];
}

export async function loader({params}: Route.LoaderArgs) {
  let xs = await db.select({id: foodItems.id}).from(foodItems);
  return [
    {
      status: 200,
      props: {xs, params},
    },
  ];
}

export default function HomeRoute({loaderData}: Route.ComponentProps) {
  let xs = loaderData;
  console.log("xs", xs);

  return (
    <PageWrapper>
      <H1>Nutri check</H1>
      <P>
        Nutri check is a nutrition tracking app. It is a work in progress and
        will be released soon.
      </P>
      <List>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <NavLink to="/food-items">Food items</NavLink>
        </li>
      </List>
    </PageWrapper>
  );
}
