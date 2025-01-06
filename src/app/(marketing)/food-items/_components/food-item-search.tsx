"use client";
import {Input} from "@/components/ui/input";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

export function FoodItemSearch() {
  let searchParams = useSearchParams();
  // let params = useParams();
  let pathname = usePathname();
  let router = useRouter();
  let newSearchParams = new URLSearchParams(searchParams);
  return (
    <Input
      className="w-full p-2"
      type="text"
      placeholder="Search for food items..."
      onChange={(e) => {
        let searchTerm = e.target.value;
        if (searchTerm === "") {
          newSearchParams.delete("search");
          let newUrl = `${pathname}?${newSearchParams.toString()}`;
          router.push(newUrl);
        } else {
          newSearchParams.set("search", searchTerm);
          let newUrl = `${pathname}?${newSearchParams.toString()}`;
          router.push(newUrl);
        }
      }}
    />
  );
}
