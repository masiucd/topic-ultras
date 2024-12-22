import {Form, Link, redirect} from "react-router";
import {register} from "~/.server/biz/register";
import {ErrorMessage, FormGroup} from "~/components/form";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead, Muted} from "~/components/ui/typography";
import type {Route} from "./+types/register";

export function meta() {
  return [
    {title: "Nutri check | Register"},
    {name: "description", content: "Register as a new user"},
  ];
}

export async function loader() {
  // TODO: check if user is logged in - if user is logged in, redirect to home page / dashboard
  return {};
}

export async function action({request}: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPassword = formData.get("confirm-password");
  let result = await register({email, password, confirmPassword});
  if (result.status === 201) {
    return redirect("/login");
  }
  return result;
}

export default function RegisterRoute({actionData}: Route.ComponentProps) {
  return (
    <div className="w-full max-w-2xl">
      <Title />
      <div className="flex w-full max-w-2xl justify-center ">
        <Form method="post" className="w-full" action="/register">
          <fieldset className="flex flex-col gap-2 p-2 shadow-2xl md:max-w-3xl">
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                required
                name="email"
                defaultValue={actionData?.data.formValues.email}
              />
              {actionData?.data.error?.type === "email" && (
                <ErrorMessage message={actionData.data.error.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password" className="flex items-center gap-2">
                Password <Muted>(min 6 characters)</Muted>
              </Label>
              <Input
                type="password"
                id="password"
                required
                name="password"
                min={6}
                defaultValue={actionData?.data.formValues.password}
              />
              {actionData?.data.error?.type === "password" && (
                <ErrorMessage message={actionData.data.error.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                id="confirm-password"
                required
                name="confirm-password"
                min={6}
                defaultValue={actionData?.data.formValues.confirmPassword}
              />
              {actionData?.data.error?.type === "password" && (
                <ErrorMessage message={actionData.data.error.message} />
              )}
            </FormGroup>
            <Button type="submit">Register</Button>

            {actionData?.data.error?.type === "form" && (
              <ErrorMessage message={actionData.data.error.message} />
            )}
          </fieldset>
        </Form>
      </div>
    </div>
  );
}

function Title() {
  return (
    <aside className="mb-10 flex flex-col gap-1">
      <H1>Register as a new user</H1>
      <Lead>
        Already have an account?{" "}
        <Link
          className="underline transition-all duration-150 hover:opacity-45"
          to="/login"
        >
          Login
        </Link>
      </Lead>
    </aside>
  );
}
