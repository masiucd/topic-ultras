"use client";
import type {FoodCategory} from "@/app/db/dao/food-categories";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {PopoverContent} from "@/components/ui/popover";
import {selectedCategories} from "@/store/food-categories";
import {useAtom} from "jotai";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export function Content({categories}: {categories: FoodCategory[]}) {
  let path = usePathname();
  let router = useRouter();
  let searchParams = useSearchParams();
  let [value, setValue] = useAtom(selectedCategories);

  useEffect(() => {
    setValue(searchParams.get("category")?.split("-") ?? []);
  }, [searchParams.get, setValue]);

  let onCheckedChange = (checked: boolean, category: FoodCategory) => {
    let updatedSelectedCategories = checked
      ? [...value, category.name]
      : value.filter((x) => x !== category.name);
    setValue(updatedSelectedCategories);

    let newSearchParams = new URLSearchParams(searchParams);
    if (updatedSelectedCategories.length > 0) {
      newSearchParams.set("category", updatedSelectedCategories.join("-"));
    } else {
      newSearchParams.delete("category");
    }
    let newUrl = `${path}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <PopoverContent>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {categories.map((category) => (
            <CommandItem
              key={category.id}
              className="flex flex-row-reverse justify-between "
            >
              <Checkbox
                id={category.name}
                onCheckedChange={(checked) =>
                  onCheckedChange(Boolean(checked), category)
                }
                checked={value.includes(category.name)}
              />
              <label
                htmlFor={category.name}
                className="font-semibold text-sm capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </PopoverContent>
  );
}
