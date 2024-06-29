"use client";

import {
  Badge,
  type BadgeProps,
  Box,
  Button,
  Code,
  DataList,
  Flex,
  IconButton,
  RadioGroup,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {getFoodResults} from "@/actions/search-food-records";
import {type FoodResult, type FoodType} from "@/persistence/food/types";
import {Icons} from "@/shared/components/icons";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {Label, P, Span} from "@/shared/components/ui/typography";
import type {Unit} from "@/shared/schemas/unit";

export function SearchFoodRecords() {
  let [foodResult, action] = useFormState(getFoodResults, null);

  return (
    <div className="w-full max-w-3xl border-4">
      <FoodForm action={action} />
      {foodResult !== null ? (
        <>
          {foodResult.result.length > 0 ? (
            <ul className="mt-3 flex max-w-2xl flex-wrap gap-5">
              {foodResult.result.map((food) => (
                <FoodItem
                  key={food.foodId}
                  food={food}
                  unit={foodResult.unit}
                />
              ))}
            </ul>
          ) : (
            <P>Food {foodResult.searchTerm} not found</P>
          )}
        </>
      ) : (
        <Box
          my="5"
          className="flex flex-col gap-2 rounded-md border-2 border-gray-900 bg-gray-200 px-2 py-3 shadow-md md:w-96"
        >
          <P weight="medium">
            Please search for a food to get nutrition facts.
          </P>
        </Box>
      )}
    </div>
  );
}

type Color = Pick<BadgeProps, "color">["color"];
function getBadgeColor(foodType?: FoodType): Color {
  switch (foodType?.toLowerCase()) {
    case "fruit":
      return "orange";
    case "vegetable":
      return "green";
    case "grain":
      return "yellow";
    case "protein":
      return "blue";
    case "dairy":
      return "purple";
    case "fat":
      return "red";
    case "sweets":
      return "pink";
    case "beverage":
      return "cyan";
    case "other":
      return "gray";
    case "fish":
      return "blue";
    default:
      return "gray";
  }
}

function FoodTypeBadge({foodType}: {foodType?: FoodType}) {
  let color = getBadgeColor(foodType);

  return (
    <Badge variant="soft" color={color}>
      <Tooltip content="Food Type">
        <Span className="uppercase">{foodType ?? "N/A"}</Span>
      </Tooltip>
    </Badge>
  );
}

function FoodItem({food, unit}: {food: FoodResult; unit: Unit}) {
  let {
    foodName,
    description,
    calories,
    carbs,
    totalFat,
    protein,
    foodType,
    foodTypeId,
  } = food;

  return (
    <li className="flex flex-col gap-2 rounded-md border border-gray-900 px-2 py-3 shadow-md">
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">
            <Tooltip content="Food Type">
              <span>Food Type</span>
            </Tooltip>
          </DataList.Label>
          <DataList.Value>
            <FoodTypeBadge foodType={foodType} />
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">ID</DataList.Label>
          <DataList.Value>
            <Flex align="center" gap="2">
              <Code variant="ghost">u_2J89JSA4GJ</Code>
              <IconButton
                size="1"
                aria-label="Copy value"
                color="gray"
                variant="ghost"
              >
                <Icons.Copy size={16} />
              </IconButton>
            </Flex>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">
            <Tooltip content="Calories">
              <Icons.Calorie size={16} />
            </Tooltip>
          </DataList.Label>
          <DataList.Value>{calories}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Email</DataList.Label>
          <DataList.Value>
            <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Company</DataList.Label>
          <DataList.Value>
            <Link target="_blank" href="https://workos.com">
              WorkOS
            </Link>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {/* <Strong className="flex gap-2">
        <span>
          Nutrition Facts for{" "}
          <Link href={`/foods/${foodName}`}>{foodName}</Link> in{" "}
          <span className="font-semibold uppercase">{unit}</span>
        </span>
      </Strong>

      <P>{description}</P>
      <P className="flex gap-3">
        <Tooltip content="Calories">
          <span>
            <Icons.Calorie />
          </span>
        </Tooltip>
        <span>{calories}</span>
      </P>
      <p className="flex gap-3">
        <Tooltip content="Carbohydrates">
          <span>
            <Icons.Carbs />
          </span>
        </Tooltip>
        <span>{carbs}</span>
      </p>
      <p className="flex gap-3">
        <Tooltip content="Total Fat">
          <span>
            <Icons.Fat />
          </span>
        </Tooltip>
        <span> {totalFat}</span>
      </p>
      <p className="flex gap-3">
        <Tooltip content="Protein">
          <span>
            <Icons.Protein />
          </span>
        </Tooltip>
        <span>{protein}</span>
      </p> */}
    </li>
  );
}

function FoodForm({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action}>
      <fieldset className="flex flex-col gap-3 rounded-md border border-gray-900 px-2 py-3 md:w-full md:max-w-xl">
        <legend>
          <Span size="4" weight="bold">
            Search for food
          </Span>
        </legend>

        <Box>
          <Label weight="medium" htmlFor="food">
            Food
          </Label>
          <TextField.Root
            type="text"
            placeholder="Search for food"
            name="food"
            id="food"
            required
          />
        </Box>

        <Box>
          <RadioGroup.Root defaultValue="g" name="unit" size="2">
            <Flex direction="row" gap="3">
              <RadioGroup.Item value="g" id="g">
                <Label weight="medium" htmlFor="g">
                  Grams
                </Label>
              </RadioGroup.Item>
              <RadioGroup.Item value="oz" id="oz">
                <Label weight="medium" htmlFor="oz">
                  Ounces
                </Label>
              </RadioGroup.Item>
            </Flex>
          </RadioGroup.Root>
        </Box>

        <SubmitButton>
          <span className="font-semibold capitalize">Search</span>
        </SubmitButton>
      </fieldset>
    </form>
  );
}

function SubmitButton({children}: PropsWithChildren) {
  let {pending} = useFormStatus();
  return (
    // TODO make facade for Button
    <Button disabled={pending} type="submit" variant="soft" size="3">
      {children}
    </Button>
  );
}
