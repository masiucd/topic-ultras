import type {Metadata} from "next";
import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Button} from "@/_components/ui/button";
import {H1} from "@/_components/ui/typography";
import {getFoodRecordById} from "@/persistence/food/dao";

import {FoodItem} from "../../food-item";

type Props = {
  params: {foodId: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  let id = parseInt(params.foodId, 10);
  return {
    title: `Food ${id}`, // Time to use the slug instead of the id
    description: `Information about food ${id}`,
  };
}

export default async function FoodSlugPage({params}: Props) {
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
