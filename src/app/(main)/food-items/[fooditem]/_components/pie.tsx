"use client";

import type {FoodItemType} from "@/db/dao/food-item";
import {TrendingUp} from "lucide-react";
import {Label, Pie, PieChart} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

// const CHART_DATA = [
//   {macro: "protein", value: 275, fill: "var(--color-protein)"},
//   {macro: "carbs", value: 200, fill: "var(--color-carbs)"},
//   {macro: "fat", value: 287, fill: "var(--color-fat)"},
//   // {macro: "edge", value: 173, fill: "var(--color-edge)"},
//   // {macro: "other", value: 190, fill: "var(--color-other)"},
// ];

const CHART_CONFIG = {
  value: {
    label: "Visitors",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-1))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-2))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type Props = {
  foodItem: NonNullable<FoodItemType>;
};

export function PieChartComponent(props: Props) {
  let {foodItem} = props;
  console.log("foodItem", foodItem.nutrition);

  const data = [
    {
      macro: "protein",
      value: foodItem.nutrition.protein,
      fill: "var(--color-protein)",
    },
    {
      macro: "carbs",
      value: foodItem.nutrition.carbs,
      fill: "var(--color-carbs)",
    },
    {macro: "fat", value: foodItem.nutrition.fat, fill: "var(--color-fat)"},
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{foodItem.name}</CardTitle>
        <CardDescription>Nutrition values of {foodItem.name}</CardDescription>
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
              data={data}
              dataKey="value"
              nameKey="macro"
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
                          {foodItem.nutrition.calories.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Calories
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
          Nutrition values <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing the nutrition values of the food item in a pie chart.
        </div>
      </CardFooter>
    </Card>
  );
}
