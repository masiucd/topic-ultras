import Link from "next/link";

import {H1} from "@/components/typography";

import {FoodItems} from "./_components/food-items";
import {getFoodItems} from "./_data/food-items";

export default async function FoodsPage() {
  let foodItems = await getFoodItems();
  return (
    <div>
      <aside className="mb-20">
        <H1>Foods</H1>
        <Link href="/">Back</Link>
      </aside>
      <div className="flex w-full flex-col md:max-w-6xl ">
        <FoodItems footItems={foodItems} />
      </div>
    </div>
  );
}
