"use client";

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
          stroke={blueA.blueA9}
          fill={blueA.blueA3}
          // className="fill-red-600"
          stackId="1"
        />
        <Area
          type="monotone"
          dataKey="prod2"
          stroke={pinkA.pinkA9}
          fill={pinkA.pinkA3}
          stackId="1"
          // className="fill-red-600"
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

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
