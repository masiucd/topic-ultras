import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Nutri check - About"},
    {
      name: "description",
      content: "Nutri check is a nutrition tracking app",
    },
  ];
}

export default function AboutRoute() {
  return (
    <div className="h-24 bg-red-500">
      <h1>About</h1>
    </div>
  );
}
