import {Box, Button, Card, DataList, Flex, Separator} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {Code, H3, H4, P, Span} from "@/components/typography";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";

import {getFoodItemByName} from "./_data/food-item";

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
      <Box maxWidth="350px">
        <Card variant="surface">
          <Flex mb="5" direction="column">
            <Flex justify="between">
              <Flex direction="column">
                <H3 weight="bold">Nutrition facts</H3>
                <P color="gray" size="2" mb="2">
                  Serving size: (100g), (0.22 lb) (3.52 oz)
                </P>
              </Flex>
              <Button variant="outline" color="gray">
                <Icons.Star />
              </Button>
            </Flex>

            <Flex direction="column" gap="3">
              <Flex asChild justify="between" width="150px">
                <H4 size="2">
                  <Span>Food item</Span>
                  <Span weight="light" className="capitalize">
                    {food.name}
                  </Span>
                </H4>
              </Flex>
              <Separator className="w-full" />
            </Flex>
          </Flex>

          <DataList.Root>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">
                <Span weight="bold">Type</Span>
              </DataList.Label>
              <DataList.Value>
                <FoodTypeBadge name={food.name} />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">
                <Span weight="bold">Calories</Span>
              </DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">{food.nutrients.calories}</Code>
                  <Span>kcal</Span>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">
                <Span weight="bold">Fat</Span>
              </DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">{food.nutrients.fat}</Code>
                  <Span>g</Span>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">
                <Span weight="bold">Carbs</Span>
              </DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">{food.nutrients.carbs}</Code>
                  <Span>g</Span>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">
                <Span weight="bold">Protein</Span>
              </DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">{food.nutrients.protein}</Code>
                  <Span>g</Span>
                </Flex>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Card>
      </Box>

      {/* Show graph here */}
      <Card></Card>
    </PageWrapper>
  );
}
