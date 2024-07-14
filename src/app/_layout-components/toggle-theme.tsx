"use client";
import {usePathname} from "next/navigation";

import {setTheme} from "@/actions/theme";
import {Icons} from "@/shared/components/icons";

export function ToggleTheme({
  theme,
}: {
  theme: string; // "dark" | "light"
}) {
  let pathName = usePathname();
  // let usersPreferencedTheme = useMediaQuery("(prefers-color-scheme: dark)")
  return (
    <form action={setTheme} className="flex">
      <input type="hidden" name="theme" value={theme} />
      <input type="hidden" name="path" value={pathName} />
      <button type="submit" className="transition-all duration-700">
        {theme === "dark" ? (
          <Icons.Light size={18} />
        ) : (
          <Icons.Dark size={18} />
        )}
      </button>
    </form>
  );
}
