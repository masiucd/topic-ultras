"use client";
import type {FoodItem} from "@/app/db/dao/food-items";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {TooltipComponent} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {selectedFoodItems} from "@/store/food-items";
import {download, generateCsv, mkConfig} from "export-to-csv";
import {useAtomValue} from "jotai";

export function ExportToCsvButton({
  foodItems,
}: {
  foodItems: NonNullable<FoodItem>[];
}) {
  let selectedFoodItemIds = useAtomValue(selectedFoodItems);
  let hasFoodItems = selectedFoodItemIds.length > 0;
  return (
    <TooltipComponent
      content={
        hasFoodItems ? (
          <span>Export selected food items to CSV</span>
        ) : (
          <span>No food items selected</span>
        )
      }
    >
      <Button
        className={cn(!hasFoodItems && "opacity-75")}
        aria-disabled={!hasFoodItems}
        aria-description={!hasFoodItems ? "No food items selected" : undefined}
        onClick={() => {
          if (!hasFoodItems) return;
          let itemsForCsv = foodItems.filter((item) =>
            selectedFoodItemIds.includes(item.id)
          );
          downloadCSV(itemsForCsv);
        }}
      >
        <Icons.Download />
        Export
      </Button>
    </TooltipComponent>
  );
}

const CSV_CONFIG = mkConfig({useKeysAsHeaders: true});
function downloadCSV(foodItems: NonNullable<FoodItem>[]) {
  const csv = generateCsv(CSV_CONFIG)(
    foodItems.map((item) => ({
      id: item.id,
      name: item.name,
      calories: item.nutrients?.calories ?? "N/A",
      protein: item.nutrients?.protein ?? "N/A",
      fat: item.nutrients?.fat ?? "N/A",
      carbs: item.nutrients?.carbs ?? "N/A",
    }))
  );
  download(CSV_CONFIG)(csv);
}
