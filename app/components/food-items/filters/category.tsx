import {useState} from "react";
import {useSearchParams} from "react-router";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Checkbox} from "~/components/ui/checkbox";
import {Input} from "~/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {cn} from "~/lib/utils";

export function CategoryFilter({
  allFoodCategories,
}: {
  allFoodCategories: FoodItemData["allFoodCategories"];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Category />
          Category
        </Button>
      </PopoverTrigger>
      <Content allFoodCategories={allFoodCategories} />
    </Popover>
  );
}

function Content({
  allFoodCategories,
}: {
  allFoodCategories: FoodItemData["allFoodCategories"];
}) {
  let [categoryTerm, setCategoryTerm] = useState("");
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

  let filteredCategories =
    categoryTerm === ""
      ? allFoodCategories
      : allFoodCategories.filter((c) =>
          c.name.toLowerCase().includes(categoryTerm.toLowerCase())
        );

  return (
    <PopoverContent>
      <label
        className="relative mb-5 flex items-center"
        htmlFor="category-search"
      >
        <Input
          id="category-search"
          value={categoryTerm}
          onChange={(e) => setCategoryTerm(e.target.value)}
          placeholder="Search categories"
        />

        <Icons.Search
          className={cn(
            "absolute right-2 text-gray-400",
            categoryTerm.length > 0 && "hidden"
          )}
        />
      </label>
      <ul className="mb-5">
        {filteredCategories.map((c) => (
          <li key={c.id} className="mb-1 flex items-center gap-2">
            <Checkbox
              id={c.name}
              name="category"
              value={c.id}
              checked={selectedCategories.includes(c.id)}
              onCheckedChange={(checked) =>
                handleCategoryOnChange(Boolean(checked), c.id)
              }
            />
            <label
              htmlFor={c.name}
              className={cn(
                "capitalize",
                selectedCategories.includes(c.id) && "font-medium"
              )}
            >
              {c.name}
            </label>
          </li>
        ))}
      </ul>
      <div className=" w-full">
        <Button
          aria-description="Clear all categories"
          aria-disabled={selectedCategories.length === 0}
          className={cn(
            "w-full",
            selectedCategories.length === 0 && "pointer-events-none"
          )}
          variant={selectedCategories.length > 0 ? "secondary" : "outline"}
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
  );
}
