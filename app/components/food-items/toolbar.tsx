import {Link, useLocation} from "react-router";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {List} from "~/components/ui/typography";
import type {Column} from "~/lib/constants";
import {useToggle} from "~/lib/hooks/toggle";
import {exportToCsv} from "~/lib/utils";
import {Checkbox} from "../ui/checkbox";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {TooltipComponent} from "../ui/tooltip";

export function Toolbar({
  allFoodCategories,
  results,
  selectColumn,
  selectedColumns,
}: {
  allFoodCategories: FoodItemData["allFoodCategories"];
  results: FoodItemData["results"];
  selectColumn: (column: Column, checked: boolean) => void;
  selectedColumns: Set<Column>;
}) {
  return (
    <div className="mb-2 flex justify-between gap-2">
      <div className="flex gap-3">
        <SearchInput />
        <CategoryFilter allFoodCategories={allFoodCategories} />
        <ClearFiltersButton />
      </div>
      <div className="flex gap-3">
        <ExportToCsv results={results} />
        <ColumnView
          selectColumn={selectColumn}
          selectedColumns={selectedColumns}
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

function ColumnView({
  selectColumn,
  selectedColumns,
}: {
  selectColumn: (column: Column, checked: boolean) => void;
  selectedColumns: Set<Column>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Settings />
          Columns view
          <Icons.UpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12rem]">
        <List className="flex list-none flex-col gap-3 capitalize">
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="name"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="description"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="category"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="calories"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="protein"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="fat"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="carbs"
          />
        </List>
      </PopoverContent>
    </Popover>
  );
}

function ColumnViewItem({
  selectColumn,
  selectedColumns,
  column,
}: {
  selectColumn: (column: Column, checked: boolean) => void;
  selectedColumns: Set<Column>;
  column: Column;
}) {
  return (
    <li className="flex items-center justify-between border-b pb-1">
      <label
        htmlFor={column}
        className="cursor-pointer font-medium text-sm leading-none hover:opacity-70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {column}
      </label>
      <Checkbox
        id={column}
        onCheckedChange={(checked) => {
          selectColumn(column, Boolean(checked));
        }}
        checked={selectedColumns.has(column)}
      />
    </li>
  );
}

function ExportToCsv({results}: {results: FoodItemData["results"]}) {
  let [isOpen, {set, off}] = useToggle(false);
  return (
    <TooltipComponent content="Export to CSV file">
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          set(open);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Icons.Download /> Export
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let formData = new FormData(e.currentTarget);
              let filename = formData.get("filename") as string;
              exportToCsv(
                results.map(
                  ({foodName, foodDescription, foodCategory, nutrients}) => ({
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Name: foodName,
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Description: foodDescription,
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Category: foodCategory?.name ?? "N/A/",
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Calories: nutrients?.calories ?? "N/A",
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Protein: nutrients?.protein ?? "N/A",
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Fat: nutrients?.fat ?? "N/A",
                  })
                ),
                filename !== "" ? filename : null
              );
              off();
            }}
          >
            <fieldset className="flex flex-col gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="filename">Export to CSV</Label>
                <Input
                  type="filename"
                  id="filename"
                  placeholder="Filename"
                  name="filename"
                />
              </div>
              <Button name="_action" value="export-csv" type="submit">
                Create CSV
              </Button>
            </fieldset>
          </form>
        </PopoverContent>
      </Popover>
    </TooltipComponent>
  );
}
