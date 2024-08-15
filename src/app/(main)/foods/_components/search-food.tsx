"use client";

import type {Route} from "next";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

import {Icons} from "@/components/ui/icons";
import {Input, Slot} from "@/components/ui/input";

export function SearchFood({foodName}: {foodName: string}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter();
  let params = new URLSearchParams(searchParams);
  return (
    <Input
      placeholder="Search ..."
      onChange={useDebouncedCallback((e) => {
        let term = e.target.value;
        if (term) {
          params.set("name", term);
          if (params.has("page")) {
            params.delete("page");
          }
        } else {
          params.delete("name");
        }
        let newUrl = `${pathName}?${params.toString()}` as Route<string>;
        router.replace(newUrl);
      }, 500)}
      defaultValue={foodName}
    >
      <Slot>
        <Icons.Search />
      </Slot>
    </Input>
  );
}
