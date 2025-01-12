import {db} from "@/app/db";
import {foodCategories} from "@/app/db/schema";
import {Icons} from "@/components/icons";
import {List} from "@/components/typography";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {sql} from "drizzle-orm";

async function getCategories() {
  try {
    let rows = await db
      .select({
        id: foodCategories.id,
        name: foodCategories.name,
      })
      .from(foodCategories)
      .orderBy(sql`${foodCategories.name} ASC`);
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

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
      <PopoverContent>
        <div>
          <Input placeholder="Search categories..." className="mb-3" />
          <List className=" flex list-none flex-col gap-3">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center gap-2">
                <Checkbox id={category.name} />
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
