"use client";
import {useRouter} from "next/navigation";

import {Input} from "@/_components/ui/input";

export function SearchFoodInput({search}: {search: string | null}) {
  let router = useRouter();
  let searchParams = new URLSearchParams();
  if (search) {
    searchParams.set("search", search);
  }
  return (
    <div className="max-w-xl">
      <Input
        placeholder="Search for food..."
        onChange={(e) => {
          let query = e.target.value;
          // router.push({query: {search: query}},{shallow: true});
          searchParams.set("search", query);
          console.log(
            "searchParams in SearchFoodInput",
            searchParams.toString(),
          );
          // router.push(`/foods?search=${query}`);
          router.push(`/foods?search=${query}`);
          if (!query) {
            router.push(`/foods`);
          }
        }}
        defaultValue={search ?? ""} // or a button to clear the search
      />
    </div>
  );
}
