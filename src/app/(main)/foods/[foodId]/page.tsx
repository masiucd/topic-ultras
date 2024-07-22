import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Button} from "@/_components/ui/button";
import {H1} from "@/_components/ui/typography";
import {getFoodRecordById} from "@/persistence/food/dao";

import {FoodItem} from "../../food-item";

export default async function FoodSlugPage({
  params,
}: {
  params: {foodId: string};
}) {
  let foodItem = await getFoodRecordById(parseInt(params.foodId, 10));

  if (!foodItem.success) {
    return redirect("/404");
  }
  return (
    <PageWrapper>
      <H1 className="my-5 mb-10">{foodItem.data.foodName}</H1>
      <div className="max-w-2xl">
        <FoodItem
          food={foodItem.data}
          // cardHeaderContent={}
          cardFooterContent={
            <div>
              <Button disabled>Edit</Button>
            </div>
          }
        />
      </div>
    </PageWrapper>
  );
}

// function FoodItemCard(){

// }
