import {Form, Link, redirect} from "react-router";
import {z} from "zod";
import {getUserByEmail, getUserById} from "~/.server/db/dao/users";
import {authSession} from "~/.server/sessions";
import {comparePassword} from "~/.server/utils/password";
import {ErrorMessage, FormGroup} from "~/components/form";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead, Span} from "~/components/ui/typography";
import type {Route} from "./+types/login";

export function meta() {
  return [
    {title: "Nutri check | Login"},
    {name: "description", content: "Login into your account"},
  ];
}

let LoingSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loader({request}: Route.LoaderArgs) {
  let {getSession} = authSession();
  let session = await getSession(request.headers.get("cookie"));
  let userId = session.get("userId");
  if (userId) {
    let user = await getUserById(Number.parseInt(userId));
    if (user) {
      return redirect("/");
    }
  }
  let error = session.get("error");
  if (error) {
    console.error("session", error);
  }

  return null;
}

export async function action({request}: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let result = LoingSchema.safeParse({email, password});
  if (!result.success) {
    return {
      status: 400,
      data: {
        error: {
          type: "form",
          message: "Invalid form data",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
        },
      },
    };
  }
  let user = await getUserByEmail(result.data.email);
  let {getSession, commitSession} = authSession();
  let session = await getSession(request.headers.get("cookie"));
  if (!user) {
    session.flash("error", "In{valid credentials");
    return {
      status: 400,
      data: {
        error: {
          type: "email",
          message: "Invalid credentials",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
        },
      },
    };
  }
  let ok = await comparePassword(result.data.password, user.password);
  if (!ok) {
    return {
      status: 400,
      data: {
        error: {
          type: "password",
          message: "Invalid credentials",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
        },
      },
    };
  }

  session.set("userId", user.id.toString());

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginRoute({actionData}: Route.ComponentProps) {
  return (
    <div>
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
                defaultValue={actionData?.data.formValues.email}
              />
              {actionData?.data.error?.type === "email" && (
                <ErrorMessage message={actionData.data.error.message} />
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
                defaultValue={actionData?.data.formValues.password}
              />
              {actionData?.data.error?.type === "password" && (
                <ErrorMessage message={actionData.data.error.message} />
              )}
            </FormGroup>
            <Button type="submit">Login</Button>
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
