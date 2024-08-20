"use client";

import {Box, Flex} from "@radix-ui/themes";
import {
  Area,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {getFoodItemByName} from "@/app/(main)/foods/[foodname]/dao";
import {cn} from "@/lib/utils";

import {Label} from "../typography";

const pinkA = {
  pinkA1: "hsla(320, 100%, 50%, 0.01)",
  pinkA2: "hsla(326, 100%, 44%, 0.03)",
  pinkA3: "hsla(326, 100%, 48%, 0.09)",
  pinkA4: "hsla(323, 100%, 44%, 0.14)",
  pinkA5: "hsla(322, 100%, 41%, 0.19)",
  pinkA6: "hsla(323, 100%, 38%, 0.25)",
  pinkA7: "hsla(323, 100%, 36%, 0.33)",
  pinkA8: "hsla(322, 100%, 34%, 0.42)",
  pinkA9: "hsla(322, 100%, 39%, 0.75)",
  pinkA10: "hsla(322, 100%, 38%, 0.78)",
  pinkA11: "hsla(322, 100%, 36%, 0.84)",
  pinkA12: "hsla(320, 100%, 17%, 0.93)",
};

const blueA = {
  blueA1: "hsla(210, 100%, 50%, 0.02)",
  blueA2: "hsla(207, 100%, 50%, 0.04)",
  blueA3: "hsla(205, 100%, 48%, 0.1)",
  blueA4: "hsla(203, 100%, 50%, 0.16)",
  blueA5: "hsla(205, 100%, 50%, 0.24)",
  blueA6: "hsla(207, 100%, 48%, 0.33)",
  blueA7: "hsla(207, 100%, 46%, 0.44)",
  blueA8: "hsla(206, 100%, 45%, 0.63)",
  blueA9: "hsl(206, 100%, 50%)",
  blueA10: "hsla(207, 100%, 47%, 0.98)",
  blueA11: "hsla(208, 100%, 40%, 0.95)",
  blueA12: "hsla(216, 100%, 17%, 0.93)",
};
const COLORS = [
  "hsla(216, 100%, 17%, 0.93)",
  "hsla(320, 100%, 17%, 0.93)",
  "hsla(120, 60%, 67%, 0.93)",
];

export function PieChart({data}: {data: {name: string; value: number}[]}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartPie>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          label
        >
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                // fill={COLORS[index % COLORS.length]}
                fill={
                  entry.name === "carbs"
                    ? "hsla(216, 100%, 17%, 0.93)"
                    : entry.name === "protein"
                      ? "hsla(320, 100%, 17%, 0.93)"
                      : "hsla(120, 60%, 67%, 0.93)"
                }
                fillOpacity={0.8}
              />
            );
          })}
        </Pie>
        <Tooltip
          content={({active, payload}) => {
            if (active && payload && payload.length > 0) {
              return (
                <Flex
                  p="4"
                  direction="column"
                  className="rounded-md bg-white shadow"
                >
                  <Label className="capitalize" color="gray">
                    {payload[0].name}: <span>{payload[0].value}</span>{" "}
                  </Label>
                  {/* <p>
                    Prod2: <span>{payload[1].value}</span>{" "}
                    </p> */}
                </Flex>
              );
            }
          }}
        />
        <Legend
          verticalAlign="bottom"
          align="left"
          // content={({payload}) => {
          //   if (payload && payload.length > 0) {
          //     return (
          //       <Flex asChild gap="2">
          //         <ul>
          //           {payload.map((entry, index) => (
          //             <Box asChild key={`item-${index}`}>
          //               <li className="flex items-center gap-2">
          //                 <div
          //                   style={{
          //                     backgroundColor:
          //                       entry.value === "carbs"
          //                         ? "hsla(216, 100%, 17%, 0.93)"
          //                         : entry.value === "protein"
          //                           ? "hsla(320, 100%, 17%, 0.93)"
          //                           : "hsla(120, 60%, 67%, 0.93)",
          //                   }}
          //                   className={"size-3 rounded-md"}
          //                 />
          //                 <Label className="capitalize">{entry.value}</Label>
          //               </li>
          //             </Box>
          //           ))}
          //         </ul>
          //       </Flex>
          //     );
          //   }
          // }}
        />
      </RechartPie>
    </ResponsiveContainer>
  );
}
