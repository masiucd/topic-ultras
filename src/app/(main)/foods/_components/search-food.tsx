"use client";

import type {Route} from "next";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {Input} from "@/components/ui/input";

export function SearchFood({foodName}: {foodName: string}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter();
  let params = new URLSearchParams(searchParams);
  return (
    <>
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
    </>
  );
}
