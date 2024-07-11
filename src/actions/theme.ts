"use server";
import "server-only";

import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

const THEME_INPUT_NAME = "theme";
const PATH_INPUT_NAME = "path";
const THEME_KEY = "theme";
export async function setTheme(data: FormData) {
  let themeValue = data.get(THEME_INPUT_NAME) as string;
  let path = data.get(PATH_INPUT_NAME) as string;
  if (!themeValue || !path) {
    // this should never happen!!!! 💣
    throw new Error(
      "Missing theme or path value in the form data. This should never happen!",
    );
  }

  let cookieStore = cookies();
  let storedTheme = cookieStore.get(THEME_KEY);
  // Improved version
  // Simplifies the logic for setting the theme in a cookie
  let newTheme = !storedTheme || themeValue !== "dark" ? "dark" : "light";
  cookieStore.set(THEME_KEY, newTheme, {secure: true});

  revalidatePath(path);
}
