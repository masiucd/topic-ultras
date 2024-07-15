"use client";
import {usePathname} from "next/navigation";

import {setTheme} from "@/actions/theme";
import {Icons} from "@/shared/components/icons";
import {Label} from "@/shared/components/typography";
import {cn} from "@/shared/lib/cn";

export function ToggleTheme({
  theme,
  labelText,
}: {
  theme: string; // "dark" | "light"
  labelText?: string;
}) {
  let pathName = usePathname();
  return (
    <form action={setTheme} className="flex">
      <input type="hidden" name="theme" value={theme} />
      <input type="hidden" name="path" value={pathName} />
      <button
        type="submit"
        className={cn(
          "transition-all duration-700",
          labelText && "flex items-center gap-1",
        )}
      >
        {theme === "dark" ? (
          <Icons.Light size={18} />
        ) : (
          <Icons.Dark size={18} />
        )}
        {labelText && <Label>{labelText}</Label>}
      </button>
    </form>
  );
}
