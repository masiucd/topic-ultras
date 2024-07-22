import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Link} from "@/_components/ui/link";
import {H1, Lead, List, Span} from "@/_components/ui/typography";
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

  let upperFoodType = foodtype.toUpperCase();
  return (
    <PageWrapper>
      <div className="my-5 flex flex-col gap-1">
        <H1>{upperFoodType}</H1>
        <Lead>
          Foods based on food type category:{" "}
          <Span className="relative font-semibold after:absolute after:bottom-0 after:left-0 after:h-3 after:w-full after:rotate-1 after:rounded-sm after:bg-foreground after:opacity-25">
            {upperFoodType}
          </Span>{" "}
          ({result.data.length} items)
        </Lead>
      </div>
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
