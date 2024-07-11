"use client";

import {usePathname} from "next/navigation";

import {setTheme} from "@/actions/theme";

export function ToggleTheme({
  theme,
}: {
  theme: string; // "dark" | "light"
}) {
  let pathName = usePathname();
  return (
    <form action={setTheme}>
      <input type="hidden" name="theme" value={theme} />
      <input type="hidden" name="path" value={pathName} />
      <button type="submit">Toggle</button>
    </form>
  );
}
