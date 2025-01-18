"use client";
import type {FoodCategory} from "@/app/db/dao/food-categories";
import {List} from "@/components/typography";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {PopoverContent} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {selectedCategories} from "@/store/food-categories";
import {useAtom} from "jotai";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export function Content({categories}: {categories: FoodCategory[]}) {
  let path = usePathname();
  let router = useRouter();
  let searchParams = useSearchParams();
  let [value, setValue] = useAtom(selectedCategories);
  let [searchTerm, setSearchTerm] = useState("");

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
  let filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let xs = filteredCategories.length > 0 ? filteredCategories : categories;
  return (
    <PopoverContent>
      <div>
        <Input
          placeholder="Search categories..."
          className="mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List className=" flex list-none flex-col gap-3">
          {xs.map((category) => (
            <li key={category.id} className="flex items-center gap-2">
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
            </li>
          ))}
        </List>
        <div className="mt-4 mb-1">
          <Button
            aria-disabled={value.length === 0}
            className={cn("w-full", value.length === 0 && "opacity-50")}
            onClick={() => {
              if (value.length === 0) return;
              setValue([]);
              let newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.delete("category");
              let newUrl = `${path}?${newSearchParams.toString()}`;
              router.push(newUrl);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </PopoverContent>
  );
}
