import {redirect} from "react-router";
import {
  type User,
  addOrUpdateUserInfos,
  retrieveUserInfos,
} from "~/.server/biz/dashboard.settings";
import {getSession} from "~/.server/sessions";
import {CreateOrUpdateFoodItem} from "~/components/dashboard/create-or-update-food-item";
import {FavoriteFoods} from "~/components/dashboard/favourite-foods";
import {UserInfoCard} from "~/components/dashboard/user-info-card";
import {UserInfoForm} from "~/components/dashboard/user-info-form";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {H2} from "~/components/ui/typography";
import {useToggle} from "~/lib/hooks/toggle";
import type {Route} from "./+types/index";

export async function loader({request}: Route.LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  let user = await retrieveUserInfos(userId);
  if (user === null) {
    return redirect("/login");
  }
  return user;
}

export async function action({request}: Route.ActionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  let formData = await request.formData();
  return await addOrUpdateUserInfos({
    userId,
    age: formData.get("age"),
    weight: formData.get("weight"),
    height: formData.get("height"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    gender: formData.get("gender"),
  });
}

export default function DashboardRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <H2>Dashboard</H2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <UserInfoCardOrForm user={loaderData.user} ok={actionData?.ok} />
        <FavoriteFoods />
        <CreateOrUpdateFoodItem />
      </div>
      {/* <List>
        <li>
          <Link
            className="underline underline-offset-2 hover:opacity-60"
            to="/dashboard/settings"
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <Link
            className="underline underline-offset-2 hover:opacity-60"
            to="/dashboard/favorites"
          >
            Favorite foods
          </Link>
        </li>
        <li>
          <Link
            className="underline underline-offset-2 hover:opacity-60"
            to="/dashboard/foods"
          >
            Foods
          </Link>
        </li>
      </List> */}
    </div>
  );
}

function UserInfoCardOrForm({ok, user}: {ok?: boolean; user: User}) {
  let [edit, {toggle}] = useToggle();

  if (edit) {
    return <UserInfoForm ok={ok} user={user} toggle={toggle} />;
  }

  return (
    <UserInfoCard user={user}>
      <div className="flex h-full flex-1 ">
        <Button onClick={toggle}>
          <Icons.Edit />
          Edit
        </Button>
      </div>
    </UserInfoCard>
  );
}
