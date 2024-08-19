"use client";
// import{ } from '@radix-ui/themes'
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

let data = [
  {
    name: "Jan",
    prod1: 4000,
    prod2: 500,
  },
  {
    name: "Feb",
    prod1: 4000,
    prod2: 3400,
  },
  {
    name: "Mar",
    prod1: 2200,
    prod2: 9000,
  },
  {
    name: "Apr",
    prod1: 10000,
    prod2: 14000,
  },
  {
    name: "May",
    prod1: 8000,
    prod2: 11000,
  },
];

export function AreaChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        // width={500} height={500}
        data={data}
        margin={{right: 30, top: 10}}
      >
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip
          content={(props) => {
            if (props.active && props.payload && props.payload.length > 0) {
              let {payload, label} = props;
              return (
                <div>
                  <p>{label}</p>
                  <p>
                    Prod1: <span>{payload[0].value}</span>{" "}
                  </p>
                  <p>
                    Prod2: <span>{payload[1].value}</span>{" "}
                  </p>
                </div>
              );
            }
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="prod1"
          stroke="#fe3122"
          fill="#333fff"
          // className="fill-red-600"
          stackId="1"
        />
        <Area
          type="monotone"
          dataKey="prod2"
          stroke="#2ce3"
          fill="#333"
          stackId="1"
          // className="fill-red-600"
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
