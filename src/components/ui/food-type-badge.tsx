import Link from "next/link";

import {Badge} from "./badge";

export function FoodTypeBadge({name}: {name: string}) {
  return (
    <Link href={`/foods/food-types/${name}`}>
      <Badge className="uppercase">{name}</Badge>
    </Link>
  );
}
