"use client";
import type {FoodCategory} from "@/app/db/dao/food-categories";
import {Icons} from "@/components/icons";
import {List} from "@/components/typography";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";

export function CategoryFilter({categories}: {categories: FoodCategory[]}) {
  let path = usePathname();
  let router = useRouter();
  let searchParams = useSearchParams();
  let [searchTerm, setSearchTerm] = useState("");
  let [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split("-") ?? []
  );

  let onCheckedChange = (checked: boolean, category: FoodCategory) => {
    let updatedSelectedCategories = checked
      ? [...selectedCategories, category.name]
      : selectedCategories.filter((x) => x !== category.name);
    setSelectedCategories(updatedSelectedCategories);

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
    <Popover>
      <PopoverTrigger className="flex items-center gap-1" asChild>
        <Button>
          <Icons.PlusCircle />
          Category
        </Button>
      </PopoverTrigger>
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
                  checked={selectedCategories.includes(category.name)}
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
              aria-disabled={selectedCategories.length === 0}
              className={cn(
                "w-full",
                selectedCategories.length === 0 && "opacity-50"
              )}
              onClick={() => {
                if (selectedCategories.length === 0) return;
                setSelectedCategories([]);
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
    </Popover>
  );
}
