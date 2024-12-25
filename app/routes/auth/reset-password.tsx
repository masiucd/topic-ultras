import {Form} from "react-router";
import {getUserByEmail} from "~/.server/db/dao/users";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/typography";
import {decrypt} from "~/lib/jwt/email-token";
import type {Route} from "./+types/reset-password";

export async function loader({request}: Route.LoaderArgs) {
  let params = new URLSearchParams(request.url.split("?")[1]);
  let token = params.get("token");
  if (!token) {
    throw new Error("Wrong credentials");
  }
  let decryptedToken = await decrypt(token);
  if (decryptedToken === null) {
    throw new Error("Invalid token");
  }
  let user = await getUserByEmail(decryptedToken.email);
  if (user === null) {
    throw new Error("User not found");
  }
  return {
    status: 200,
    data: {
      email: decryptedToken.email,
    },
  };
}

export async function action({request}: Route.ActionArgs) {
  let body = await request.formData();
  return null;
}

export default function ResetPasswordRoute() {
  return (
    <div>
      <h1>Reset Password</h1>
      <Form method="post">
        <Label htmlFor="password">
          Password
          <Input type="password" name="password" required />
        </Label>
        <Label htmlFor="confirmPassword">
          Confirm Password
          <Input type="password" name="confirmPassword" required />
        </Label>
        <button type="submit">Reset Password</button>
      </Form>
    </div>
  );
}
