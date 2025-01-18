import type {PropsWithChildren} from "react";
import {CategoryFilter} from "./category-filter";
import {FoodItemSearch} from "./food-item-search";

export function Toolbar({children}: PropsWithChildren) {
  return (
    <div className="mt-5 flex justify-between px-2 py-3">
      <div className="flex w-[22rem] gap-2 ">
        <FoodItemSearch />
        <CategoryFilter />
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
