"use client";
import {Input} from "@/components/ui/input";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {useCallback} from "react";

export function FoodItemSearch() {
  let searchParams = useSearchParams();
  let pathname = usePathname();
  let router = useRouter();
  let newSearchParams = new URLSearchParams(searchParams);

  let handleSearchChange = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm === "") {
        newSearchParams.delete("search");
        let newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
      } else {
        newSearchParams.set("search", searchTerm);
        let newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
      }
    }, 300),
    []
  );

  return (
    <Input
      className="w-full p-2"
      type="text"
      placeholder="Search for food items..."
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
