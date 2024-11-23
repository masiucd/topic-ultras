import {useSearchParams} from "@remix-run/react";
import {useState} from "react";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Checkbox} from "~/components/ui/checkbox";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {cn} from "~/lib/utils";

export function CategoryFilter(props: {
  allFoodCategories: FoodItemData["allFoodCategories"];
}) {
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectedCategories, setSelectedCategories] = useState<number[]>(
    searchParams.get("category")?.split("-").map(Number) || []
  );

  const handleCategoryOnChange = (checked: boolean, categoryId: number) => {
    let updatedCategories = !checked
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);

    let params = new URLSearchParams(searchParams);
    params.set("category", updatedCategories.join("-"));
    setSearchParams(params);

    if (params.get("category") === "") {
      params.delete("category");
      setSearchParams(params);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Category />
          Category
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mb-5">
          {props.allFoodCategories.map((c) => (
            <div key={c.id} className="mb-1 flex items-center gap-2">
              <Checkbox
                id={c.name}
                name="category"
                value={c.id}
                checked={selectedCategories.includes(c.id)}
                onCheckedChange={(checked) =>
                  handleCategoryOnChange(Boolean(checked), c.id)
                }
              />
              <label htmlFor={c.name}>{c.name}</label>
            </div>
          ))}
        </div>
        <div className=" w-full">
          <Button
            aria-description="Clear all categories"
            aria-disabled={selectedCategories.length === 0}
            className={cn(
              "w-full",
              selectedCategories.length === 0 && "pointer-events-none"
            )}
            variant={selectedCategories.length > 0 ? "reverse" : "outline"}
            onClick={() => {
              setSelectedCategories([]);
              let params = new URLSearchParams(searchParams);
              params.delete("category");
              setSearchParams(params);
            }}
          >
            Clear all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
