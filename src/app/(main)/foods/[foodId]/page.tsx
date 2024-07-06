import {Box, Card, Flex} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import {getFoodRecordById} from "@/persistence/food/dao";
import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1, P} from "@/shared/components/ui/typography";

export default async function FoodSlugPage({
  params,
}: {
  params: {foodId: string};
}) {
  let foodItem = await getFoodRecordById(parseInt(params.foodId, 10));
  console.log("🚀 ~ foodItem:", foodItem);
  if (!foodItem.success) {
    return redirect("/404");
  }
  return (
    <PageWrapper>
      <H1>Food Slug Page</H1>

      <Box maxWidth="240px">
        <Card>
          <Flex gap="3" align="center">
            {foodItem.data.foodType}
            <Box>
              <P as="p" size="2" weight="bold">
                {foodItem?.data.foodName}
              </P>
              <P as="p" size="2" color="gray">
                {foodItem?.data.description}
              </P>
            </Box>
          </Flex>
        </Card>
      </Box>
    </PageWrapper>
  );
}
