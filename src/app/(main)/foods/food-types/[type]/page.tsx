import {Flex} from "@radix-ui/themes";
import {eq} from "drizzle-orm";
import Link from "next/link";

import PageWrapper from "@/components/page-wrapper";
import {H1, Lead} from "@/components/typography";
import {db} from "@/db";
import {foods, foodTypes} from "@/db/schema";

async function getFoodType(foodType: string) {
  try {
    let items = await db
      .select({
        name: foodTypes.name,
        foodItems: {
          id: foods.id,
          name: foods.name,
          slug: foods.slug,
        },
      })
      .from(foodTypes)
      .innerJoin(foods, eq(foodTypes.id, foods.typeId))
      .where(eq(foodTypes.slug, foodType));

    return {foodTypes: items, foodType: items[0]};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {foodTypes: [], foodType: null};
  }
}

export default async function FoodTypePage({
  params: {type},
}: {
  params: {type: string};
}) {
  let {foodTypes, foodType} = await getFoodType(type);
  if (!foodType) {
    return <div>Food type not found</div>;
  }
  let foodItems = foodTypes.map((x) => x.foodItems);

  return (
    <PageWrapper>
      <Flex direction="column" gap="3">
        <H1 className="capitalize">{foodType.name}</H1>
        <Lead>
          Food items in the <strong>{foodType.name}</strong> category.
        </Lead>
      </Flex>
      <ul>
        {foodItems.map((item) => (
          <li key={item.id}>
            <Link href={`/foods/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
