import {env} from "$/env";
import {Form} from "react-router";
import {Resend} from "resend";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/typography";
import type {Route} from "./+types/forgot-password";

export function meta() {
  return [
    {
      title: "Forgot Password",
      description: "Forgot Password",
    },
  ];
}

export async function action({request}: Route.ActionArgs) {
  let body = await request.formData();
  let email = body.get("email");
  if (typeof email !== "string") {
    throw new Error("Invalid email");
  }
  // TODO genereate a token and store it in redis
  // send the token in the email
  // user clicks on the link and we verify the token
  // if the token is valid, we allow the user to reset the password
  // we check the token in route /reset-password
  const resend = new Resend(env.RESEND_API_KEY);
  const {data, error} = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Reset your password",
    html: `
      <div>
        <h1>
          Hello, you requested a password reset!
        </h1>
        <p>Click <a href="http://localhost:4000/reset-password">here</a> to reset your password</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default function ForgotPasswordRoute({
  actionData,
}: Route.ComponentProps) {
  console.log("actionData", actionData);
  return (
    <div>
      <h1>Forgot Password</h1>
      <Form method="post">
        <Label htmlFor="email">
          Email
          <Input type="email" name="email" required />
        </Label>
        <button type="submit">Send reset email</button>
      </Form>
    </div>
  );
}
