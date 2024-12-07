import {eq} from "drizzle-orm";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import {FoodCategory} from "~/components/food-category";
import {Icons} from "~/components/icons";
import PageWrapper from "~/components/page-wrapper";
import {Button} from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {P, Span} from "~/components/ui/typography";
import type {Route} from "./+types/food-item";

export function meta({params}: Route.MetaArgs) {
  return [
    {
      title: `Food Item - ${params.slug}`,
    },
    {
      property: "og:title",
      content: `Food Item - ${params.slug}`,
    },
    {
      name: "description",
      content: `Food item details about the food you love - ${params.slug}.`,
    },
  ];
}

async function getFoodItemBySLug(slug: string) {
  try {
    let results = await db
      .select({
        id: foodItems.id,
        name: foodItems.name,
        description: foodItems.description,
        category: foodCategories.name,
        nutrients: {
          calories: foodNutrients.calories,
          protein: foodNutrients.protein,
          fat: foodNutrients.fat,
          carbs: foodNutrients.carbs,
        },
      })
      .from(foodItems)
      .innerJoin(slugs, eq(foodItems.id, slugs.objectId))
      .innerJoin(
        foodCategories,
        eq(foodItems.foodCategoryId, foodCategories.id)
      )
      .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
      .where(eq(slugs.slug, slug));

    return {
      foodItem: results.length > 0 ? results[0] : null,
    };
  } catch (error) {
    console.error(error);
    return {foodItem: null};
  }
}

export async function loader({params}: Route.LoaderArgs) {
  return await getFoodItemBySLug(params.slug);
}

export default function FoodItemRoute({
  params,
  loaderData,
}: Route.ComponentProps) {
  let {foodItem} = loaderData;

  return (
    <PageWrapper>
      <section className="mx-auto my-10 grid w-full max-w-[80rem] gap-8">
        {foodItem !== null ? (
          <div className="md:max-w-[28rem]">
            <FoodCard foodItem={foodItem} />
          </div>
        ) : (
          <P>Food item not found with slug: {params.slug}</P>
        )}
      </section>
    </PageWrapper>
  );
}

type FoodItem = Awaited<ReturnType<typeof getFoodItemBySLug>>["foodItem"];

function FoodCard({foodItem}: {foodItem: NonNullable<FoodItem>}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Span>{foodItem.name}</Span>
          <FoodCategory name={foodItem.category} withLink />
        </CardTitle>
        <CardDescription>{foodItem.description}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* <Label htmlFor="framework">Framework</Label> */}
          {/* <Select> */}
          {/* <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger> */}
          {/* <SelectContent position="popper">
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="sveltekit">SvelteKit</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="nuxt">Nuxt.js</SelectItem>
            </SelectContent> */}
          {/* </Select> */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* TODO: Only for admins */}
        <Button variant="outline">
          <Icons.Edit />
          Edit{" "}
        </Button>
        {/* <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  );
}
