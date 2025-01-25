import {Icons} from "@/components/icons";
import {Span} from "@/components/typography";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {TooltipComponent} from "@/components/ui/tooltip";
import {COLUMNS} from "@/lib/constants";
import {foodItemTableColumnsAtom} from "@/store/columns";
import {useAtom} from "jotai";

export function ColumnsFilter() {
  let [value, setValue] = useAtom(foodItemTableColumnsAtom);
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
        <Command>
          <CommandInput placeholder="Search for your columns..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {COLUMNS.map((column) => (
              <CommandItem key={column}>
                {/* TODO use local storage? */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between capitalize"
                  onClick={() => {
                    let xs = Array.from(value);
                    if (xs.includes(column)) {
                      xs = xs.filter((x) => x !== column);
                    } else {
                      xs.push(column);
                    }
                    setValue(new Set(xs));

                    // setValue((prev) =>
                    //   prev.has(column)
                    //     ? prev.filter((x) => x !== column)
                    //     : [...prev, column]
                    // );
                  }}
                >
                  <Span>{column}</Span>
                  {value.has(column) && (
                    <Span>
                      <Icons.Check />
                    </Span>
                  )}
                </button>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
