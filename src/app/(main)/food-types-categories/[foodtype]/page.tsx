import {redirect} from "next/navigation";

import {foodsBasedOnFoodType} from "@/persistence/food/dao";
import type {FoodTypeCategory} from "@/persistence/food/types";
import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1} from "@/shared/components/typography";

export default async function FoodTypeSlugPage({
  params: {foodtype},
}: {
  params: {foodtype: string};
}) {
  //TODO get food data by food type
  let result = await foodsBasedOnFoodType(fromSlugToFoodTypeCategory(foodtype));
  if (!result.success) {
    return redirect("/404");
  }

  return (
    <PageWrapper>
      <H1>
        Foods based on food type category: {foodtype} ({result.data.length}{" "}
        items)
      </H1>
      <ul>
        {result.data.map((food) => (
          <li key={food.foodId}>{food.foodName}</li>
        ))}
      </ul>
    </PageWrapper>
  );
}

function fromSlugToFoodTypeCategory(foodtype: string): FoodTypeCategory {
  switch (foodtype.toLowerCase()) {
    case "fruit":
      return "Fruit" as FoodTypeCategory;
    default:
      return "Other";
  }
}
