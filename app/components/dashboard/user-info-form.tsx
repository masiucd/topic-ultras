import {type PropsWithChildren, useEffect} from "react";
import {Form} from "react-router";
import type {User} from "~/.server/biz/dashboard.settings";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";
import {Strong} from "~/components/ui/typography";
import {cn} from "~/lib/utils";

export function UserInfoForm({
  ok,
  user,
  toggle,
}: {
  ok?: boolean;
  user?: User;
  toggle: () => void;
}) {
  useEffect(() => {
    if (ok) {
      toggle();
    }
  }, [toggle, ok]);
  return (
    <div className="rounded-md p-2 shadow-xl">
      <Button size="sm" onClick={toggle} className="ml-auto block">
        Cancel Edit
      </Button>

      <Form method="post">
        <fieldset
          className={cn(
            "mb-3 flex flex-col gap-2 rounded-md border-2 p-2",
            ok &&
              !ok &&
              "motion-preset-shake motion-duration-700 border border-red-500"
          )}
        >
          <legend>
            <Strong>{ok ? "Saved Successfully" : "User Information"}</Strong>
          </legend>
          <FirstAndLastName user={user} />
          <HeightAndWeight user={user} />
          <AgeAndGender user={user} />
        </fieldset>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </Form>
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
