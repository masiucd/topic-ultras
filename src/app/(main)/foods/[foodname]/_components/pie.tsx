"use client";
import {ResponsivePie} from "@nivo/pie";

import type {FoodItem} from "../_data/food-item";

export function PieChart({data}: {data: NonNullable<FoodItem>["nutrients"]}) {
  return (
    <ResponsivePie
      data={[
        {
          id: "Fat",
          label: "Fat",
          value: data.fat,
        },
        {
          id: "Protein",
          label: "Protein",
          value: data.protein,
        },
        {
          id: "Carbs",
          label: "Carbs",
          value: data.carbs,
        },
      ]}
      margin={{top: 40, right: 80, bottom: 80, left: 80}}
      colors={{scheme: "purple_blue"}}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.5]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{from: "color"}}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "carbs",
          },
          id: "dots",
        },
        {
          match: {
            id: "fat",
          },
          id: "dots",
        },
        {
          match: {
            id: "protein",
          },
          id: "dots",
        },

        {
          match: {
            id: "carbs",
          },
          id: "lines",
        },
        {
          match: {
            id: "fat",
          },
          id: "lines",
        },
        {
          match: {
            id: "protein",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}
