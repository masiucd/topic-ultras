import {Flex, Grid, Link} from "@radix-ui/themes";
import {eq} from "drizzle-orm";
import NextLink from "next/link";

import PageWrapper from "@/components/page-wrapper";
import {H1, Lead, Span, Strong} from "@/components/typography";
import {db} from "@/db";
import {foods, foodTypes} from "@/db/schema";
import {safe} from "@/lib/safe";

async function getFoodType(foodType: string) {
  let result = safe(
    async () =>
      await db
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
        .where(eq(foodTypes.slug, foodType)),
  );
  if (result.success) {
    let items = await result.value;
    return {foodTypes: items, foodType: items[0]};
  }
  // eslint-disable-next-line no-console
  console.error(result.error);
  return {foodTypes: [], foodType: null};
}

export default async function FoodTypePage({params: {type}}: {params: {type: string}}) {
  let {foodTypes, foodType} = await getFoodType(type);
  if (!foodType) {
    return (
      <PageWrapper>
        <H1>
          Food type <Strong className="underline underline-offset-2">{type}</Strong> not found
        </H1>
      </PageWrapper>
    );
  }
  let foodItems = foodTypes.map((x) => x.foodItems);

  return (
    <PageWrapper>
      <Flex direction="column" gap="3" mb="5">
        <H1 className="capitalize">{foodType.name}</H1>
        <Lead>
          Food items in the <Strong className="uppercase underline">{foodType.name}</Strong>{" "}
          category.
        </Lead>
      </Flex>
      <Grid asChild gap="3" columns={{xs: "1", md: "1fr 1fr 1fr"}}>
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
              <Link asChild weight="medium" underline="none">
                <NextLink
                  href={`/foods/${item.slug}`}
                  className="rounded-md p-1 shadow transition-all duration-150 hover:shadow-md"
                >
                  <Span size="4" className="capitalize">
                    {item.name}
                  </Span>
                </NextLink>
              </Link>
            </li>
          ))}
        </ul>
      </Grid>
    </PageWrapper>
  );
}
