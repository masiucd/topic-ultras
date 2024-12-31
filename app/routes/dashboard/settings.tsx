import {eq} from "drizzle-orm";
import {redirect, useFetcher} from "react-router";
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
import {cn} from "~/lib/utils";
import type {Route} from "./+types/settings";

let SettingsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  gender: z.enum(["female", "male"]).optional(),
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
    age: parseOptionalInt(data.age),
    weight: parseOptionalInt(data.weight),
    height: parseOptionalInt(data.height),
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
    let rows = await db
      .select({
        userId: users.id,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age,
        weight: userInfos.weight,
        height: userInfos.height,
        gender: userInfos.gender,
      })
      .from(users)
      .leftJoin(userInfos, eq(users.id, userInfos.id))
      .where(eq(users.id, Number.parseInt(userId, 10)));

    console.log("rows", rows);
    return {user: rows[0]};
  } catch (error) {
    console.error(error);
    return redirect("/login");
  }
}

export default function SettingsRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  let fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  return (
    <div className="mx-auto w-full p-2 shadow-2xl md:max-w-xl">
      <fetcher.Form method="post" action="/dashboard/settings">
        <fieldset
          className={cn(
            "mb-3 flex flex-col gap-2",
            isSubmitting && "opacity-50",
            actionData && !actionData.ok && "border border-red-500"
          )}
          disabled={isSubmitting}
        >
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
              min={10}
              max={99}
              defaultValue={loaderData?.user.age ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (KG)</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              min={50}
              max={300}
              defaultValue={loaderData?.user.weight ?? ""}
            />
          </div>

          <div>
            <Label htmlFor="height">Height (CM) </Label>
            <Input
              type="number"
              id="height"
              name="height"
              min={100}
              max={250}
              defaultValue={loaderData?.user.height ?? ""}
            />
          </div>

          <RadioGroup
            defaultValue={loaderData?.user.gender ?? "female"}
            name="gender"
            className="flex"
          >
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
        <Button type="submit" aria-busy={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </fetcher.Form>
    </div>
  );
}

function parseOptionalInt(x?: string): number | undefined {
  return x ? Number.parseInt(x, 10) : undefined;
}
