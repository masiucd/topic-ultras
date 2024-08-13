import {Badge, type BadgeProps} from "@radix-ui/themes";
import Link from "next/link";

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
  name: string;
} & BadgeProps;

export function FoodTypeBadge(props: Props) {
  return (
    <Link href={`/foods/food-types/${props.name}`}>
      <Badge className="uppercase" color={getColor(props.name)} {...props}>
        {props.name}
      </Badge>
    </Link>
  );
}

function getColor(foodType: string): Color | undefined {
  switch (foodType) {
    case "fruit":
      return "green";
    case "dairy":
      return "blue";
    default:
      return undefined;
  }
}
