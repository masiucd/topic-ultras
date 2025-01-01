import type {PropsWithChildren} from "react";
import {Link, redirect, useFetcher} from "react-router";
import {
  type User,
  addToUserInfos,
  retrieveUserInfos,
} from "~/.server/biz/dashboard.settings";
import {getSession} from "~/.server/sessions";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";
import {Strong} from "~/components/ui/typography";
import {cn} from "~/lib/utils";
import type {Route} from "./+types/settings";

export async function action({request}: Route.ActionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  let formData = await request.formData();
  return await addToUserInfos({
    userId,
    age: formData.get("age"),
    weight: formData.get("weight"),
    height: formData.get("height"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    gender: formData.get("gender"),
  });
}

export async function loader({request}: Route.LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  return await retrieveUserInfos(userId);
}

export default function SettingsRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  let fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  return (
    <div className="w-full md:my-5 ">
      <Link
        to="/dashboard"
        className="underline underline-offset-2 hover:opacity-60"
      >
        Go back to Dashboard
      </Link>

      <div className="p-2 shadow-2xl md:max-w-xl ">
        <fetcher.Form method="post" action="/dashboard/settings">
          <fieldset
            className={cn(
              "mb-3 flex flex-col gap-2 rounded-md",
              isSubmitting && "opacity-50",
              actionData &&
                !actionData.ok &&
                "motion-preset-shake motion-duration-700 border border-red-500"
            )}
            disabled={isSubmitting}
          >
            <legend>
              <Strong>
                {actionData?.ok ? "Saved Successfully" : "User Information"}
              </Strong>
            </legend>
            <FirstAndLastName user={loaderData?.user} />
            <HeightAndWeight user={loaderData?.user} />
            <AgeAndGender user={loaderData?.user} />
          </fieldset>
          <Button type="submit" aria-busy={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}

function FirstAndLastName({user}: {user?: User}) {
  return (
    <InputWrapper>
      <div className="w-full">
        <Label htmlFor="first-name">First Name</Label>
        <Input
          type="text"
          id="first-name"
          name="first-name"
          defaultValue={user?.firstName ?? ""}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="last-name">Last Name</Label>
        <Input
          type="text"
          id="last-name"
          name="last-name"
          defaultValue={user?.lastName ?? ""}
        />
      </div>
    </InputWrapper>
  );
}

function HeightAndWeight({user}: {user?: User}) {
  return (
    <InputWrapper>
      <div className="w-full">
        <Label htmlFor="weight">Weight (KG)</Label>
        <Input
          type="number"
          id="weight"
          name="weight"
          min={50}
          max={300}
          defaultValue={user?.weight ?? ""}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="height">Height (CM) </Label>
        <Input
          type="number"
          id="height"
          name="height"
          min={100}
          max={250}
          defaultValue={user?.height ?? ""}
        />
      </div>
    </InputWrapper>
  );
}

function AgeAndGender({user}: {user?: User}) {
  return (
    <InputWrapper>
      <div className="w-full ">
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          name="age"
          min={10}
          max={99}
          defaultValue={user?.age ?? ""}
        />
      </div>

      <RadioGroup
        defaultValue={user?.gender ?? "female"}
        name="gender"
        className="flex w-full pt-5"
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
    </InputWrapper>
  );
}

function InputWrapper({children}: PropsWithChildren) {
  return <div className="flex justify-between gap-3">{children}</div>;
}
