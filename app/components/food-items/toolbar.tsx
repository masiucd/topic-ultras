import type {Location} from "@remix-run/react";
import {download, generateCsv, mkConfig} from "export-to-csv";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {List} from "~/components/ui/typography";
import {TooltipComponent} from "../ui/tooltip";

export function Toolbar(props: {
  allFoodCategories: FoodItemData["allFoodCategories"];
  location: Location;
  results: FoodItemData["results"];
}) {
  return (
    <div className="mb-2 flex justify-between gap-2 border border-red-500">
      <div className="flex gap-3">
        <div>
          <SearchInput location={props.location} />
        </div>
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
  return (
    <TooltipComponent content="Export to  CSV file">
      {/* TODO Option to name the file */}
      <Button
        variant="outline"
        aria-description="Export to CSV file"
        onClick={() =>
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
            )
          )
        }
      >
        <Icons.Download /> Export
      </Button>
    </TooltipComponent>
  );
}

type AcceptedData = number | string | boolean | null | undefined;
function exportToCsv<
  T extends {
    [k: string]: AcceptedData;
    [k: number]: AcceptedData;
  }
>(data: T[]) {
  let csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: "food-items.csv",
  });
  let csv = generateCsv(csvConfig)(data);
  return download(csvConfig)(csv);
}
