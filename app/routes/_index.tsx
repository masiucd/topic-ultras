import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {db} from "~/.server/db";
import {users} from "~/.server/db/schema";
import {H1} from "~/components/ui/typography";

export const meta: MetaFunction = () => {
  return [
    {title: "Nutri Check"},
    {name: "description", content: "Nutrition facts for the food you love"},
  ];
};

export async function loader() {
  let result = await db.select().from(users);
  return result;
}

export default function Index() {
  let data = useLoaderData<typeof loader>();
  console.log("data", data);
  return (
    <div className="flex h-screen items-center justify-center">
      <H1>Welcome to Nutri Check</H1>
    </div>
  );
}
