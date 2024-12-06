import {atom} from "jotai";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {DEFAULT_COLUMNS} from "~/lib/constants";

export let selectedColumnsAtom = atom(new Set(DEFAULT_COLUMNS));
export let selectedFoodItemsAtom = atom<FoodItemData["results"]>([]);
