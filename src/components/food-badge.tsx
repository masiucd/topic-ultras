import type {FoodItemsResult} from "@/db/dao/food-item";
import Link from "next/link";
import {Badge} from "./ui/badge";

export function FoodCategoryBadge(props: {
  foodCategory: FoodItemsResult["allFoodItems"][number]["foodCategory"];
  withLink?: boolean;
}) {
  let {foodCategory, withLink} = props;
  let Comp = (
    <Badge className="uppercase">{foodCategory?.name ?? "UNKNOWN"}</Badge>
  );
  if (withLink) {
    return (
      <Link
        className="hover:underline"
        href={`/food-items/food-categories/${foodCategory?.id}`}
      >
        {Comp}
      </Link>
    );
  }
  return Comp;
}
