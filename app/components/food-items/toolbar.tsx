import {useAtomValue} from "jotai";
import {Link, useLocation} from "react-router";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import type {Column} from "~/lib/constants";
import {useToggle} from "~/lib/hooks/toggle";
import {cn, exportToCsv} from "~/lib/utils";
import {selectedFoodItemsAtom} from "~/state/food-items/atoms";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {TooltipComponent} from "../ui/tooltip";
import {ColumnView} from "./column-view";

export function Toolbar({
  allFoodCategories,
  selectColumn,
  selectedColumns,
  toggleAllColumns,
}: {
  allFoodCategories: FoodItemData["allFoodCategories"];
  selectColumn: (column: Column, checked: boolean) => void;
  selectedColumns: Set<Column>;
  toggleAllColumns: (checked: boolean) => void;
}) {
  return (
    <div className="mb-2 flex justify-between gap-2">
      <div className="flex gap-3">
        <SearchInput />
        <CategoryFilter allFoodCategories={allFoodCategories} />
        <ClearFiltersButton />
      </div>
      <div className="flex gap-3">
        <ExportToCsv />
        <ColumnView
          selectColumn={selectColumn}
          selectedColumns={selectedColumns}
          toggleAllColumns={toggleAllColumns}
        />
      </div>
    </div>
  );
}

function ClearFiltersButton() {
  let {search} = useLocation();
  let params = new URLSearchParams(search);
  let isFilterApplied =
    params.get("category") !== null || params.get("search") !== null;
  return (
    <TooltipComponent content="Clear filters" disabled={!isFilterApplied}>
      <Button
        asChild
        variant={isFilterApplied ? "secondary" : "outline"}
        className={!isFilterApplied ? "opacity-50" : ""}
        disabled={!isFilterApplied}
        aria-description="Clear filters"
      >
        <Link to="/food-items">
          <Icons.Eraser />
          Clear filters
        </Link>
      </Button>
    </TooltipComponent>
  );
}

function ExportToCsv() {
  let selectedFoodItems = useAtomValue(selectedFoodItemsAtom);
  let [isOpen, {set, off}] = useToggle(false);
  let disabledStyles =
    selectedFoodItems.length === 0 ? "opacity-50" : undefined;
  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        set(open);
      }}
    >
      <TooltipComponent
        content={
          selectedFoodItems.length > 0
            ? "Export to CSV file"
            : "Select food items to export as a csv file"
        }
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex items-center gap-1",
              selectedFoodItems.length === 0 && "opacity-50"
            )}
          >
            <Icons.Download />
            Export
          </Button>
        </PopoverTrigger>
      </TooltipComponent>
      <PopoverContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (selectedFoodItems.length > 0) {
              let formData = new FormData(e.currentTarget);
              let filename = formData.get("filename") as string;
              exportToCsv(
                selectedFoodItems.map(
                  ({foodName, foodDescription, foodCategory, nutrients}) => ({
                    Name: foodName,
                    Description: foodDescription,
                    Category: foodCategory?.name ?? "N/A/",
                    Calories: nutrients?.calories ?? "N/A",
                    Protein: nutrients?.protein ?? "N/A",
                    Fat: nutrients?.fat ?? "N/A",
                  })
                ),
                filename.trim() !== "" ? filename : null
              );
              off();
            }
          }}
        >
          <fieldset className="flex flex-col gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="filename" className={disabledStyles}>
                Export to CSV
              </Label>
              <Input
                type="filename"
                id="filename"
                placeholder="Filename"
                name="filename"
                className={disabledStyles}
              />
            </div>
            <Button
              name="_action"
              value="export-csv"
              type="submit"
              className={disabledStyles}
            >
              {selectedFoodItems.length > 0
                ? "Create CSV"
                : "Select food items to export to CSV"}
            </Button>
          </fieldset>
        </form>
      </PopoverContent>
    </Popover>
  );
}
