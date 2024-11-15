import type {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {H1} from "~/components/ui/typography";

export async function loader(props: LoaderFunctionArgs) {
  let {params} = props;
  console.log("params", params);
  return {slug: params.slug};
}

export default function FoodItemSlugRoute() {
  let data = useLoaderData<typeof loader>();
  console.log("data", data);
  return <H1>hello</H1>;
}
