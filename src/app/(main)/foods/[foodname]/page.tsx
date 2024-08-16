import {Box, Button, Card, Flex, Separator} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {Code, H3, H4, P, Span} from "@/components/typography";
import {DataList} from "@/components/ui/datalist";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";
import {getFoodItemByName} from "@/db/dao/foods";

import {PieChart} from "./_components/pie";

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
      <Flex asChild gap="3">
        <div>
          <FoodCard food={food} />
          {/* Show graph here */}
          <Card variant="surface" asChild>
            <div className="size-[400px]">
              <PieChart data={food.nutrients} />
            </div>
          </Card>
        </div>
      </Flex>
    </PageWrapper>
  );
}

type FoodItem = Awaited<ReturnType<typeof getFoodItemByName>>;
function FoodCard({food}: {food: NonNullable<FoodItem>}) {
  return (
    <Box width="500px">
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

        <DataList>
          <DataList.Item align="center">
            <DataList.Label minWidth="128px">
              <Span weight="bold">Type</Span>
            </DataList.Label>
            <DataList.Value>
              <FoodTypeBadge name={food.type.name} slug={food.type.slug} />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
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
            <DataList.Label>
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
            <DataList.Label>
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
            <DataList.Label>
              <Span weight="bold">Protein</Span>
            </DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{food.nutrients.protein}</Code>
                <Span>g</Span>
              </Flex>
            </DataList.Value>
          </DataList.Item>
        </DataList>
      </Card>
    </Box>
  );
}
