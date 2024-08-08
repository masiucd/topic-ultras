import Link from "next/link";

import {H1} from "@/components/typography";

import {FoodItems} from "./_components/food-items";
import {getFoodItems} from "./_data/food-items";
import {getAllFoodTypes} from "./_data/food-types";

function getData() {
  return Promise.all([getFoodItems(), getAllFoodTypes()]);
}

export default async function FoodsPage() {
  let [foodItems, allFoodTypes] = await getData();
  return (
    <div>
      <aside>
        <H1>Foods</H1>
        <Link href="/">Back</Link>
      </aside>
      <FoodItems allFoodTypes={allFoodTypes} footItems={foodItems} />
    </div>
  );
}
