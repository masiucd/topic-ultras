import {eq} from "drizzle-orm";
import {Form, redirect} from "react-router";
import {z} from "zod";
import {db} from "~/.server/db";
import {insertUserInfos} from "~/.server/db/dao/users";
import {userInfos, users} from "~/.server/db/schema";
import {getSession} from "~/.server/sessions";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";
import {Strong} from "~/components/ui/typography";
import {STATUS_CODE} from "~/lib/status-code";
import type {Route} from "./+types/settings";

let SettingsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.string(),
  weight: z.string(),
  height: z.string(),
  gender: z.enum(["female", "male"]),
});

export async function action({request}: Route.ActionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  let formData = await request.formData();
  let firstName = formData.get("first-name");
  let lastName = formData.get("last-name");
  let age = formData.get("age");
  let weight = formData.get("weight");
  let height = formData.get("height");
  let gender = formData.get("gender");

  let data = SettingsSchema.parse({
    firstName,
    lastName,
    age,
    weight,
    height,
    gender,
  });

  let ok = await insertUserInfos({
    userId: Number.parseInt(userId, 10),
    firstName: data.firstName,
    lastName: data.lastName,
    age: Number.parseInt(data.age, 10),
    weight: Number.parseInt(data.weight, 10),
    height: Number.parseInt(data.height, 10),
    gender: data.gender,
  });

  if (!ok) {
    return {
      ok,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "Failed to update user information",
    };
  }

  return {
    ok,
    status: STATUS_CODE.CREATED,
    message: "User information updated successfully",
  };
}

export async function loader({request}: Route.LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  try {
    let user = await db
      .select({
        userId: users.id,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age,
        weight: userInfos.weight,
        height: userInfos.height,
      })
      .from(users)
      .innerJoin(userInfos, eq(users.id, userInfos.id))
      .where(eq(users.id, Number.parseInt(userId, 10)));

    return {user: user[0]};
  } catch (error) {
    console.error(error);
    return redirect("/login");
  }
}

export default function SettingsRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>SettingsRoute</h1>

      <Form method="post" action="/dashboard/settings">
        <fieldset className="mb-3 flex flex-col gap-2">
          <legend>
            <Strong>Settings</Strong>
          </legend>
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Input
              type="text"
              id="first-name"
              name="first-name"
              defaultValue={loaderData?.user.firstName ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              type="text"
              id="last-name"
              name="last-name"
              defaultValue={loaderData?.user.lastName ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              defaultValue={loaderData?.user.age ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              defaultValue={loaderData?.user.weight ?? ""}
            />
          </div>

          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              type="number"
              id="height"
              name="height"
              defaultValue={loaderData?.user.height ?? ""}
            />
          </div>

          <RadioGroup defaultValue="female" name="gender" className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </fieldset>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}
