import {Form} from "react-router";
import {z} from "zod";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/typography";
import {sendEmail} from "~/lib/send-email";
import type {Route} from "./+types/forgot-password";
export function meta() {
  return [
    {
      title: "Forgot Password",
      description: "Forgot Password",
    },
  ];
}

let ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export async function action({request}: Route.ActionArgs) {
  let body = await request.formData();
  let {email} = ResetPasswordSchema.parse({email: body.get("email")});

  // TODO genereate a token and store it in redis
  // send the token in the email
  // user clicks on the link and we verify the token
  // if the token is valid, we allow the user to reset the password
  // we check the token in route /reset-password

  let {error} = await sendEmail(email);
  if (error) {
    console.error("error", error);
    return {status: 500, data: {error: "Internal server error"}};
  }

  return {status: 200, data: {message: "Reset email sent"}};
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
      {actionData?.status === 200 && (
        <>
          <p>{actionData.data.message}</p>
          <p>
            You will receive an email with instructions to reset your password.
          </p>
        </>
      )}
    </div>
  );
}
