"use client";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import type {Route} from "next";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export function FoodItemSearch(props: {
  type: string;
  htmlFor: string;
  placeholder?: string;
  label: string;
  name?: string;
}) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter(); // replace
  let params = new URLSearchParams(searchParams);

  return (
    <>
      <Label htmlFor={props.htmlFor}>{props.label}</Label>
      <Input
        type={props.type}
        id={props.htmlFor}
        placeholder={props.placeholder}
        onChange={(e) => {
          let term = e.target.value;
          if (term) {
            params.set("name", term);
            params.delete("skip");
            params.delete("limit");
          } else {
            params.delete("name");
          }
          let newUrl = `${pathName}?${params.toString()}` as Route<string>;
          router.replace(newUrl);
        }}
        defaultValue={props.name}
      />
    </>
  );
}
