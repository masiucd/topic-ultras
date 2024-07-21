import {DropdownMenuContent} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

import {PageWrapper} from "@/_components/page-wrapper";
import {Badge} from "@/_components/ui/badge";
import {Button} from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import {Icons} from "@/_components/ui/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import {Tooltip} from "@/_components/ui/tooltip";
import {H1, P, Span} from "@/_components/ui/typography";
import {ICON_SIZE} from "@/lib/constants";
import {slugify} from "@/lib/strings";
import {getFoodData} from "@/persistence/food/dao";
import type {FoodResult} from "@/persistence/food/types";

import {SearchFoodInput} from "./_components/search-food-input";

// Display table of food items with pagination and save the search state in the URL
export default async function FoodItemsPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  console.log("🚀 ~ searchParams:", searchParams);

  let search =
    typeof searchParams.search === "string" ? searchParams.search : null;

  return (
    <PageWrapper>
      <H1>Food items</H1>
      <div className="mt-6 flex flex-col gap-2 pl-2">
        <P>
          Welcome to the food tracker! Search for food to see its nutritional
          information.
        </P>
        <SearchFoodInput search={search} />
      </div>

      <div className="my-5 flex max-w-[1060px] flex-col gap-5">
        <FoodTable search={search} />
      </div>
    </PageWrapper>
  );
}

async function FoodTable({search}: {search: string | null}) {
  let currentSearchParams = new URLSearchParams();
  if (search) {
    currentSearchParams.set("search", search);
  }

  let foods = await getFoodData({
    searchTerm: currentSearchParams.get("search"),
    limit: 10,
    offset: 0,
  });

  if (!foods.success) {
    // TODO handle error
    return null;
  }

  console.log("currentSearchParams", currentSearchParams);

  return (
    <Table>
      <TableCaption>
        <P>Foods available in the database</P>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>
            <Tooltip content="Food">
              <Icons.Apple size={ICON_SIZE} />
            </Tooltip>
          </TableHead>

          <TableHead>
            <Tooltip content="Calories">
              <Icons.Calorie size={ICON_SIZE} />
            </Tooltip>
          </TableHead>
          <TableHead>
            <Tooltip content="Carbohydrates">
              <Icons.Carbs size={ICON_SIZE} />
            </Tooltip>
          </TableHead>
          <TableHead>
            <Tooltip content="Total Fat">
              <Icons.Fat size={ICON_SIZE} />
            </Tooltip>
          </TableHead>
          <TableHead>
            <Tooltip content="Protein">
              <Icons.Protein size={ICON_SIZE} />
            </Tooltip>
          </TableHead>
          <TableHead>
            <Tooltip content="Description">
              <Icons.Notebook size={ICON_SIZE} />
            </Tooltip>
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foods.data.map((f) => (
          <TableRow key={f.foodId}>
            <TableCell>{f.foodName}</TableCell>
            <TableCell>{f.calories}</TableCell>
            <TableCell>{f.carbs}</TableCell>
            <TableCell>{f.totalFat}</TableCell>
            <TableCell>{f.protein}</TableCell>
            <TableCell>{f.description}</TableCell>
            <TableCell>
              <Badge>
                {f.foodType ? (
                  <Link href={`/food-categories/${slugify(f.foodType)}`}>
                    {f.foodType}
                  </Link>
                ) : (
                  f.foodType
                )}
              </Badge>
            </TableCell>
            <TableCell>
              <Actions foodItem={f} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>Total {foods.data.length}</TableCell>
          {/* <TableCell className="text-right">{foods.length}</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function Actions({foodItem}: {foodItem: FoodResult}) {
  let {foodId, foodName} = foodItem;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.DotsVertical size={ICON_SIZE} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary text-primary-foreground">
        <DropdownMenuLabel>
          Food: <Span className="font-bold">{foodName}</Span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.View size={ICON_SIZE} className="mr-2 size-4" />
            <Link href={`/foods/${slugify(foodId.toString())}`}>
              <span>View</span>
            </Link>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.Edit size={ICON_SIZE} className="mr-2 size-4" />
            <span>Edit</span>
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Settings className="mr-2 h-4 w-4" /> */}
            <span>Settings</span>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Keyboard className="mr-2 h-4 w-4" /> */}
            <span>Keyboard shortcuts</span>
            {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
