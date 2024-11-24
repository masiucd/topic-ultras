import type {Location} from "@remix-run/react";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {List} from "~/components/ui/typography";
import {useToggle} from "~/lib/hooks/toggle";
import {exportToCsv} from "~/lib/utils";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {TooltipComponent} from "../ui/tooltip";

export function Toolbar(props: {
  allFoodCategories: FoodItemData["allFoodCategories"];
  location: Location;
  results: FoodItemData["results"];
}) {
  return (
    <div className="mb-2 flex justify-between gap-2">
      <div className="flex gap-3">
        <SearchInput location={props.location} />
        <CategoryFilter allFoodCategories={props.allFoodCategories} />
      </div>
      <div className="flex gap-3">
        <ExportToCsv results={props.results} />
        <ColumnView />
      </div>
    </div>
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
      <PopoverContent>
        <List className="flex list-none flex-col gap-2 capitalize">
          <li className="flex items-center justify-between">
            name <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            description <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            category <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            calories <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            Protein <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            Fat <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            Carbs <Icons.Check />
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
