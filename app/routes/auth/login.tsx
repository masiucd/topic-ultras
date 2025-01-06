import {Form, type HeadersArgs, Link, data} from "react-router";
import {z} from "zod";
import {authenticateRequest, login} from "~/.server/auth";
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

export function headers({actionHeaders, loaderHeaders}: HeadersArgs) {
  return actionHeaders ? actionHeaders : loaderHeaders;
}

export async function loader({request}: Route.LoaderArgs) {
  let session = await authenticateRequest(request);
}

let LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function action({request}: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  let result = LoginSchema.parse({email, password});

  try {
    const {accessToken, headers} = await login(result.email, result.password);
    return data(
      {error: null, accessToken, result},
      {
        headers: {foo: "bar"},
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return data(
      {error: "Invalid credentials", accessToken: null, result: null},
      {status: 400}
    );
  }
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
                defaultValue={actionData?.result?.email}
              />
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
                defaultValue={actionData?.result?.password}
              />
            </FormGroup>
            <Button type="submit">Login</Button>
            {actionData?.error && <ErrorMessage message={actionData?.error} />}
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
