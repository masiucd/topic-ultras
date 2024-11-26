import {Welcome} from "../welcome/welcome";
import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Nutri check"},
    {name: "description", content: "Nutri check is a nutrition tracking app"},
  ];
}

export default function HomeRoute() {
  return <Welcome />;
}
