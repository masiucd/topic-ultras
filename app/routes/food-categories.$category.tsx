import type {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import invariant from "tiny-invariant";
import {H1, P} from "~/components/ui/typography";

export function loader(props: LoaderFunctionArgs) {
  let {params} = props;
  invariant(params.category, "Category is required");
  return {
    category: params.category,
  };
}

export default function FoodCategoryRoute() {
  let {category} = useLoaderData<typeof loader>();
  return (
    <div>
      <H1>Food category</H1>
      <P>
        You are viewing the <strong>{category}</strong> food category.
      </P>
    </div>
  );
}
