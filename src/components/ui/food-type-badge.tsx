import Link from "next/link";

import {Badge, type Color} from "./badge";

export function FoodTypeBadge({name}: {name: string}) {
  return (
    <Link href={`/foods/food-types/${name}`}>
      <Badge className="uppercase" colour={getColor(name)}>
        {name}
      </Badge>
    </Link>
  );
}

function getColor(foodType: string): Color {
  switch (foodType) {
    case "fruit":
      return "green";
    case "dairy":
      return "blue";
    default:
      return "default";
  }
}
