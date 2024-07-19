"use client";
import {usePathname} from "next/navigation";

import {Icons} from "@/_components/ui/icons";
import {Span} from "@/_components/ui/typography";
import {setTheme} from "@/actions/theme";
import {cn} from "@/lib/utils";

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
        {labelText && <Span>{labelText}</Span>}
      </button>
    </form>
  );
}
