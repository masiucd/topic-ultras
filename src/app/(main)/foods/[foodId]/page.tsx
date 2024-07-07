import {Box, Card, Flex, Separator} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import {getFoodRecordById} from "@/persistence/food/dao";
import type {FoodResult} from "@/persistence/food/types";
import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1, P} from "@/shared/components/ui/typography";

import {FoodItemDataList} from "../../food-item";
import {FoodTypeBadge} from "../food-type-badge";

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
      <Flex direction="column" maxWidth="400px">
        <Flex
          my="5"
          className="border border-red-400"
          align="center"
          justify="between"
          pr="4"
        >
          <Flex direction="column" gap="1">
            <H1>{foodItem.data.foodName}</H1>
            <P>{foodItem.data.description}</P>
          </Flex>
          <FoodTypeBadge foodType={foodItem.data.foodType} />
        </Flex>
      </Flex>

      <Box maxWidth="240px">
        <FoodCard foodItem={foodItem.data} />
      </Box>
    </PageWrapper>
  );
}

function FoodCard({foodItem}: {foodItem: FoodResult}) {
  let {foodName, description, foodType} = foodItem;
  return (
    <Card className="relative">
      <Flex gap="3" align="center">
        <FoodTypeBadge className="absolute right-2 top-2" foodType={foodType} />
        <Flex direction="column" gap="1">
          <P weight="medium" size="7">
            {foodName}
          </P>
          <P as="p" size="2" color="gray">
            {description}
          </P>
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
      <FoodItemDataList
        calories={foodItem.calories}
        carbs={foodItem.carbs}
        totalFat={foodItem.totalFat}
        protein={foodItem.protein}
      />
    </Card>
  );
}
