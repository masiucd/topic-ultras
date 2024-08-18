import {Box, Button, Card, Flex, Separator} from "@radix-ui/themes";
import {and, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {Code, H3, H4, P, Span} from "@/components/typography";
import {DataList} from "@/components/ui/datalist";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";
import {db} from "@/db";
import {favoriteFoods} from "@/db/schema";
import {getUserFromSession} from "@/lib/auth";
import {validateFormData} from "@/lib/utils";

import {PieChart} from "./_components/pie";
import {getFoodItemByName} from "./dao";

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
          <FoodCard food={food} foodName={foodname} />
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

async function addToFavorite(data: FormData) {
  "use server";
  let record = validateFormData(data, [
    "food-id",
    "user-id",
    "food-name",
    "is-favorite",
  ]);
  let userId = record["user-id"];
  let foodId = record["food-id"];
  let foodName = record["food-name"];
  let isFavorite = record["is-favorite"];
  if (userId && foodId && foodName && isFavorite) {
    if (isFavorite === "true") {
      await db
        .delete(favoriteFoods)
        .where(eq(favoriteFoods.foodId, Number(foodId)));
    } else {
      await db
        .insert(favoriteFoods)
        .values({userId: Number(userId), foodId: Number(foodId)});
    }
    revalidatePath(`/foods/${foodName}`);
  }
}

async function getFavoriteFoods(userId: number, foodId: number) {
  return await db
    .select()
    .from(favoriteFoods)
    .where(
      and(eq(favoriteFoods.userId, userId), eq(favoriteFoods.foodId, foodId))
    );
}

type FoodItem = Awaited<ReturnType<typeof getFoodItemByName>>;
async function FoodCard({
  food,
  foodName,
}: {
  food: NonNullable<FoodItem>;
  foodName: string;
}) {
  let user = await getUserFromSession();

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
            {user !== null && (
              <FavoriteButton
                user={user}
                foodId={food.foodId}
                foodName={foodName}
              />
            )}
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

async function FavoriteButton({
  user,
  foodId,
  foodName,
}: {
  user: NonNullable<Awaited<ReturnType<typeof getUserFromSession>>>;
  foodId: number;
  foodName: string;
}) {
  let favoriteFoods = await getFavoriteFoods(user.id, foodId);
  let favoriteFood = favoriteFoods.find(
    (ff) => ff.foodId === foodId && ff.userId === user.id
  );
  return (
    <form action={addToFavorite}>
      <input type="hidden" name="food-id" value={foodId} />
      <input type="hidden" name="user-id" value={user.id} />
      <input type="hidden" name="food-name" value={foodName} />
      <input
        type="hidden"
        name="is-favorite"
        value={favoriteFood ? "true" : "false"}
      />
      <Button
        type="submit"
        variant={favoriteFood ? "solid" : "soft"}
        color={favoriteFood ? "blue" : "gray"}
      >
        <Icons.Star />
      </Button>
    </form>
  );
}
