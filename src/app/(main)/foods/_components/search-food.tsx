"use client";

import type {Route} from "next";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

import {H4} from "@/components/typography";
import {TextField} from "@radix-ui/themes";
import type {RootProps} from "@radix-ui/themes/dist/esm/components/text-field.js";
import {Icons} from "@/components/ui/icons";

export function SearchFood({foodName}: {foodName: string}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter();
  let params = new URLSearchParams(searchParams);
  return (
    <div className="flex w-full max-w-xl flex-col gap-1">
      <H4>Search for food a item</H4>
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
    </div>
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
