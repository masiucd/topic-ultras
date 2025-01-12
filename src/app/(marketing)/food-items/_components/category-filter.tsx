import {getCategories} from "@/app/db/dao/food-categories";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {Popover, PopoverTrigger} from "@/components/ui/popover";
import {Content} from "./category-filter-content";

export async function CategoryFilter() {
  let categories = await getCategories();
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1" asChild>
        <Button>
          <Icons.PlusCircle />
          Category
        </Button>
      </PopoverTrigger>
      <Content categories={categories} />
    </Popover>
  );
}
