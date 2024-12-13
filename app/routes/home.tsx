import {Link, NavLink} from "react-router";
import PageWrapper from "~/components/page-wrapper";
import {H1, List, P} from "~/components/ui/typography";

export function meta() {
  return [
    {title: "Nutri check"},
    {name: "description", content: "Nutri check is a nutrition tracking app"},
  ];
}

export default function HomeRoute() {
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
