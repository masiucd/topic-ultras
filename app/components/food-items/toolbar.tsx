import {Link, useLocation} from "react-router";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {List} from "~/components/ui/typography";
import {useToggle} from "~/lib/hooks/toggle";
import {exportToCsv} from "~/lib/utils";
import {Checkbox} from "../ui/checkbox";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {TooltipComponent} from "../ui/tooltip";

export function Toolbar(props: {
  allFoodCategories: FoodItemData["allFoodCategories"];
  results: FoodItemData["results"];
}) {
  // if some filter is applied we should be able to clear them with an action

  return (
    <div className="mb-2 flex justify-between gap-2">
      <div className="flex gap-3">
        <SearchInput />
        <CategoryFilter allFoodCategories={props.allFoodCategories} />
        <ClearFiltersButton />
      </div>
      <div className="flex gap-3">
        <ExportToCsv results={props.results} />
        <ColumnView />
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

function ColumnView() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Settings />
          Columns view
          <Icons.UpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[14rem]">
        <List className="flex list-none flex-col gap-3 capitalize">
          <li className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              name
            </label>
            <Checkbox id="name" />
          </li>
          <li className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              description
            </label>
            <Checkbox id="description" />
          </li>
          <li className="flex items-center justify-between">
            <label
              htmlFor="category"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              category
            </label>
            <Checkbox id="category" />
          </li>
          <li className="flex items-center justify-between">
            <label
              htmlFor="calories"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              calories
            </label>
            <Checkbox id="calories" />
          </li>
          <li className="flex items-center justify-between">
            <label
              htmlFor="protein"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              protein
            </label>
            <Checkbox id="protein" />
          </li>
          <li className="flex items-center justify-between">
            <label
              htmlFor="fat"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              fat
            </label>
            <Checkbox id="fat" />
          </li>
          <li className="flex items-center justify-between">
            <label
              htmlFor="carbs"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              carbs
            </label>
            <Checkbox id="carbs" />
          </li>
        </List>
      </PopoverContent>
    </Popover>
  );
}

function ExportToCsv(props: {results: FoodItemData["results"]}) {
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
                props.results.map(
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
