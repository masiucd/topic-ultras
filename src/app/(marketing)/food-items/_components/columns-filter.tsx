"use client";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {TooltipComponent} from "@/components/ui/tooltip";

const COLUMNS = [
  "name",
  "description",
  "category",
  "calories",
  "protein",
  "fat",
  "carbs",
] as const;

export function ColumnsFilter() {
  return (
    <Popover>
      <TooltipComponent content="Filter on columns">
        <PopoverTrigger className="flex items-center gap-1" asChild>
          <Button>
            <Icons.Settings />
            View
          </Button>
        </PopoverTrigger>
      </TooltipComponent>

      <PopoverContent>
        <div>
          {COLUMNS.map((column) => (
            <div key={column} className="flex items-center gap-2">
              <input type="checkbox" id={column} />
              <label htmlFor={column}>{column}</label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
