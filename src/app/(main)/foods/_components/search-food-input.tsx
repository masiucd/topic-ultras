"use client";
import {useRouter} from "next/navigation";

import {Input} from "@/_components/ui/input";

export function SearchFoodInput({search}: {search: string | null}) {
  let router = useRouter();
  console.log("search", search);
  return (
    <div className="max-w-xl">
      <Input
        placeholder="Search for food..."
        onChange={(e) => {
          let query = e.target.value;
          // router.push({query: {search: query}},{shallow: true});
          console.log("query", query);
          router.push(`/foods?search=${query}`);
          if (!query) {
            router.push(`/foods`);
          }
        }}
      />
    </div>
  );
}
