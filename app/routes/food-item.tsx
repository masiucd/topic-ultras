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
          <FoodData />
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

("use client");

import {TrendingUp} from "lucide-react";
import * as React from "react";
import {Label, Pie, PieChart} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const CHART_DATA = [
  {browser: "chrome", visitors: 275, fill: "var(--color-chrome)"},
  {browser: "safari", visitors: 200, fill: "var(--color-safari)"},
  {browser: "firefox", visitors: 287, fill: "var(--color-firefox)"},
  {browser: "edge", visitors: 173, fill: "var(--color-edge)"},
  {browser: "other", visitors: 190, fill: "var(--color-other)"},
];

const CHART_CONFIG = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function FoodData() {
  const totalVisitors = React.useMemo(() => {
    return CHART_DATA.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={CHART_CONFIG}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={CHART_DATA}
              dataKey="visitors"
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
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
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
