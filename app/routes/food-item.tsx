import {eq, sql} from "drizzle-orm";
import {TrendingUp} from "lucide-react";
import {Label, Pie, PieChart} from "recharts";
import {db} from "~/.server/db";
import {
  foodCategories,
  foodItems,
  foodNutrients,
  slugs,
} from "~/.server/db/schema";
import {FoodCategory} from "~/components/food-category";
import PageWrapper from "~/components/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import {P, Strong} from "~/components/ui/typography";
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
          calories: sql<number>`${foodNutrients.calories}`,
          protein: sql<number>`${foodNutrients.protein}`,
          fat: sql<number>`${foodNutrients.fat}`,
          carbs: sql<number>`${foodNutrients.carbs}`,
        },
      })
      .from(foodItems)
      .innerJoin(slugs, eq(foodItems.id, slugs.objectId))
      .innerJoin(
        foodCategories,
        eq(foodItems.foodCategoryId, foodCategories.id)
      )
      .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
      // TODO: and where nutrients is not null
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
    <Card className="flex flex-col">
      <CardHeader className="">
        <CardTitle className="flex items-center justify-between">
          <Strong>{foodItem.name} </Strong>
          <FoodCategory name={foodItem.category} withLink />
        </CardTitle>
        <CardDescription>{foodItem.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={CHART_CONFIG}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={CHART_DATA(foodItem.nutrients)}
              dataKey="foodNutrient"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({viewBox}) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-bold text-3xl"
                        >
                          {foodItem.nutrients?.calories}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Calories / 100g
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total foodNutrient for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

const CHART_DATA = (nutrients: NonNullable<FoodItem>["nutrients"]) => [
  {
    browser: "carbs",
    foodNutrient: Number(nutrients?.carbs),
    fill: "var(--color-carbs)",
  },
  {
    browser: "protein",
    foodNutrient: Number(nutrients?.protein),
    fill: "var(--color-protein)",
  },
  {
    browser: "fat",
    foodNutrient: Number(nutrients?.fat),
    fill: "var(--color-fat)",
  },
];

const CHART_CONFIG = {
  foodNutrient: {
    label: "Visitors",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-1))",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-2))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
