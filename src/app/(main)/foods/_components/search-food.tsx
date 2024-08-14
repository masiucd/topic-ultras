"use client";

import {TextField} from "@radix-ui/themes";
import type {RootProps} from "@radix-ui/themes/dist/esm/components/text-field.js";
import type {Route} from "next";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

import {Icons} from "@/components/ui/icons";

export function SearchFood({foodName}: {foodName: string}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter();
  let params = new URLSearchParams(searchParams);
  return (
    <Input
      type="text"
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
    />
  );
}

function Input(props: RootProps) {
  return (
    <TextField.Root placeholder="Search ..." {...props}>
      <TextField.Slot>
        <Icons.Search />
      </TextField.Slot>
    </TextField.Root>
  );
}
