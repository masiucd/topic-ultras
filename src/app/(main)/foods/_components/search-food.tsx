"use client";

import type {Route} from "next";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {H4} from "@/components/typography";
import {Input} from "@/components/ui/input";

export function SearchFood({foodName}: {foodName: string}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter();
  let params = new URLSearchParams(searchParams);
  return (
    <div className="flex w-full max-w-xl flex-col gap-1">
      <H4>Search for food item</H4>
      <Input
        type="text"
        onChange={(e) => {
          let term = e.target.value;
          if (term) {
            params.set("name", term);
          } else {
            params.delete("name");
          }
          let newUrl = `${pathName}?${params.toString()}` as Route<string>;
          router.replace(newUrl);
        }}
        defaultValue={foodName}
      />
    </div>
  );
}
