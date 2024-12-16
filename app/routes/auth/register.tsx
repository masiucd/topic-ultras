import {eq} from "drizzle-orm";
import {Form, Link, redirect} from "react-router";
import {z} from "zod";
import {db} from "~/.server/db";
import {users} from "~/.server/db/schema";
import {hashPassword} from "~/.server/utils/password";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead} from "~/components/ui/typography";
import type {Route} from "./+types/register";

let RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function loader() {
  // TODO: check if user is logged in - if user is logged in, redirect to home page / dashboard
  return {};
}

export async function action({request}: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPassword = formData.get("confirm-password");
  let result = RegisterSchema.safeParse({email, password, confirmPassword});
  if (!result.success) {
    return {
      status: 400,
      data: {
        error: {
          type: "form",
          message: `Invalid form data \n${result.error.errors}`,
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

  let hashedPassword = await hashPassword(result.data.password);

  await db.insert(users).values({
    email: result.data.email,
    password: hashedPassword,
  });

  redirect("/login");
  return {
    status: 200,
    data: {
      error: null,
    },
  };
}

export default function RegisterRoute({actionData}: Route.ComponentProps) {
  return (
    <div>
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

      <div>
        <Form method="post">
          <fieldset className="flex flex-col gap-2 p-2 shadow-2xl md:max-w-3xl">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required name="email" />
              {actionData?.data.error?.type === "email" && (
                <p className="text-red-500">{actionData.data.error.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" required name="password" />
              {actionData?.data.error?.type === "password" && (
                <p className="text-red-500">{actionData.data.error.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                id="confirm-password"
                required
                name="confirm-password"
              />
              {actionData?.data.error?.type === "password" && (
                <p className="text-red-500">{actionData.data.error.message}</p>
              )}
            </div>
            <Button type="submit">Register</Button>
            <div>
              {actionData?.data.error?.type === "form" && (
                <p className="text-red-500">{actionData.data.error.message}</p>
              )}
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
