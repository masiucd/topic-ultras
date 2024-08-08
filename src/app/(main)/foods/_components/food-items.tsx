"use client";
import Link from "next/link";
import {type PropsWithChildren, useState} from "react";

import {H3, List, P, Span, Strong} from "@/components/typography";
import {Badge} from "@/components/ui/badge";

import type {FoodItem} from "../_data/food-items";
import type {FoodType} from "../_data/food-types";

type Props = {
  allFoodTypes: FoodType[];
  footItems: FoodItem[];
};

export function FoodItems({allFoodTypes, footItems}: PropsWithChildren<Props>) {
  let [selectedFoodTypes, setSelectedFoodTypes] = useState<FoodType[]>([]);
  let filteredFoodItems = footItems.filter((x) =>
    // selectedFoodTypes.length > 0 &&
    selectedFoodTypes.some((y) => {
      console.log({tagId: y.id, foodTypeId: x.foodType.id});
      return y.id === x.foodType.id;
    })
  );

  let xs = filteredFoodItems.length > 0 ? filteredFoodItems : footItems;
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {allFoodTypes.map((x) => (
          <li key={x.id}>
            <label htmlFor={x.name}>
              <Span>{x.name}</Span>
              <input
                type="checkbox"
                name={x.name}
                id={x.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFoodTypes([...selectedFoodTypes, x]);
                  } else {
                    setSelectedFoodTypes(
                      selectedFoodTypes.filter((y) => y.id !== x.id)
                    );
                  }
                }}
              />
            </label>
          </li>
        ))}
      </ul>
      {selectedFoodTypes.length > 0 && filteredFoodItems.length === 0 ? (
        <>
          <H3>No food items</H3>
          <P>for selected food types:</P>
          <List listType="none">
            {selectedFoodTypes.map(({id, name}) => (
              <li key={id}>{name}</li>
            ))}
          </List>
        </>
      ) : (
        <List className="list-none">
          {xs.map((x) => (
            <li key={x.foodId}>
              <div className="flex gap-2">
                <Strong className="capitalize">{x.foodName}</Strong>
                <FoodTypeBadge foodType={x.foodType.name} />
              </div>
              <List>
                <li>
                  <Span>Calories: {x.data.calories}</Span>
                </li>
                <li>
                  <Span>Fat: {x.data.fat}</Span>
                </li>
                <li>
                  <Span>Protein: {x.data.protein}</Span>
                </li>
                <li>
                  <Span>Carbs: {x.data.carbs}</Span>
                </li>
              </List>
            </li>
          ))}
        </List>
      )}
    </>
  );
}

function FoodTypeBadge({foodType}: {foodType: string}) {
  return (
    <Link href="/">
      <Badge className="uppercase">{foodType}</Badge>
    </Link>
  );
}
