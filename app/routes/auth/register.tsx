import {eq} from "drizzle-orm";
import type {PropsWithChildren} from "react";
import {Form, Link} from "react-router";
import {z} from "zod";
import {db} from "~/.server/db";
import {users} from "~/.server/db/schema";
import PageWrapper from "~/components/page-wrapper";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead, Muted, P} from "~/components/ui/typography";
import type {Route} from "./+types/register";

let RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

// export async function loader() {
//   // TODO: check if user is logged in - if user is logged in, redirect to home page / dashboard
//   return {};
// }

export async function action({request}: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPassword = formData.get("confirm-password");
  let result = RegisterSchema.safeParse({email, password, confirmPassword});
  if (!result.success) {
    console.error(result.error.errors);
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
          confirmPassword: confirmPassword?.toString(),
        },
      },
    };
  }

  if (result.data.password !== result.data.confirmPassword) {
    return {
      status: 400,
      data: {
        error: {
          type: "password",
          message: "Passwords do not match",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
          confirmPassword: confirmPassword?.toString(),
        },
      },
    };
  }
  let r = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.email, result.data.email));

  if (r.length > 0) {
    return {
      status: 400,
      data: {
        error: {
          type: "email",
          message: "Wrong credentials",
        },
      },
    };
  }
  return null;

  // let hashedPassword = await hashPassword(result.data.password);

  // await db.insert(users).values({
  //   email: result.data.email,
  //   password: hashedPassword,
  // });

  // redirect("/login");
  // return {
  //   status: 200,
  //   data: {
  //     error: null,
  //   },
  // };
}

export default function RegisterRoute({actionData}: Route.ComponentProps) {
  console.log(actionData);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center">
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
    </PageWrapper>
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

function ErrorMessage({message}: {message: string}) {
  return <P className="text-red-500">{message}</P>;
}

function FormGroup({children}: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
