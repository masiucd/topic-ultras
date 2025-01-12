"use client";
import type {FoodCategory} from "@/app/db/dao/food-categories";
import {Icons} from "@/components/icons";
import {List} from "@/components/typography";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";

export function CategoryFilter({categories}: {categories: FoodCategory[]}) {
  let path = usePathname();
  let router = useRouter();
  let searchParams = useSearchParams();
  let [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    let categoryParam = searchParams.get("category");
    if (categoryParam) {
      return categoryParam.split("-");
    }
    return [];
  });

  let onCheckedChange = (checked: boolean, category: FoodCategory) => {
    let updatedSelectedCategories = checked
      ? [...selectedCategories, category.name]
      : selectedCategories.filter((x) => x !== category.name);
    setSelectedCategories(updatedSelectedCategories);
    let newSearchParams = new URLSearchParams(searchParams);
    if (!newSearchParams.has("category")) {
      newSearchParams.set("category", updatedSelectedCategories.join(""));
      let newUrl = `${path}?${newSearchParams.toString()}`;
      router.push(newUrl);
    } else {
      newSearchParams.set("category", updatedSelectedCategories.join("-"));
      let newUrl = `${path}?${newSearchParams.toString()}`;
      router.push(newUrl);
    }
    if (newSearchParams.get("category") === "") {
      newSearchParams.delete("category");
      let newUrl = `${path}?${newSearchParams.toString()}`;
      router.push(newUrl);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1" asChild>
        <Button>
          <Icons.PlusCircle />
          Category
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <Input placeholder="Search categories..." className="mb-3" />
          <List className=" flex list-none flex-col gap-3">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={category.name}
                  onCheckedChange={(checked) =>
                    onCheckedChange(Boolean(checked), category)
                  }
                  checked={selectedCategories.includes(category.name)}
                />
                <label
                  htmlFor={category.name}
                  className="font-semibold text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </li>
            ))}
          </List>
        </div>
      </PopoverContent>
    </Popover>
  );
}
