"use client";
import {usePathname} from "next/navigation";

import {Icons} from "@/_components/ui/icons";
import {Tooltip} from "@/_components/ui/tooltip";
import {Span} from "@/_components/ui/typography";
import {setTheme} from "@/actions/theme";
import {ICON_SIZE} from "@/lib/constants";
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
      <Tooltip content="ctr+t">
        <button
          type="submit"
          className={cn(
            "transition-all duration-700",
            labelText && "flex items-center gap-1",
          )}
        >
          {theme === "dark" ? (
            <Icons.Light size={ICON_SIZE} />
          ) : (
            <Icons.Dark size={ICON_SIZE} />
          )}
          {labelText && <Span>{labelText}</Span>}
        </button>
      </Tooltip>
    </form>
  );
}
