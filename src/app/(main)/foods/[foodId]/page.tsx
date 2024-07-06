import {eq} from "drizzle-orm";

import {db} from "@/db/db";
import {foods} from "@/db/models/schema";
import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1, P} from "@/shared/components/ui/typography";

export default async function FoodSlugPage({
  params,
}: {
  params: {foodId: string};
}) {
  let foodItem = await db
    .select()
    .from(foods)
    .where(eq(foods.foodId, Number(params.foodId)));
  console.log("🚀 ~ foodItem:", foodItem);
  return (
    <PageWrapper>
      <H1>Food Slug Page</H1>
      <P>FoodID: {params.foodId}</P>
    </PageWrapper>
  );
}
