import {Outlet} from "react-router";
import {getFoodCategory} from "~/.server/db/dao/food-categories";
import {PageTitle} from "~/components/page-title";
import PageWrapper from "~/components/page-wrapper";
import {H1, P, Span} from "~/components/ui/typography";
import type {Route} from "./+types/layout";

export function headers(_: Route.HeadersArgs) {
  return {
    "Content-Security-Policy": "default-src 'self'",
    "Cache-Control": "max-age=3600",
  };
}

export async function loader({params}: Route.LoaderArgs) {
  if (params.category) {
    return {
      foodCategory: await getFoodCategory(params.category),
      param: params.category,
    };
  }

  return {
    foodCategory: null,
    param: params.category,
  };
}

export default function FoodCategoriesLayout({
  loaderData,
}: Route.ComponentProps) {
  let {foodCategory} = loaderData;

  if (foodCategory === null) {
    return <H1>Category not found</H1>;
  }

  return (
    <PageWrapper>
      <div>
        <PageTitle
          h1Text="Food category - "
          leadText="View all food items for category -  "
          h1Component={<Span className="capitalize">{foodCategory.name}</Span>}
          leadComponent={
            <Span className="capitalize">{foodCategory.name}</Span>
          }
        />
        {foodCategory.description !== null && <P>{foodCategory.description}</P>}
      </div>
      <Outlet context={{foodCategory}} />
    </PageWrapper>
  );
}
