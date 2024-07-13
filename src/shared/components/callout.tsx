import {Callout as RadixCallout, Flex, type FlexProps} from "@radix-ui/themes";
import type {MarginProps} from "@radix-ui/themes/props";
import type {PropsWithChildren} from "react";

import {Icons} from "./icons";

type Color =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";
type Props = {
  className?: string;
  type: "info" | "warning" | "error";
  variant?: "soft" | "outline" | "surface";
  size?: "1" | "2" | "3";
  color?: Color;

  flexProps?: FlexProps;
} & MarginProps;

export function Callout(props: PropsWithChildren<Props>) {
  return (
    <RadixCallout.Root
      {...props}
      variant={props.variant}
      size={props.size}
      color={getColor(props.type) ?? props.color}
    >
      <Flex align="center" gap="2" {...props.flexProps}>
        <RadixCallout.Icon>
          <Icon type={props.type} />
        </RadixCallout.Icon>
        <RadixCallout.Text>{props.children}</RadixCallout.Text>
      </Flex>
    </RadixCallout.Root>
  );
}

function Icon({type}: {type: "info" | "warning" | "error"}) {
  switch (type) {
    case "info":
      return <Icons.Info />;
    case "warning":
      return <Icons.Warning />;
    case "error":
      return <Icons.Error />;
  }
}

function getColor(type: "info" | "warning" | "error"): Color | undefined {
  if (type === "warning") {
    return "yellow";
  }
  if (type === "error") {
    return "red";
  }
  return undefined;
}
