import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import {Icons} from "@/_components/ui/icons";
import {Link} from "@/_components/ui/link";
import {Separator} from "@/_components/ui/separator";
import {Tooltip} from "@/_components/ui/tooltip";
import {ICON_SIZE} from "@/lib/constants";
import {cn} from "@/lib/utils";
import type {FoodResult} from "@/persistence/food/types";

import {FoodTypeBadge} from "./foods/food-type-badge";

export function FoodItem({
  food,
  className,
}: {
  food: FoodResult;
  className?: string;
}) {
  let {
    foodName,
    description,
    calories,
    carbs,
    totalFat,
    protein,
    foodType,
    foodId,
  } = food;

  return (
    <Card as="li" className={cn("relative w-full max-w-[12rem]", className)}>
      <CardHeader className="h-full max-h-[150px] bg-red-100">
        <FoodTypeBadge
          className="absolute right-2 top-2 hover:opacity-70"
          foodType={foodType ?? "OTHER"}
        />

        <CardTitle className="capitalize">
          <Link href={`/foods/${foodId}`}>{foodName}</Link>
        </CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-1" />
        <FoodItemDataList
          calories={calories}
          carbs={carbs}
          totalFat={totalFat}
          protein={protein}
        />
      </CardContent>
      <CardFooter>
        <Link href={`/foods/${foodId}`}>View Details</Link>
      </CardFooter>
    </Card>
  );
}

export function FoodItemDataList({
  calories,
  carbs,
  totalFat,
  protein,
}: {
  calories: number;
  carbs: number;
  totalFat: number;
  protein: number;
}) {
  return (
    // <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-1">
        <span className="flex items-center gap-1 text-base text-muted-foreground">
          <Icons.Calorie size={ICON_SIZE} />
          Calories
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.Calorie size={ICON_SIZE} />
              </TooltipTrigger>
              <TooltipContent className="max-w-44">
                <p className="text-pretty">
                  Calories are a measure of the amount of energy in food.
                  Knowing how many calories are in our food can help us to
                  balance the energy we put into our bodies with the energy we
                  use.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </span>
        <span className="text-base font-bold">{calories}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base text-muted-foreground">New Customers</span>
        <span className="text-base font-bold">1,234</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base text-muted-foreground">Conversion Rate</span>
        <span className="text-base font-bold">8.2%</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base text-muted-foreground">
          Average Order Value
        </span>
        <span className="text-base font-bold">$99.99</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base text-muted-foreground">
          Repeat Customers
        </span>
        <span className="text-base font-bold">45%</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base text-muted-foreground">
          Customer Satisfaction
        </span>
        <span className="text-base font-bold">4.8/5</span>
      </div>
    </div>
    // <DataList.Root>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    // <Tooltip content="Calories">
    //   <Icons.Calorie size={ICON_SIZE} />
    // </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {calories}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Carbohydrates">
    //         <Icons.Carbs size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {carbs}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Total Fat">
    //         <Icons.Fat size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {totalFat}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Protein">
    //         <Icons.Protein size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {protein}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    // </DataList.Root>
  );
}
