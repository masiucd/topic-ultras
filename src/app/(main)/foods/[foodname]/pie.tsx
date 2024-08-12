"use client";

import {TrendingUp} from "lucide-react";
import * as React from "react";
import {Label, Pie, PieChart as RechartPieChart} from "recharts";

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

import type {FoodItem} from "./types";

const chartData = (foodItem: FoodItem) => [
  {label: "Carbs", value: foodItem.nutrients.carbs, fill: "var(--color-carbs)"},
  {label: "Fat", value: foodItem.nutrients.fat, fill: "var(--color-fat)"},
  {
    label: "Protein",
    value: foodItem.nutrients.protein,
    fill: "var(--color-protein)",
  },
  {label: "Sugars", value: 150, fill: "var(--color-sugars)"},
  {label: "Fiber", value: 50, fill: "var(--color-fiber)"},
  {label: "Saturated fat", value: 150, fill: "var(--color-saturated-fat)"},
  {label: "Trans fat", value: 50, fill: "var(--color-trans-fat)"},
];

const chartConfig = {
  value: {
    label: "Value",
  },
  calories: {
    label: "Calories",
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
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-4))",
  },
  sugars: {
    label: "Sugars",
    color: "hsl(var(--chart-5))",
  },
  fiber: {
    label: "Fiber",
    color: "hsl(var(--chart-5))",
  },
  saturatedFat: {
    label: "Saturated fat",
    color: "hsl(var(--chart-5))",
  },
  transFat: {
    label: "Trans fat",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PieChart({foodItem}: {foodItem: FoodItem}) {
  let data = React.useMemo(() => chartData(foodItem), [foodItem]);
  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {foodItem.nutrients.calories}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total calories
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </RechartPieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span>Food</span>
          <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          <span className="font-medium">Last updated:</span> 2 days ago
        </div>
      </CardFooter>
    </Card>
  );
}
