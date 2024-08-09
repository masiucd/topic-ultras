import Link from "next/link";

import {H1} from "@/components/typography";

import {FoodItems} from "./_components/food-items";

export default async function FoodsPage({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    page?: string;
  };
}) {
  let foodName = searchParams?.name || "";
  let page = Number(searchParams?.page) || 1;

  return (
    <div>
      <aside className="mb-20">
        <H1>Foods</H1>
        <Link href="/">Back</Link>
      </aside>
      <div className="flex w-full flex-col md:max-w-6xl ">
        <FoodItems foodName={foodName} page={page} />
      </div>
    </div>
  );
}
