import {redirect} from "next/navigation";
import type {ReactNode} from "react";

import PageWrapper from "@/components/page-wrapper";
import {P, Span} from "@/components/typography";

import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";

import {getFoodItemByName} from "./_data/food-item";

import type {FoodItem} from "./types";

export default async function FoodNamePage({
  params: {foodname},
}: {
  params: {foodname: string};
}) {
  let food = await getFoodItemByName(foodname);
  if (!food) {
    return redirect("/404");
  }
  return (
    <PageWrapper>
      {/* <div className="flex flex-col gap-2 border border-red-500 md:flex-row">
        <FoodCard foodItem={food} />
        <div className="flex flex-1 items-center">
          <PieChart foodItem={food} />
        </div>
      </div> */}
    </PageWrapper>
  );
}
