import {Form, Link, redirect} from "react-router";
import {z} from "zod";
import {getUserByEmail, updateUserPassword} from "~/.server/db/dao/users";
import {hashPassword} from "~/.server/utils/password";
import PageWrapper from "~/components/page-wrapper";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/typography";
import {decrypt} from "~/lib/jwt/email-token";
import {STATUS_CODE} from "~/lib/status-code";
import type {Route} from "./+types/reset-password";

export function meta() {
  return [
    {
      title: "Reset Password",
      description: "Reset Your Password Here",
    },
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  let params = new URLSearchParams(request.url.split("?")[1]);
  let token = params.get("token");
  if (!token) {
    return redirect("/login");
  }
  let decryptedToken = await decrypt(token);
  if (decryptedToken === null) {
    return redirect("/login");
  }
  let user = await getUserByEmail(decryptedToken.email);
  if (user === null) {
    return redirect("/login");
  }
  return {
    status: 200,
    data: {
      email: decryptedToken.email,
    },
  };
}

let ResetPasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  email: z.string().email(),
});

export async function action({request}: Route.ActionArgs) {
  let body = await request.formData();
  let password = body.get("password");
  let confirmPassword = body.get("confirmPassword");
  let email = body.get("email");
  let result = ResetPasswordSchema.safeParse({
    password,
    confirmPassword,
    email,
  });
  if (!result.success) {
    return {status: STATUS_CODE.BAD_REQUEST, data: {error: "Invalid data"}};
  }
  if (result.data.password !== result.data.confirmPassword) {
    return {
      status: STATUS_CODE.BAD_REQUEST,
      data: {error: "Passwords do not match"},
    };
  }

  // Update the user's password in the database
  let hashedPassword = await hashPassword(result.data.password);
  if (hashedPassword === null) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: {error: "Internal server error"},
    };
  }
  let success = await updateUserPassword(hashedPassword, result.data.email);

  return {
    status: success ? STATUS_CODE.OK : STATUS_CODE.INTERNAL_SERVER_ERROR,
    data: {success},
  };
}

export default function ResetPasswordRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <PageWrapper>
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
        <input type="hidden" name="email" value={loaderData.data.email} />
        <button type="submit">Reset Password</button>
      </Form>
      <div className="my-5 min-h-[5rem] ">
        {actionData?.data.success && (
          <div>
            <p>Password reset successfully.</p>
            <p>
              You can now <Link to="/login">login</Link> with your new password.
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
