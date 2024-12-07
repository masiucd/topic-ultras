import {Label, Pie, PieChart} from "recharts";
import {
  type FoodItemBySlug,
  getFoodItemBySLug,
} from "~/.server/db/dao/food-items";
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
import {H2, P, Strong} from "~/components/ui/typography";
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
          <H2>
            Either the slug is incorrect or the food nutrients are not set for
            the food item {params.slug}.
          </H2>
        )}
      </section>
    </PageWrapper>
  );
}

function FoodCard({foodItem}: {foodItem: NonNullable<FoodItemBySlug>}) {
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
          <P>Food nutrients for - {foodItem.name}</P>
        </div>
        <div className="text-muted-foreground leading-none">
          <P>Total calories and nutrients per 100g of {foodItem.name}</P>
        </div>
      </CardFooter>
    </Card>
  );
}

const CHART_DATA = (nutrients: NonNullable<FoodItemBySlug>["nutrients"]) => [
  {
    browser: "carbs",
    foodNutrient: nutrients?.carbs,
    fill: "var(--color-carbs)",
  },
  {
    browser: "protein",
    foodNutrient: nutrients?.protein,
    fill: "var(--color-protein)",
  },
  {
    browser: "fat",
    foodNutrient: nutrients?.fat,
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
