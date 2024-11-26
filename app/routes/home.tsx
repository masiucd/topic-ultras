import {db} from "~/.server/db";
import {users} from "~/.server/db/schema";
import {Button} from "~/components/ui/button";
import type {Route} from "./+types/home";

export function meta() {
  return [
    {title: "Nutri check"},
    {name: "description", content: "Nutri check is a nutrition tracking app"},
  ];
}

export async function loader({params}: Route.LoaderArgs) {
  let xs = await db.select({id: users.id}).from(users);
  return [
    {
      status: 200,
      props: {xs, params},
    },
  ];
}

export default function HomeRoute({loaderData}: Route.ComponentProps) {
  let xs = loaderData;
  console.log("xs", xs);
  return (
    <div>
      <p className="h-20 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aut
        quas enim doloribus mollitia, harum natus in quidem, laborum, aspernatur
        placeat dolor maxime debitis fugiat magni at deleniti labore similique.
      </p>

      <Button>Click</Button>
    </div>
  );
}
