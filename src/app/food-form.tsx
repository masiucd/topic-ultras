"use client";

import {useFormState} from "react-dom";

import {searchFood} from "@/actions/search-food";
import {Button} from "@/components/ui/button";

export default function FoodForm() {
  let [state, action] = useFormState(searchFood, null);
  return (
    <form
      action={action}
      className="flex flex-col border border-blue-400 md:w-full md:max-w-xl"
    >
      <input
        type="text"
        datatype="text"
        placeholder="Search for food"
        name="food"
        required
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
