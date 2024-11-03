import {isLoggedIn} from "@/lib/auth";
import {redirect} from "next/navigation";
import type {PropsWithChildren} from "react";

export default async function ProfileLayout(props: PropsWithChildren) {
  let loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/log-in");
  }
  return <>{props.children}</>;
}
