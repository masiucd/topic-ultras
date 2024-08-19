import {Badge, type BadgeProps} from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  name: string;
  slug: string;
} & BadgeProps;

export function FoodTypeBadge(props: Props) {
  return (
    <Link href={`/foods/food-types/${props.slug}`} className="hover:opacity-70">
      <Badge
        className="uppercase"
        color={getColor(props.name)}
        highContrast
        {...props}
      >
        {props.name}
      </Badge>
    </Link>
  );
}

type Color = BadgeProps["color"];
function getColor(foodType: string): Color {
  switch (foodType) {
    case "fruit":
      return "green";
    case "dairy":
      return "blue";
    case "meet":
      return "red";
    default:
      return undefined;
  }
}
