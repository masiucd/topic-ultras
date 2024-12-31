import {Form, Link, redirect} from "react-router";
import {login} from "~/.server/biz/login";
import {getUserById} from "~/.server/db/dao/users";
import {commitSession, getSession} from "~/.server/sessions";
import {ErrorMessage, FormGroup} from "~/components/form";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead, P, Span} from "~/components/ui/typography";
import type {Route} from "./+types/login";

export function meta() {
  return [
    {title: "Nutri check | Login"},
    {name: "description", content: "Login into your account"},
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (userId) {
    let user = await getUserById(Number.parseInt(userId));
    if (user) {
      return redirect("/");
    }
  }
  return null;
}

export async function action({request}: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (userId) {
    return redirect("/dashboard");
  }

  let result = await login(email, password, () => {
    session.flash("error", "Invalid credentials");
  });

  if (!result.data.user) {
    return result.data;
  }
  session.set("userId", result.data.user.id.toString());
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginRoute({actionData}: Route.ComponentProps) {
  return (
    <div className="w-full max-w-2xl">
      <Title />
      <div className="flex w-full max-w-2xl justify-center ">
        <Form method="post" className="w-full" action="/login">
          <fieldset className="flex flex-col gap-2 p-2 shadow-2xl md:max-w-3xl">
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                required
                name="email"
                defaultValue={actionData?.formValues.email}
              />
              {actionData?.error?.type === "email" && (
                <ErrorMessage message={actionData?.error.message} />
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password" className="flex items-center gap-2">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                required
                name="password"
                min={6}
                defaultValue={actionData?.formValues.password}
              />
              {actionData?.error?.type === "password" && (
                <ErrorMessage message={actionData?.error.message} />
              )}
            </FormGroup>
            <Button type="submit">Login</Button>
            {actionData?.error?.type === "form" && (
              <ErrorMessage message={actionData?.error.message} />
            )}
            <P>
              Forgot your password?{" "}
              <Link to="/forgot-password">
                <Span className="underline underline-offset-2">Reset</Span>
              </Link>
            </P>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}

function Title() {
  return (
    <aside className="mb-10 flex w-full flex-col gap-1 ">
      <H1>Login into your account</H1>
      <Lead>
        Don't have an account?{" "}
        <Link to="/register">
          <Span className="underline underline-offset-2">Register</Span>
        </Link>
      </Lead>
    </aside>
  );
}
