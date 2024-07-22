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
        name="query"
        onChange={(e) => {
          let query = e.target.value;
          searchParams.set("search", query);
          if (!query) {
            searchParams.delete("search");
            router.push("/foods");
          }
          router.push(`/foods?${searchParams.toString()}`);
        }}
        defaultValue={search ?? ""} // or a button to clear the search
      />
    </div>
  );
}
