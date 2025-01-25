"use client";
import type {FoodItem} from "@/app/db/dao/food-items";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {TooltipComponent} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {selectedCategories} from "@/store/food-categories";
import {useAtom} from "jotai";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import type {PropsWithChildren} from "react";
import {ColumnsFilter} from "./columns-filter";
import {ExportToCsvButton} from "./export-to-csv-button";
import {FoodItemSearch} from "./food-item-search";

export function Toolbar({
  foodItems,
  children,
}: PropsWithChildren<{foodItems: NonNullable<FoodItem>[]}>) {
  return (
    <div className="mt-5 flex justify-between px-2 py-3">
      <div className="flex w-[30rem] gap-2 ">
        <FoodItemSearch />
        {children}
        <ResetFilterButton />
      </div>
      <div className="flex gap-2">
        <ExportToCsvButton foodItems={foodItems} />
        <ColumnsFilter />
      </div>
    </div>
  );
}

function ResetFilterButton() {
  let router = useRouter();
  let path = usePathname();
  let searchParams = useSearchParams();
  let [value, setValue] = useAtom(selectedCategories);
  return (
    <TooltipComponent
      content={
        value.length > 0 ? (
          <span>Reset filter</span>
        ) : (
          <span>No filters are applied</span>
        )
      }
    >
      <Button
        className={cn(value.length === 0 && "opacity-55")}
        onClick={() => {
          if (value.length === 0) return; // todo add a tooltip and aria description and aria-disabled and info message
          setValue([]);
          let newSearchParams = new URLSearchParams(searchParams);
          if (newSearchParams.has("category")) {
            newSearchParams.delete("category");
          }
          let newUrl = `${path}?${newSearchParams.toString()}`;
          router.push(newUrl);
        }}
      >
        <Icons.X />
        Reset
      </Button>
    </TooltipComponent>
  );
}
