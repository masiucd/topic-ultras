import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Link} from "@/_components/ui/link";
import {H1, List} from "@/_components/ui/typography";
import {foodsBasedOnFoodType} from "@/persistence/food/dao";
import type {FoodTypeCategory} from "@/persistence/food/types";

export default async function FoodTypeSlugPage({
  params: {foodtype},
}: {
  params: {foodtype: string};
}) {
  //TODO get food data by food type
  let result = await foodsBasedOnFoodType(
    foodtype.toUpperCase() as FoodTypeCategory,
  );
  if (!result.success) {
    return redirect("/404");
  }

  return (
    <PageWrapper>
      <H1>
        Foods based on food type category: {foodtype} ({result.data.length}{" "}
        items)
      </H1>
      <List>
        {result.data.map((food) => (
          <li key={food.foodId}>
            <Link href={`/foods/${food.foodId}`}>{food.foodName}</Link>
          </li>
        ))}
      </List>
    </PageWrapper>
  );
}
