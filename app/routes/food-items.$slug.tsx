import type {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {eq} from "drizzle-orm";
import invariant from "tiny-invariant";
import {db} from "~/.server/db";
import {foodItems, slugs} from "~/.server/db/schema";
import {H1} from "~/components/ui/typography";

export async function loader(props: LoaderFunctionArgs) {
  let {params} = props;
  invariant(params.slug, "Slug is required");

  let rows = await db
    .select()
    .from(foodItems)
    .leftJoin(slugs, eq(foodItems.id, slugs.objectId))
    .where(eq(slugs.slug, params.slug));

  return {slug: params.slug};
}

export default function FoodItemSlugRoute() {
  let data = useLoaderData<typeof loader>();
  console.log("data", data);
  return <H1>{data.slug}</H1>;
}
